var express = require('express');
var router = express.Router();
const showtimeModel = require('../../models/showtime');
const filmModel = require('../../models/film');
const theaterModel = require('../../models/theater');
const { authAdmin } = require('../../middlewares/auth');


router.get('/', authAdmin, async function (req, res) {
  var dateToday = new Date();
  dateToday = dateToday.toISOString().split("T");
  dateToday = dateToday[0];

  // console.log(dateToday);

  theaters = await theaterModel.all();

  // console.log(theaters);
  // console.log(theaters[0].id);

  var defaultTheaterShowtime = await showtimeModel.allT(theaters[0].id, dateToday);

  // console.log(defaultTheaterShowtime);
  res.render('admin/showtime/index', {
    defaultTheaterShowtime,
    dateToday,
    theaters,
  });
})



router.get('/getShowtimesByTheaterAndDate', authAdmin, async function (req, res) {

  var listShowtimesByTheaterAndDate = await showtimeModel.allT(req.query.id, req.query.date);
  console.log(listShowtimesByTheaterAndDate);

  res.json(listShowtimesByTheaterAndDate);
})

router.get('/deleteShowtime', async function (req, res) {
  console.log("Delete");
  var id = parseInt(req.query.idShowtime);
  console.log(id);

  const result = await showtimeModel.del(id);
  if (result.length === 0) {
    console.log("Delete", id, "fail");
    res.json({ result: false });
  }
  else {
    console.log("Delete", id, "sucessful");
    res.json({ result: true });
  }
})




router.get('/edit/:id', async function (req, res) {
  const id = req.params.id;
  const showtimes = await showtimeModel.searchBy(parseInt(id));
  films = await filmModel.all(),
    theaters = await theaterModel.all()
  console.log(id);
  console.log(showtimes);

  if (showtimes === null) {
    return res.redirect('/admin/showtime');
  }

  res.render('admin/showtime/edit', {
    showtimes,
    films,
    theaters
  });
})

router.post('/edit', async function (req, res, next) {
  const showtime = {
    id: parseInt(req.body.id),
    idtheater: parseInt(req.body.idtheater),
    idfilm: parseInt(req.body.idfilm),
    starttime: req.body.starttime,
    numberofrows: parseInt(req.body.numberofrows),
    numberofcolumns: parseInt(req.body.numberofcolumns),
    date: req.body.date
  }

  const result = await showtimeModel.update(showtime);
  if (result.length === 0) { console.log("Edit", id, "fail"); }
  console.log("Edit", showtime.id, "sucessful");

  res.redirect('/admin/showtime');
})


// cach goi $.getJSON(`/add-showtimes?idfilm=10000&idtheater=10000&starttime=8:00:00&begindate=01/01/2020&enddate=5/1/2020&ignore=true`)
router.get('/add-showtimes', async function (req, res) {
  console.log(req.query);
  const { idfilm, idtheater, starttime, begindate, enddate, ignore } = req.query;
  res.json(await showtimeModel.addshowtimes(idfilm, idtheater, starttime, begindate, enddate, ignore));
  //return so luong showtimes da add
})

router.post('/add', async function (req, res) {
  var beginningday = req.body.beginningday.split("-");
  var endday = req.body.endday.split("-");
  beginningday = beginningday[2] + "/" + beginningday[1] + "/" + beginningday[0];
  endday = endday[2] + "/" + endday[1] + "/" + endday[0];
  var ignore = true;
  if (req.body.ignore == undefined) {
    ignore = false;
  }
  const showtime = {
    idtheater: parseInt(req.body.idtheater),
    idfilm: parseInt(req.body.idfilm),
    starttime: req.body.starttime,
    begindate: beginningday,
    enddate: endday,
    ignore: ignore
  }
  console.log(showtime);
  var result = await showtimeModel.addshowtimes(showtime.idfilm, showtime.idtheater, showtime.starttime, showtime.begindate, showtime.enddate, showtime.ignore);
  //return so luong showtimes da add
  console.log(result);
  res.render('admin/showtime/addResult', {
    result
  });
})



router.get('/add', async function (req, res) {
  const theaters = await theaterModel.all();
  const films = await filmModel.all();
  res.render('admin/showtime/add', {
    films,
    theaters
  });
})





module.exports = router;