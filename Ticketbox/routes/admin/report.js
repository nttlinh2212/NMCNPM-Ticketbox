var express = require('express');
var router = express.Router();
const showtimeModel = require('../../models/showtime');
const filmModel = require('../../models/film');
const theaterModel = require('../../models/theater');
const {authAdmin} = require('../../middlewares/auth');

router.get('/get-revenue', async function (req, res) {
  console.log(req.query);

  var beginningday = req.query.beginningday.split("-");
  var endday = req.query.endday.split("-");
  beginningday = beginningday[2] + "/" + beginningday[1] + "/" + beginningday[0];
  endday = endday[2] + "/" + endday[1] + "/" + endday[0];

  const result = await showtimeModel.getRevenue(req.query.idfilm,req.query.idtheater,req.query.starttime,beginningday,endday);
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