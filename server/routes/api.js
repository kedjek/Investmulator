const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');

router.get('/',
  (req, res) => {
    console.log(req.body);
    console.log('im in get of the login /api call!');
    res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
  }
);

router.post('/', userController.verifyUser,
  (req, res) => {
    console.log('im in post of the login /api call!');
    console.log(res.locals.user);
    res.status(200).redirect('/api');
  }
);

router.get('/createuser',
  (req, res, next) => {
    console.log('im in get of /createuser call!');
    res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
  }
);

router.post('/createuser', userController.createUser,
  (req, res, next) => {
    console.log('im in post of createuser');
    console.log(res.locals.user);
    res.status(200).redirect('/api');
  }
);

module.exports = router;
