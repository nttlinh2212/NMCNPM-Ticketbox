var express = require('express');
const filmModel = require('../models/film');
const theaterModel = require('../models/theater');
const userModel = require('../models/user');
const showtimeModel = require('../models/showtime');
const bcrypt = require('bcryptjs');

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    const films = await filmModel.all();
    const theaters = await theaterModel.all();


    //console.log(await showtimeModel.allSeats(30000));
    //console.log(films);
    res.render('home', { title: 'Home', films, theaters });
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
      if (req.session.authUser.isadmin === 1){
        console.log('login admin successfully');
        res.redirect('/admin');  
      }

      else{
        const url = req.session.retUrl || '/';
        res.redirect(url);
      }
    
});
router.get('/signup', async function (req, res){
    res.render('guest/signup');
});
router.post('/signup', async function (req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    //const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const user = {
      username: req.body.username,
      password: hash,
      fullname: req.body.fullname,
      permission: 0
    }
  
    await userModel.add(user);
    res.render('guest/signin');
  })
  
  router.get('/is-available', async function (req, res) {
    const username = req.query.user;
    const user = await userModel.searchBy(username);
    if (user === null) {
      return res.json(true);
    }
  
    res.json(false);
  })
  router.post('/logout', async function (req, res) {
    req.session.auth = false;
    req.session.authUser = null;
    req.session.retUrl = null;
  
    const url = req.headers.referer || '/';
    res.redirect(url);
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
    const showtimes = await showtimeModel.allShowtimesByFilmGroupByTheater(film.id);
    res.render('guest/film', { title: film.title, film , showtimes, releasedate: film.releasedate});
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
    const showtimes = await showtimeModel.allShowtimesByTheaterGroupByFilm(theater.id);
    console.log(JSON.stringify(showtimes));
    res.render('guest/theater', { title: theater.name, theater, showtimes });
});
module.exports = router;