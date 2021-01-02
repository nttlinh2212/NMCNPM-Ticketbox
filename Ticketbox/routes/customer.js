var express = require('express');
const filmModel = require('../models/film');
const theaterModel = require('../models/theater');
const userModel = require('../models/user');
const showtimeModel = require('../models/showtime');


var router = express.Router();

/* GET home page. */
router.get('/profile', async function(req, res, next) {
    res.render('customer/profile', { title: "Profile", user: req.session.authUser });
});
// /book-tikets/30000
router.get('/book-tickets/:id', async function(req, res, next) {
    req.session.cart = [];
    id = +req.params.id;
    const showtime = await showtimeModel.findByID(id);
    const theater = await theaterModel.searchBy(showtime.idtheater);
    const film = await filmModel.searchBy(showtime.idfilm)
    const seats = await showtimeModel.allSeats(id);
    console.log(JSON.stringify(film) + JSON.stringify(theater) + JSON.stringify(showtime) + 'hre');
    res.render('customer/book-tickets', { title: "Book Tickets", seats, showtime, theater, film });
});
module.exports = router;