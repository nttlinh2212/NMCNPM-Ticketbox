var express = require('express');
var router = express.Router();
const showtimeModel = require('../../models/showtime');
const filmModel = require('../../models/film');
const theaterModel = require('../../models/theater');

router.get('/', async function (req, res) {
  const list = await showtimeModel.all();
  console.log(list);
  res.render('admin/showtime/index', {
    showtimes: list,
    films : await filmModel.all(),
    theaters : await theaterModel.all(),
    empty: list.length === 0
  });
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
// cach goi $.getJSON(`/add-showtimes?idfilm=10000&idtheater=10000&starttime=8:00:00&begindate=2020/01/01&enddate=2020/01/05&ignore=true`)
router.get('/add-showtimes', async function (req, res) {
  console.log(req.query);
  const {idfilm, idtheater, starttime, begindate, enddate, ignore} = req.query;
  res.json(showtimeModel.addshowtimes(idfilm, idtheater, starttime, begindate, enddate, ignore));
  //return so luong showtimes da add
})

router.get('/add', async function (req, res) {
  const theaters = await theaterModel.all();
  const films = await filmModel.all();
  console.log(theaters);
  console.log(films);
  res.render('admin/showtime/add',{
    films,
    theaters
  });
})

router.post('/add', async function (req, res) {
  const showtime = {
    // id: parseInt(req.body.id),
    idtheater: parseInt(req.body.idtheater),
    idfilm: parseInt(req.body.idfilm),
    starttime: req.body.starttime,
    numberofrows: parseInt(req.body.numberofrows),
    numberofcolumns: parseInt(req.body.numberofcolumns),
    date: req.body.date
  }

  console.log(showtime)
  const result = await showtimeModel.add(showtime);
  if (result.length === 0) { console.log("Add", showtime.idshowtime, "fail"); }
  console.log("Add", showtime.idshowtime, "sucessful");

  res.redirect('/admin/showtime');
})

router.post('/delete', async function (req, res) {
  console.log("Delete");
  console.log(req.body.id_del);
  console.log(typeof (req.body.id_del));
  console.log(parseInt(req.body.id_del));

  const id = req.body.id_del;
  const result = await showtimeModel.del(req.body.id_del);
  if (result.length === 0)
    console.log("Delete", id, "fail");
  console.log("Delete", id, "sucessful");

  res.redirect('/admin/showtime');
})


module.exports = router;