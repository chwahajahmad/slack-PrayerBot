const user = require('../models/users.models');

const findOneUser = (id) => {
  if (!id) throw new Error('ID Missing'); //Validation
  return user.findOne({
    where: {
      slack_id: id,
    },
  });
};

module.exports = { findOneUser };
