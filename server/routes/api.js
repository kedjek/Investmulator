const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', 
  (req, res) => {
    console.log('in in get of the /api call!');
    res.status(200);
  }
);



router.get('/createuser', 
  (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
  }
);

router.post('/createuser',
  (req, res, next) => {
    console.log('im in post of createuser');
    console.log(req.body);
    res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
  }
);


// router.post('/character',
//   (req, res) => res.status(200).json(res.locals.newCharacter)
// );

module.exports = router;
