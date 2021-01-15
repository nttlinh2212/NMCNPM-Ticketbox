var express = require('express');
var router = express.Router();
const showtimeModel = require('../../models/showtime');
const filmModel = require('../../models/film');
const theaterModel = require('../../models/theater');
const { authAdmin } = require('../../middlewares/auth');

router.get('/', authAdmin, function (req, res) {
  res.render('admin/dashboard/index', {adminName : req.session.authUser.fullname});
})

router.get('/dashboard', function (req, res) {
  res.render('admin/dashboard/index', {adminName : req.session.authUser.fullname});
})

module.exports = router;