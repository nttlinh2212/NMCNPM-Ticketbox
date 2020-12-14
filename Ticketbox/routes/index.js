var express = require('express');
const filmModel = require('../models/film');
const theaterModel = require('../models/theater');
const userModel = require('../models/user');
const showtimeModel = require('../models/showtime');

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const films = await filmModel.all();
    const theaters = await theaterModel.all();


    //console.log(await showtimeModel.allSeats(30000));
    //console.log(films);
    res.render('index', { title: 'Home', films, theaters });
});
router.get('/signin', function(req, res) {
    res.render('signin');
});
router.get('/signup', function(req, res) {
    res.render('signup');
});
//duong dan den film co dang href='/film?id=3'
router.get('/film', async function(req, res, next) {
    const id = req.query.id;
    const film = await filmModel.searchBy(id);
    console.log("id =", id, 'film', film);
    if (film === null) {
        console.log('Not found Film');
        return res.redirect('/');
    }
    const showtimes = await showtimeModel.allShowtimesByFilm(film.id);
    res.render('film', { title: film.title, film, showtimes, releasedate: film.releasedate.toString().replace(/\s00:00:00 GMT.*$/, "") });
});
//duong dan den film co dang href='/film/10000'
router.get('/theater/:id', async function(req, res, next) {
    const id = +req.params.id;
    const theater = await theaterModel.searchBy(id);

    console.log("id =", id, 'theater', theater);
    if (theater === null) {
        console.log('Not found Theater');
        return res.redirect('/');
    }
    const showtimes = await showtimeModel.allShowtimesByTheater(theater.id);
    res.render('theater', { title: theater.name, theater, showtimes });
});
module.exports = router;