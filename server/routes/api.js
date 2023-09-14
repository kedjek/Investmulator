const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.isLoggedIn,
  (req, res) => {
    console.log('--------------------------------------------------------------');
    const userData = JSON.stringify(req.session.user);
    const indexHtml = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf-8');
    const modifiedIndexHtml = indexHtml.replace('<!-- USER_DATA -->', `<script>window.userData = ${userData};</script>`);
    res.status(200).send(modifiedIndexHtml);
  }
);

router.post('/', userController.verifyUser, cookieController.setSSIDCookie, sessionController.newSession,
  (req, res) => {
    req.session.user = res.locals.user;
    console.log('verified user, set cookie and session, redirecting to login');
    res.status(200).redirect('/api');
  }
);

router.put('/update', userController.updateUser, (req, res) => {
  console.log('I finished updating the user info');
  req.session.user = res.locals.update;
  res.status(200).redirect('/api');
});

router.get('/createuser',
  (req, res, next) => {
    console.log('I\'m in the create user page');
    res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
  }
);

router.post('/createuser', userController.createUser, cookieController.setSSIDCookie, sessionController.newSession,
  (req, res, next) => {
    console.log('Created user, set cookie and session, redirecting to login');
    console.log(res.locals.user);
    req.session.user = res.locals.user;
    res.status(200).redirect('/api');
  }
);

router.get('/sp500', async (req, res) => {
  try {
    const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
      params: {
        series_id: 'SP500',
        api_key: 'db70964525df983e179376ac2ce9c76a',
        file_type: 'json',
        frequency: 'd',
        limit: 10000,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
