var express = require('express');
var router = express.Router();
const filmModel = require('../../models/film');

router.get('/', async function (req, res) {
  const list = await filmModel.all();
  res.render('admin/film/index', {
    films: list,
    empty: list.length === 0
  });
})





router.get('/edit/:id', async function (req, res) {
  const id = req.params.id;
  const films = await filmModel.searchBy(parseInt(id));
  console.log(id);
  console.log(films);

  if (films === null) {
    return res.redirect('/admin/film');
  }

  res.render('admin/film/edit', {
    films
  });
})

router.post('/edit', async function (req, res, next) {
  const film = {
    id: parseInt(req.body.id),
    title: req.body.title,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    genre: req.body.genre,
    director: req.body.director,
    Cast: req.body.Cast,
    releasedate: req.body.releasedate,
    language: req.body.language,
    linkFilm: req.body.linkFilm
  }

  const result = await filmModel.update(film);
  if (result.length === 0) { console.log("Edit", id, "fail"); }
  console.log("Edit", film.id, "sucessful");

  res.redirect('/admin/film');
})



router.get('/add', async function (req, res) {
  res.render('admin/film/add');
})

router.post('/add', async function (req, res) {
  const film = {
    id: parseInt(req.body.id),
    title: req.body.title,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    genre: req.body.genre,
    director: req.body.director,
    Cast: req.body.Cast,
    releasedate: req.body.releasedate,
    language: req.body.language,
    linkFilm: req.body.linkFilm
  }

  console.log(film)
  const result = await filmModel.add(film);
  if (result.length === 0) { console.log("Delete", id, "fail"); }
  console.log("Add", film.id, "sucessful");

  res.redirect('/admin/film');
})

router.post('/delete', async function (req, res) {
  console.log("Delete");
  console.log(req.body.id_del);
  console.log(typeof (req.body.id_del));
  console.log(parseInt(req.body.id_del));

  // const id = req.body.id_del;
  const result = await filmModel.del(req.body.id_del);
  if (result.length === 0)
    console.log("Delete", id, "fail");
  console.log("Delete", id, "sucessful");

  res.redirect('/admin/film');
})


module.exports = router;