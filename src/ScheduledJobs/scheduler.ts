export {};
const schedule = require('node-schedule');
const { getSaveData, deleteAllData } = require('./Jobs/save-delete-data');
const { setReminderForAll } = require('./Jobs/dailyReminders');

const weeklyDataGetterScheduler = schedule.scheduleJob('02 00 * * */7', () => {
  deleteAllData();
  getSaveData();
});

const dailyReminderScheduler = schedule.scheduleJob('05 00 1-31 */1 *', () => {
  setReminderForAll();
});

export { weeklyDataGetterScheduler, dailyReminderScheduler };
