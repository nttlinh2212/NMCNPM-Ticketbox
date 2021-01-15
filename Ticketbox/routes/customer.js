var express = require('express');
const filmModel = require('../models/film');
const theaterModel = require('../models/theater');
const userModel = require('../models/user');
const showtimeModel = require('../models/showtime');
const moment = require("moment");

var router = express.Router();

/* GET home page. */
router.get('/profile', async function(req, res, next) { 
    res.render('customer/profile', { title: "Profile", user: req.session.authUser });
});
router.post('/update-info', async function(req, res, next) {
    //dob tra ve dang dd/mm/yyyy
    const entity = {
        full_name: req.body.full_name,
        id: req.session.authUser.id,
        dob: moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        phone:req.body.phone
    }
    console.log(entity);
    await userModel.update(entity);
    res.json();//lun true 
});
//postJSON('/customer/change-password',{oldpass,newpass})// Js check confirm pass
router.post('/change-password', async function(req, res, next) {
    
    console.log(req.body.oldPassword);
    console.log(req.body.newPassword);
    const ret = bcrypt.compareSync(req.body.oldPassword, req.session.authUser.password);
    console.log(ret);

    if (ret===true) {
        var Obj = {
                password: bcrypt.hashSync(req.body.newPassword, 10),
                id: req.session.authUser.id,
            }
            // console.log(Obj);
        var result = await userModel.update(Obj);
        // console.log(result);

        res.json(true); //change pw successfully
    } else {
        res.json(false); //nghia la pass cu nhap ko dung
    }
});
// /book-tikets/30000
router.get('/book-tickets/:id', async function(req, res, next) {
    req.session.cart = [];
    id = +req.params.id;
    const showtime = await showtimeModel.findByID(id);
    const theater = await theaterModel.searchBy(showtime.idtheater);
    const film = await filmModel.searchBy(showtime.idfilm)
    const seats = await showtimeModel.allSeats(id);
    console.log(JSON.stringify(film) + JSON.stringify(theater) + JSON.stringify(showtime) + 'hre');
    res.render('customer/book-tickets', { title: "Book Tickets", seats, showtime, theater, film });
});
module.exports = router;