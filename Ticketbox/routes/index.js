var express = require('express');
const filmModel = require('../models/film');
//const theaterModel = require('../models/theater');


var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const films = await filmModel.all();
  //const theaters = await theaterModel.all();
  console.log(films);
  res.render('index', { title: 'Home', films: films});
});

module.exports = router;
