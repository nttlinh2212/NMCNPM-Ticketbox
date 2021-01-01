var express = require('express');
var router = express.Router();
const showtimeModel = require('../../models/showtime');
const filmModel = require('../../models/film');
const theaterModel = require('../../models/theater');

router.get('/', function (req, res) {
  res.render('admin/dashboard/index');
})

router.get('/dashboard', function (req, res) {
  res.render('admin/dashboard/index');
})

module.exports = router;