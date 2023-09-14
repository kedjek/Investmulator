const Session = require('../models/sessionModel');
const User = require('../models/userModel');
const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  const { ssid } = req.cookies;

  Session.findOne({cookieID: ssid})
    .then ((data) => {
      if(data) {
        next();}
      else res.redirect('/');
    })
    .catch (err => {
      return next({
        log: 'sessionController had a boo-boo',
        message: {err: 'almost there... error: ' + err}
      });
    });


};

sessionController.newSession = async (req, res, next) => {
  const cookieID = res.locals.user._id;
  
  try {
    const session = await Session.create({cookieID});
    res.locals.session = session;
    next();
  } catch (err) {
    return next({
      log: 'a failure in new session....',
      message: {err: 'A session is already there?' + err}
    });
  }


};

module.exports = sessionController;