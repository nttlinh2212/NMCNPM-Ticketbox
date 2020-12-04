var express = require('express');
const filmModel = require('../models/film');
const theaterModel = require('../models/theater');
const userModel = require('../models/user');
const showtimeModel = require('../models/showtime');

var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const films = await filmModel.all();
  const theaters = await filmModel.all();
  
  console.log(films);
  res.render('index', { title: 'Home', films, theaters});
});
//duong dan den film co dang href='/film?id=3'
router.get('/film', async function(req, res, next) {
  const id = req.query.id;
  const film =  await filmModel.searchBy(id);
  console.log("id =",id,'film',film);
  if ( film === null){
    console.log('Not found Film');
    return res.redirect('/');
  }
    
  res.render('film',{title: 'Film',film});
});
module.exports = router;
