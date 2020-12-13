var express = require('express');
var router = express.Router();
const filmModel = require('../models/film');

/* GET users listing. */

router.get('/', async function(req, res) {
    const list = await filmModel.all();
    console.log(list);
    res.render('admin/film/index', {
        films: list,
        empty: list.length === 0
    });
})

router.get('/edit', async function(req, res) {
    const id = req.query.id;
    const film = await filmModel.searchBy(id);
    if (film === null) {
        return res.redirect('/admin/film');
    }

    res.render('admin/film/edit', {
        film
    });
})

router.get('/add', function(req, res) {
    res.render('admin/film/add');
})

router.post('/add', async function(req, res) {
    await filmModel.add(req.body);
    res.render('admin/film/add');
})

router.post('/del', async function(req, res) {
    await filmModel.del(req.body.CatID);
    res.redirect('/admin/film');
})

router.post('/update', async function(req, res) {
    await filmModel.update(req.body);
    res.redirect('/admin/film');
})

module.exports = router;