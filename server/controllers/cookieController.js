const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', `${res.locals.user._id}`, {httpOnly: true});
  next();
};

module.exports = cookieController;