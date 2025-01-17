var express = require('express');
const filmModel = require('../models/film');
const theaterModel = require('../models/theater');
const userModel = require('../models/user');
const showtimeModel = require('../models/showtime');
const bcrypt = require('bcryptjs');
const moment = require("moment");

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const films = await filmModel.all();
    const theaters = await theaterModel.all();
    
    //console.log(await showtimeModel.allSeats(30000));
    //console.log(films);
    res.render('home', { title: 'Home', films, theaters });
});
// getJSOn /find-films?key=anne
router.get('/find-films', async function(req, res, next) {
    console.log(req.query);
    const key = req.query.key;
    const films = await filmModel.full_text_search(key);
    console.log(JSON.stringify(films));
    res.json(films);
});
router.get('/signin', function(req, res) {
    res.render('guest/signin');
});
router.post('/signin', async function(req, res) {
    const user = await userModel.searchBy(req.body.username);
    if (user === null) {
        //console.log('case1');
        return res.render('guest/signin', {
            err_message: 'Invalid username.'
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
        //console.log('case2'+ret);
        return res.render('guest/signin', {
            err_message: 'Invalid password.'
        });
    }

    req.session.auth = true;
    req.session.authUser = user;
    // if (req.session.authUser.isadmin === 1) {
    //     console.log('login admin successfully');
    //     res.redirect('/admin');
    // } else {
        const url = req.session.retUrl || '/';
        res.redirect(url);
    //}


});
router.get('/signup', async function(req, res) {
    res.render('guest/signup');
});

router.get('/book-fast-tickets', async function(req, res) {
    const films = await filmModel.all();
    const theaters = await theaterModel.all();
    res.render('guest/book-fast-tickets', { title: "Book fast tickets", films, theaters });
});
router.post('/signup', async function(req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    //const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const user = {
        username: req.body.username,
        password: hash,
        fullname: req.body.fullname,
        isadmin: 0
    }

    await userModel.add(user);
    res.render('guest/signin');
})

router.get('/is-available', async function(req, res) {
    const username = req.query.user;
    const user = await userModel.searchBy(username);
    if (user === null) {
        return res.json(true);
    }

    res.json(false);
})
router.get('/logout', async function(req, res) {
    var url = req.headers.referer || '/';
    if(req.session.auth===true && +req.session.authUser.isadmin === 1){
        url = '/';
    }
        
    req.session.auth = false;
    req.session.authUser = null;
    req.session.retUrl = null;

    res.redirect(url);
    res.end();
})

router.get('/get-all-showtimes', async function(req, res) {
        console.log(req.query);
        date = moment(req.query.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const showtimes = await showtimeModel.allShowtimesByTF(req.query.theater, req.query.film, date);
        console.log(showtimes);
        res.json(showtimes);
    })
    //cach goi $.getJSON(`/showtimes-groupby-theater?id=10000&date=1/1/2021`
router.get('/showtimes-groupby-theater', async function(req, res) {
    console.log(req.query);
    //check showtimes=null=>print ko co suat chieu ngc laij thi in ra list suat chieu
    //showtimes =[[],[],[10h,3h]]
    const showtimes = await showtimeModel.allShowtimesByFilmGroupByTheater1(req.query.id, req.query.date);
    console.log(showtimes);
    res.json(showtimes);
})
router.get('/showtimes-groupby-film', async function(req, res) {
        console.log(req.query);
        const showtimes = await showtimeModel.allShowtimesByTheaterGroupByFilm1(req.query.id, req.query.date);
        console.log(showtimes);
        res.json(showtimes);
    })
    //duong dan den film co dang href='/film?id=3'
router.get('/film', async function(req, res, next) {
    const id = req.query.id;
    const film = await filmModel.searchBy(id);
    console.log("id =", id, 'film', film);
    if (film === null) {
        console.log('Not found Film');
        return res.redirect('/');
    }
    //const showtimes = await showtimeModel.allShowtimesByFilmGroupByTheater(film.id);
    res.render('guest/film', { title: film.title, film, releasedate: film.releasedate });
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
    //const showtimes = await showtimeModel.allShowtimesByTheaterGroupByFilm(theater.id);
    // console.log(JSON.stringify(showtimes));
    res.render('guest/theater', { title: theater.name, theater });
});
module.exports = router;