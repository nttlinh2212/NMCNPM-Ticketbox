var express = require('express');
var router = express.Router();
const showtimeModel = require('../../models/showtime');
const filmModel = require('../../models/film');
const theaterModel = require('../../models/theater');
const { authAdmin } = require('../../middlewares/auth');

router.get('/get-revenue-by-film', async function(req, res) { //o day ngay phai co dang d/m/y xem sua datetimepicker thanh dang 
        console.log(req.query,'query');
        //const result = await showtimeModel.getRevenue(null, 10001, null, '1/1/2021', '5/1/2021');
        const result = await showtimeModel.getRevenue(req.query.idfilm, req.query.idtheater, req.query.starttime, req.query.begindate, req.query.enddate);
        console.log(result+'result');
        res.json(result);
    })
    // $.getJSON('get-revenue?idfilm=null&idtheater=null&starttime=12:00:00&begindate=1/1/2021&enddate=2/1/2021'

router.get('/get-revenue-by-theater', async function(req, res) { //o day ngay phai co dang d/m/y xem sua datetimepicker thanh dang 
    console.log(req.query);
    // const result = await showtimeModel.getRevenuebytheater(10000, null, null, '1/1/2021', '5/1/2021');
    const result = await showtimeModel.getRevenuebytheater(req.query.idfilm, req.query.idtheater, req.query.starttime, req.query.begindate, req.query.enddate);
    console.log(result);
    res.json(result);

})

router.get('/', async function(req, res) {
    var dateToday = new Date();
    var dd = dateToday.getDate();
  
    var mm = dateToday.getMonth() + 1;
    var yyyy = dateToday.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
  
    if (mm < 10) {
      mm = '0' + mm;
    }
    dateToday = yyyy + '-' + mm + '-' + dd;
    console.log(dateToday);

    const films = await filmModel.all();
    const theaters = await theaterModel.all();
    res.render('admin/report/index', { title: 'Report', films, theaters, dateToday, adminName : req.session.authUser.fullname });
})


module.exports = router;
// var beginningday = req.query.beginningday.split("-");
//   var endday = req.query.endday.split("-");
//   beginningday = beginningday[2] + "/" + beginningday[1] + "/" + beginningday[0];
//   endday = endday[2] + "/" + endday[1] + "/" + endday[0];