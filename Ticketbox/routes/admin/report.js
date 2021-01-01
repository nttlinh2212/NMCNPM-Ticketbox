var express = require('express');
var router = express.Router();
const showtimeModel = require('../../models/showtime');
const filmModel = require('../../models/film');
const theaterModel = require('../../models/theater');
const {authAdmin} = require('../../middlewares/auth');

router.get('/get-revenue', async function (req, res) {
  console.log(req.query);
  const{idfilm,idtheater,starttime,begindate,enddate} = req.query;//idfilm,idtheater,starttime,begindate,enddate
  const result = await showtimeModel.getRevenue(idfilm,idtheater,starttime,begindate,enddate);
  console.log(result);//{sold_seat: ,total_seat: ,revenue: }
  res.json(result)
})
// $.getJSON('get-revenue?idfilm=null&idtheater=null&starttime=12:00:00&begindate=1/1/2021&enddate=2/1/2021'
router.get('/',authAdmin, async function (req, res) {
  
  const films = await filmModel.all();
  const theaters = await theaterModel.all();
  res.render('admin/report/index',{title:'Report',films,theaters});
})


module.exports = router;