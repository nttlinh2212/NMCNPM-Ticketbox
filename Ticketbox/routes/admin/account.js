var express = require('express');
var router = express.Router();
const userModel = require('../../models/user');
const {authAdmin} = require('../../middlewares/auth');


router.get('/',authAdmin, async function (req, res) {
  const list = await userModel.allCustomer();
  res.render('admin/account/index', {
    users: list,
    empty: list.length === 0
  });
})

router.get('/edit/:id',authAdmin, async function (req, res) {
  const id = req.params.id;
  const users = await userModel.searchBy(parseInt(id));
  // console.log(id);
  // console.log(users);
  if (users === null) {
    return res.redirect('/admin/account');
  }

  res.render('admin/account/edit', {
    users
  });

})

router.post('/edit',authAdmin, async function (req, res, next) {
  const user = {
    id: parseInt(req.body.id),
    fullname: req.body.fullname,
    dob: req.body.dob,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    point: req.body.point,
    favouriteGenre: req.body.favouriteGenre,
    isadmin: parseInt(req.body.isadmin)
  }
  const result = await userModel.update(user);
  if (result.length === 0) { console.log("Edit", user.id, "fail"); }
  console.log("Edit", user.id, "sucessful");

  res.redirect('/admin/account');
})


router.get('/add',authAdmin, function (req, res) {
  res.render('admin/account/add');
})

router.post('/add',authAdmin, async function (req, res) {
  const user = {
    id: parseInt(req.body.id),
    fullname: req.body.fullname,
    dob: req.body.dob,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    point: req.body.point,
    favouriteGenre: req.body.favouriteGenre,
    isadmin: parseInt(req.body.isadmin)
  }


  const result = await userModel.add(user);
  if (result.length === 0) { console.log("Add", user.id, "fail"); }
  console.log("Add", user.id, "sucessful");

  res.redirect('/admin/account');
})


router.post('/delete',authAdmin, async function (req, res) {
  console.log("Delete");
  console.log("Delete");
  console.log("Delete");
  console.log(req.body.id_del);
  console.log(typeof (req.body.id_del));
  console.log(parseInt(req.body.id_del));

  const result = await userModel.del(req.body.id_del);
  if (result.length === 0)
    console.log("Delete", result.id, "fail");
  console.log("Delete", result.id, "sucessful");

  res.redirect('/admin/account');
})

module.exports = router;