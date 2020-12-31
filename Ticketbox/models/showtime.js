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
    //moment(date).format('YYYY-MM-DD');
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
  async findBy(idfilm,idtheater,starttime,date) {
    const condition = {
      idfilm,idtheater,starttime
    };
      const sql = `select * from showtime where idfilm = ${idfilm} and idtheater = ${idtheater} and starttime ='${starttime}' and date = '${date}'`;
      const [rows, fields] = await db.load(sql);
      //console.log(rows.length);
      console.log(rows+"infindby");
      if(rows.length===0)
        return null;
      return rows[0];
  },
  async addshowtimes(idfilm, idtheater, starttime, begindate, enddate, ignore) {
    //starttime = moment.
    const arrDates = generateDate(begindate,enddate);
    let count = 0;
    for (const date of arrDates) {
      console.log(date);
      const showtime = {idfilm,idtheater,starttime,date};
      const find = await this.findBy(idfilm,idtheater,starttime,date);
      console.log(find);
      if(find === null){
        const [result, fields] = await this.add(showtime);
        console.log("res"+result);
        count += result.length;
      }
      else{
        if(ignore===false){
          const [result, fields] = await this.update(showtime,{id:find.id});
          console.log("res"+result);
          count += result.length;
        }
        
      }
    }
    return result;
  },

  async add(showtime) {
    const [result, fields] = await db.add(showtime, 'showtime');
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
  }
};
