const db = require('../utils/db');
const moment = require('moment');
const {generateDate} = require('../utils/format');

module.exports = {
  async all() {
    const sql = 'select * from showtime';
    const [rows, fields] = await db.load(sql);
    return rows;
  },
  async allShowtimesByTheaterGroupByFilm(idtheater) {
    const sql = 'select date from showtime group by date ';
    const [rows, fields] = await db.load(sql);
    if(rows.length === 0){
      return [[[]]];
    }
    
    var res = [];
    for (const one of rows) {
      const temp = await this.allShowtimesByTheaterGroupByFilm1(idtheater,one.date);
      res.push(temp);
    }
    return res;
  },
  
  async allShowtimesByTheaterGroupByFilm1(idtheater,date) {
    var mysqlDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(mysqlDate);
    const sql = `SELECT s.idfilm FROM showtime s where idtheater = ${idtheater} and date ='${mysqlDate}' group by s.idfilm order by s.idfilm asc `;
    const [rows, fields] = await db.load(sql);
    //console.log(sql);
    if(rows.length === 0){
      return null;
    }
    var res = [];
    //console.log(rows+"rowwwww");
    for (const one of rows) {
      const temp = await this.allShowtimesByTF(idtheater,one.idfilm,mysqlDate);
      res.push(temp);
    }
    return res;
  },
  async allShowtimesByFilmGroupByTheater(idfilm) {
    const sql = 'select date from showtime group by date ';
    const [rows, fields] = await db.load(sql);
    if(rows.length === 0){
      return [[[]]];
    }
    var res = [];
    for (const one of rows) {
      const temp = await this.allShowtimesByFilmGroupByTheater1(idfilm,one.date);
      res.push(temp);
    }
    return res;
    
  },
  
  async allShowtimesByFilmGroupByTheater1(idfilm,date) {
    var mysqlDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(mysqlDate);
    const sql = `SELECT s.idtheater FROM showtime s where idfilm = ${idfilm} and date ='${mysqlDate}' group by s.idtheater order by s.idtheater asc `;
    const [rows, fields] = await db.load(sql);
    if(rows.length === 0){
      return null;
    }
    var res = [];
    for (const one of rows) {
      const temp = await this.allShowtimesByTF(one.idtheater,idfilm,mysqlDate);
      res.push(temp);
    }
    return res;
  },
  async allShowtimesByTF(idtheater,idfilm,date) {
    const sql = `select s.id,s.idtheater,t.name,s.idfilm,f.title,s.date,s.starttime from showtime s join theater t on t.id = s.idtheater join film f on f.id = s.idfilm
      where s.idtheater = ${idtheater} and s.idfilm = ${idfilm} and date = '${date}'
      order by s.date asc`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allSeats(idshowtime) {
    const showtime = await this.findByID(idshowtime);
    const num_rows = showtime.numberofrows;
    const num_columns = showtime.numberofcolumns;

    const sql = `select * from seatsofshowtime where idshowtime = ${idshowtime}`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows);
    if(rows.length===0)
        return null;
    let lstSeats = [];
    let k = 0; 
    //console.log(num_columns,num_rows);
    for (let i = 0; i < num_rows; i++) {
        let arr = [];
        for (let j = 0; j < num_columns; j++) {
            arr.push(rows[k++]);
        //console.log(arr);  
        }
        lstSeats.push(arr);
        
    }
    return lstSeats;
  },
  //fuction search key parameter can be integer(id)
  
  async findByID(id) {
    const condition = {
      id 
    };
      const sql = 'select * from showtime where ?';
      const [rows, fields] = await db.load1(sql,condition);
      console.log(rows.length);
      console.log(rows+"infindby");
      if(rows.length===0)
        return null;
      return rows[0];
  },
  async findBy(idtheater,starttime,date) {
      const sql = `select * from showtime where idtheater = ${idtheater} and starttime ='${starttime}' and date = '${date}'`;
      const [rows, fields] = await db.load(sql);
      console.log(sql);
      console.log(rows+"infindby");
      if(rows.length===0)
        return null;
      return rows[0];
  },
  async addshowtimes(idfilm, idtheater, starttime, begindate, enddate, ignore) {
    const arrDates = generateDate(begindate,enddate);
    starttime = moment(starttime, 'HH:mm:ss').format('HH:mm:ss');
    //console.log(starttime);
    let count = 0;
    for (const date of arrDates) {
      //console.log(date);
      const showtime = {idfilm,idtheater,starttime,date};
      const find = await this.findBy(idtheater,starttime,date);
      //console.log(find);
      if(find === null){
        const result = await this.add(showtime);
        //console.log("res"+JSON.stringify(result));
        if (result){
          count += result.affectedRows;
          console.log(await this.addseats(result.insertId));
        }
          
      }
      else{
        if(!ignore||ignore==='false'){
          const result = await this.update(showtime,{id:find.id});
          //console.log("res"+result);
          if (result)
            count += result.affectedRows;
        }
        
      }
    }
    return (count);
  },

  async add(showtime) {
    const [result, fields] = await db.add(showtime, 'showtime');
    // console.log(result);
    return result;
  },
  async addseats(idshowtime) {
    let count = 0;
    for(let i = 0; i<5;i++){
      for(let j = 0;j<8;j++){
        seat = {idshowtime,idrow: i,idcolumn: j};
        if(i>=2)
          seat.ticketprice = 50000;
        else
          seat.ticketprice = 40000;
        result = await this.addASeat(seat);
        count+=result.affectedRows
        //console.log("res" + result);
      }
    }
    return count;
  },
  async addASeat(seat) {
    const [result, fields] = await db.add(seat, 'seatsofshowtime');
    // console.log(result);
    return result;
  },
  async del(id) {
    const condition = {
      id
    };
    const [result, fields] = await db.del(condition, 'showtime');
    return result;
  },

  async update(showtime, condition) {
    const [result, fields] = await db.update(showtime, condition, 'showtime');
    return result;
  },
  async getRevenue(idfilm,idtheater,starttime,begindate,enddate ) {
    res = {sold_seat:0,total_seat:0,revenue:0};
    parameters = [];//count(*), sum(ticketprice)// count(idshowtime)*5*8 as total,
    let sql = 'select  count(*) as number, sum(ticketprice) as revenue from seatsofshowtime se join showtime s on se.idshowtime = s.id  where se.status is not null ';
    let sql1 = 'select count(*)*5*8 as total  from showtime where 1=1 ';
    if (idfilm&&idfilm !== 'null'){
      sql+='and idfilm = ? ';
      sql1+='and idfilm = ? ';
      parameters.push(idfilm);
    }  
    if (idtheater&&idtheater !== 'null'){
      sql+='and idtheater = ? ';
      sql1+='and idtheater = ? ';
      parameters.push(idtheater);
    }
    if (starttime&&starttime !== 'null'){
      sql+='and starttime = ? ';
      sql1+='and starttime = ? ';
      parameters.push(starttime);
    }
      
    dates = generateDate(begindate,enddate);//se.status is not null and//
    sql+='and date = ? ';
    sql1+='and date = ? ';
    
      
    for (const date of dates) {
      console.log(date);
      parameters.push(date);
      const [rows, fields] = await db.load1(sql,parameters);
      const [rows1, fields1] = await db.load1(sql1,parameters);
      if (rows1[0].total!==0){
        res.total_seat+=rows1[0].total;
      }
      if (rows[0].number!==0){
        res.sold_seat+=rows[0].number;
        res.revenue+=(+rows[0].revenue);
      }
      console.log(JSON.stringify(rows),JSON.stringify(rows1));
      parameters.pop();
    }  
    return res;
  }
};
