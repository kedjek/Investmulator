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

userController.updateUser = async (req, res, next) =>{
  const { action, ticker, quantity, user, cost } = req.body;
  
  const foundUser = await User.findOne({username: user}).exec();
  
  console.log(action, ticker, quantity, user, cost);
  console.log(foundUser);
  try {
    if (quantity < 0) {
      res.locals.update = foundUser;
      return next();
    }
    console.log('okay im here now');
    if (action === 'buy' && foundUser.buyingpower > quantity * cost){
      console.log(foundUser.buyingpower, quantity * cost, action);
      const update = {
        buyingpower: foundUser.buyingpower - (quantity * cost),
        holdings: { SP500: Number(foundUser.holdings.SP500) + Number(quantity) }
      };
      const newUser = await User.findOneAndUpdate({username: user}, update, { new: true }).exec();
      res.locals.update = newUser;
      return next();
    } 
    else if (action === 'sell' && foundUser.holdings[ticker] > quantity) {
      console.log('IM SELLINGGG IT ALLLLLLLLLLLLLLLLLLLLL');
      const update = {
        buyingpower: foundUser.buyingpower + (quantity * cost),
        holdings: { SP500: Number(foundUser.holdings.SP500) - Number(quantity) }
      };
      const newUser = await User.findOneAndUpdate({username: user}, update, { new: true }).exec();
      res.locals.update = newUser;
      return next();
    } else {
      console.log('im in the else statement');
      res.locals.update = foundUser;
      return next();
    }
  } catch (err) {
    return next({
      log: 'could not update user!!!!',
      message: {err: 'failure to update...' + err}
    });
  }

};

module.exports = userController;