var express = require('express');
var router = express.Router();
var multer = require('multer');
const filmModel = require('../../models/film');
const { authAdmin } = require('../../middlewares/auth');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

router.get('/', authAdmin, async function (req, res) {
  const list = await filmModel.all();
  res.render('admin/film/index', {
    films: list,
    empty: list.length === 0,
    adminName : req.session.authUser.fullname
  });
})

router.get('/edit/:id', async function (req, res) {
  const id = req.params.id;
  const films = await filmModel.searchBy(parseInt(id));

  if (films === null) {
    return res.redirect('/admin/film');
  }

  var genre = films.genre.split(",");

  var tempGenre = [
    { "value": "Action", "checked": false },
    { "value": "Drama", "checked": false },
    { "value": "Comedy", "checked": false },
    { "value": "Animation", "checked": false },
  ]

  genre.forEach(function (item) {
    tempGenre.forEach(function (itemGenre) {
      if (item === itemGenre.value) {
        itemGenre.checked = true;
      }
    })
  })

  films.genre = tempGenre;

  console.log(films.genre);
  res.render('admin/film/edit', {
    films,
    adminName : req.session.authUser.fullname
  });
})

router.post('/edit', upload.single('file'), async function (req, res, next) {
  console.log(req.body.genre);
  console.log(typeof(req.body.genre));

  var genre = "";
  if (req.body.genre === undefined) {

  }
  else if (typeof (req.body.genre) === "string") {
    genre = req.body.genre;
  }
  // req.body.genre == object
  else {
    req.body.genre.forEach(element => {
      genre = genre + "," + element;
    });
    genre = genre.slice(1);
  }

  const film = {
    id: parseInt(req.body.id),
    title: req.body.title,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    genre: genre,
    director: req.body.director,
    Cast: req.body.Cast,
    releasedate: req.body.releasedate,
    language: req.body.language,
    video: req.body.video,
    linkFilm: "/images/" + req.file.filename
  }

  const result = await filmModel.update(film);
  if (result.length === 0) { console.log("Edit", id, "fail"); }

  console.log("Edit", film.id, "sucessful");
  res.redirect('/admin/film');
})


router.post('/editWithoutUploadImage', async function (req, res, next) {
  var id = parseInt(req.body.id);
  const films = await filmModel.searchBy(id);
  console.log(req.body.genre);
  console.log(typeof(req.body.genre));

  var genre = "";
  if (req.body.genre === undefined) {

  }
  else if (typeof (req.body.genre) === "string") {
    genre = req.body.genre;
  }
  // req.body.genre == object
  else {
    req.body.genre.forEach(element => {
      genre = genre + "," + element;
    });
    genre = genre.slice(1);
  }

  const film = {
    id: parseInt(req.body.id),
    title: req.body.title,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    genre: genre,
    director: req.body.director,
    Cast: req.body.Cast,
    releasedate: req.body.releasedate,
    language: req.body.language,
    video: req.body.video,
    linkFilm: films.linkFilm
  }

  const result = await filmModel.update(film);
  if (result.length === 0) { console.log("Edit", id, "fail"); }

  console.log("Edit", film.id, "sucessful");
  res.redirect('/admin/film');
})

router.get('/add', async function (req, res) {
  res.render('admin/film/add', {adminName : req.session.authUser.fullname});
})

router.post('/add', upload.single('file'), async function (req, res, next) {
  var genre = "";
  if (req.body.genre === undefined) {

  }
  else if (typeof (req.body.genre) === "string") {
    genre = req.body.genre;
  }
  // req.body.genre == object
  else {
    req.body.genre.forEach(element => {
      genre = genre + "," + element;
    });
    genre = genre.slice(1);
  }

  console.log("Genre :" + genre);
  const film = {
    title: req.body.title,
    description: req.body.description,
    duration: parseInt(req.body.duration),
    genre: genre,
    director: req.body.director,
    Cast: req.body.Cast,
    releasedate: req.body.releasedate,
    language: req.body.language,
    video: req.body.video,
    linkFilm: "/images/" + req.file.filename
  }

  const result = await filmModel.add(film);
  if (result.length === 0) { console.log("Add", id, "fail"); }
  console.log("Add", film.id, "sucessful");
  res.redirect('/admin/film');
})

router.post('/delete', async function (req, res) {
  console.log("Delete");
  console.log(req.body.id_del);
  console.log(typeof (req.body.id_del));
  console.log(parseInt(req.body.id_del));

  const id = req.body.id_del;
  const result = await filmModel.del(req.body.id_del);
  if (result.length === 0)
    console.log("Delete", id, "fail");
  console.log("Delete", id, "sucessful");

  res.redirect('/admin/film');
})


module.exports = router;