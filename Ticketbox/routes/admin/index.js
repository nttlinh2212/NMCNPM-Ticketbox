var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('admin/dashboard/index');
})

router.get('/dashboard', function (req, res) {
  res.render('admin/dashboard/index');
})

module.exports = router;