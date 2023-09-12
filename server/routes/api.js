const express = require('express');
const router = express.Router();


router.get('/', 
  (req, res) => {
    console.log('in in get of the /api call!');
    res.status(200);
  }
);

router.post('/character',
  (req, res) => res.status(200).json(res.locals.newCharacter)
);

module.exports = router;
