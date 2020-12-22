var express = require('express');
const filmModel = require('../models/film');
const theaterModel = require('../models/theater');
const userModel = require('../models/user');
const showtimeModel = require('../models/showtime');
const {authCustomer} = require('../middlewares/auth');

var router = express.Router();

/* GET home page. */
router.get('/profile',authCustomer, async function(req, res, next) {
    res.send('customer/profile');
});
router.get('/book-tickets',authCustomer, async function(req, res, next) {
    res.redirect('customer/book-tickets');
});
module.exports = router;