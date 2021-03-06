import axios from 'axios';
import {
  findPrayerTimeByCityAndFiqah,
  deleteAllPrayerTimes,
  addPrayerTime,
} from '../../models/prayerTime.models';
import { users } from '../../models/users.models';
import { to } from 'await-to-js';
import postgresConn from '../../db.conn';
const apiEndPoint = 'https://api.pray.zone/v2/times/this_week.json?';
export const getSaveDataForSingleUser = async (city: string, fiqah: string) => {
  if (!city || !fiqah) throw new Error('City or Fiqah is Missing');

  const [err, res]: any = await to(findPrayerTimeByCityAndFiqah(city, fiqah));
  if (res.length > 0) return;
  if (err) throw new Error('Error fetching Prayer Times Data');

  let school;
  fiqah.toLowerCase() === 'jafari' ? (school = 0) : (school = 1);

  const weeklyData: any = await axios.get(
    `${apiEndPoint}city=${city}&school=${school}`,
  );

  if (weeklyData.length <= 0) return;

  const [errAddingData] = await to(
    addPrayerTime({
      city: city.toLowerCase(),
      fiqah: fiqah.toLowerCase(),
      data: weeklyData.data.results,
    }),
  );
  if (errAddingData) throw new Error(err);
};

export const getSaveData = async () => {
  const [err, userData]: any = await to(
    postgresConn.query('select distinct city,fiqah from users', {
      model: users,
      mapToModel: true,
    }),
  );
  if (err) throw new Error('Error Fetching User Data');

  userData.forEach((data: any) => {
    const { city, fiqah } = data.dataValues;
    getSaveDataForSingleUser(city, fiqah);
  });
};

export const deleteAllData = async () => {
  const [err] = await to(deleteAllPrayerTimes());
  if (err) throw Error('Error Deleting Prayer Times');
};
