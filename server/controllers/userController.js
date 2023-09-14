const User = require('../models/userModel');
// const bcrypt = require('bcrypte');

const userController = {};
// const saltRounds = 10;

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({username,password});
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: 'failed to create user',
      message: {err: `the error code: ${err}`}
    });
  }

};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({username: username, password: password}).exec();

    if (user){
      res.locals.user = user;
      return next();
    } else {
      res.redirect('/api/createuser');
    }
  } catch (err) {
    console.log('IM IN ERRORRRRR');
    return next({
      log: 'Verrriffyyyy ERRROOOORRRR',
      message: {err: 'failure to verify my guy' + err}
    });
  }

};

module.exports = userController;