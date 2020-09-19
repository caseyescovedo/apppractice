const express = require('express');
const taskController = require('./controllers/taskController');
const munch = require('cookie-parser');

const router = express.Router();
// router.use(munch());


router.get('/', taskController.getData, (req, res) => {
  // console.log(req.cookies);
  res.status(200).json(res.locals.info);
});

router.post('/', taskController.postData, (req, res) => {
  res.status(200).json(res.locals.post);
});
module.exports = router;