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
    console.log('im in get of the login /api call!, sending file index.html');
    const userData = JSON.stringify(req.session.user);
    const indexHtml = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf-8');
    const modifiedIndexHtml = indexHtml.replace('<!-- USER_DATA -->', `<script>window.userData = ${userData};</script>`);
    
    res.status(200).send(modifiedIndexHtml);
  }
);

router.get('/sp500', async (req, res) => {
  try {
    // Make a request to the external API
    const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
      params: {
        series_id: 'SP500',
        api_key: 'db70964525df983e179376ac2ce9c76a',
        file_type: 'json',
        frequency: 'd',
        limit: 10000,
      },
    });
    
    // Forward the external API's response to your React app
    res.json(response.data);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', userController.verifyUser, cookieController.setSSIDCookie, sessionController.newSession,
  (req, res) => {
    req.session.user = res.locals.user;
    console.log('gona redirect to /api from post /');
    res.status(200).redirect('/api');
  }
);

router.get('/createuser',
  (req, res, next) => {
    console.log('im in get of /createuser call!');
    res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
  }
);

router.post('/createuser', userController.createUser, cookieController.setSSIDCookie, sessionController.newSession,
  (req, res, next) => {
    console.log('im in post of createuser');
    console.log(res.locals.user);
    req.session.user = res.locals.user;
    res.status(200).redirect('/api');
  }
);

module.exports = router;
