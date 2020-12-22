var express = require('express');
var router = express.Router();
const {authAdmin} = require('../../middlewares/auth');

router.get('/',authAdmin, function (req, res) {
  res.render('admin/dashboard/index');
})

router.get('/dashboard', authAdmin, function (req, res) {
  res.render('admin/dashboard/index');
})
router.get('/report', authAdmin, function (req, res) {
  res.render('admin/report/index');
})
module.exports = router;