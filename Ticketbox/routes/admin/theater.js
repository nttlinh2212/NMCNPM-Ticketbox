var express = require('express');
var router = express.Router();
const theaterModel = require('../../models/theater');
const { authAdmin } = require('../../middlewares/auth');

router.get('/', authAdmin, async function (req, res) {
  const list = await theaterModel.all();
  console.log(list);
  res.render('admin/theater/index', {
    theaters: list,
    empty: list.length === 0,
    adminName: req.session.authUser.fullname
  });
})

router.get('/edit/:id', async function (req, res) {
  const id = req.params.id;
  const theaters = await theaterModel.searchBy(parseInt(id));
  console.log(id);
  console.log(theaters);

  if (theaters === null) {
    return res.redirect('/admin/theater');
  }

  res.render('admin/theater/edit', {
    theaters,
    adminName: req.session.authUser.fullname
  });
})

router.post('/edit', async function (req, res, next) {
  const theater = {
    id: parseInt(req.body.id),
    name: req.body.name,
    address: req.body.address
  }

  const result = await theaterModel.update(theater);
  if (result.length === 0) { console.log("Edit", theater.id, "fail"); }
  console.log("Edit", theater.id, "sucessful");
  res.redirect('/admin/theater');
})



router.get('/add', async function (req, res) {
  res.render('admin/theater/add', { theaters: theaterModel.all(), adminName: req.session.authUser.fullname });
})

router.post('/add', async function (req, res) {
  const theater = {
    name: req.body.name,
    address: req.body.address
  }

  console.log(theater)
  const result = await theaterModel.add(theater);
  if (result.length === 0) { console.log("Add", theater.idtheater, "fail"); }
  console.log("Add", theater.idtheater, "sucessful");

  res.redirect('/admin/theater');
})

router.post('/delete', async function (req, res) {
  console.log("Delete");
  console.log(req.body.id_del);
  console.log(typeof (req.body.id_del));
  console.log(parseInt(req.body.id_del));

  const id = req.body.id_del;
  const result = await theaterModel.del(req.body.id_del);
  if (result.length === 0)
    console.log("Delete", id, "fail");
  console.log("Delete", id, "sucessful");

  res.redirect('/admin/theater');
})


module.exports = router;