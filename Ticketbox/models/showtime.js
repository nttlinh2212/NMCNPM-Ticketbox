const db = require('../utils/db');
const moment = require('moment');

module.exports = {
  async all() {
    const sql = 'select * from showtime';
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  async allShowtimesByTheaterGroupByFilm(idtheater) {
    //console.log("in here allShowtimesByTheaterGroupByFilm");
    const sql = 'select date from showtime group by date ';
    //console.log(sql);
    const [rows, fields] = await db.load(sql);
    if(rows.length === 0){
      return [[[]]];
    }
    var res = [];
    for (const one of rows) {
      const temp = await this.allShowtimesByTheaterGroupByFilm1(idtheater,one.date);
      res.push(temp);
    }
    //console.log(JSON.stringify(res));
    return res;
  },
  async allShowtimesByTheaterGroupByFilm1(idtheater,date) {
    //console.log("innnnnnn hereallShowtimesByTheaterGroupByFilm");
    var mysqlDate = moment(date).format('YYYY-MM-DD');
    console.log(mysqlDate);
    const sql = `SELECT s.idfilm FROM showtime s where idtheater = ${idtheater} and date ='${mysqlDate}' group by s.idfilm order by s.idfilm asc `;
    //console.log(this.findBy(mysqlDate));
    const [rows, fields] = await db.load(sql);
    //console.log(rows);
    if(rows.length === 0){
      return [[]];
    }
    var res = [];
    for (const one of rows) {
      const temp = await this.allShowtimesByTF(idtheater,one.idfilm,mysqlDate);
      res.push(temp);
    }
    //console.log(res);
    return res;
  },
  async allShowtimesByFilmGroupByTheater(idfilm) {
    //console.log("in here allShowtimesByTheaterGroupByFilm");
    const sql = 'select date from showtime group by date ';
    //console.log(sql);
    const [rows, fields] = await db.load(sql);
    if(rows.length === 0){
      return [[[]]];
    }
    var res = [];
    for (const one of rows) {
      const temp = await this.allShowtimesByFilmGroupByTheater1(idfilm,one.date);
      res.push(temp);
    }
    //console.log(JSON.stringify(res));
    return res;
    
  },
  async allShowtimesByFilmGroupByTheater1(idfilm,date) {
    //console.log("innnnnnn hereallShowtimesByTheaterGroupByFilm");
    var mysqlDate = moment(date).format('YYYY-MM-DD');
    console.log(mysqlDate);
    const sql = `SELECT s.idtheater FROM showtime s where idfilm = ${idfilm} and date ='${mysqlDate}' group by s.idtheater order by s.idtheater asc `;
    //console.log(this.findBy(mysqlDate));
    const [rows, fields] = await db.load(sql);
    //console.log(rows);
    if(rows.length === 0){
      return [[]];
    }
    var res = [];
    for (const one of rows) {
      const temp = await this.allShowtimesByTF(one.idtheater,idfilm,mysqlDate);
      res.push(temp);
    }
    //console.log(res);
    return res;
  },
  async allShowtimesByTF(idtheater,idfilm,date) {
    const sql = `select s.id,s.idtheater,t.name,s.idfilm,f.title,s.date,s.starttime from showtime s join theater t on t.id = s.idtheater join film f on f.id = s.idfilm
      where s.idtheater = ${idtheater} and s.idfilm = ${idfilm} and date = '${date}'
      order by s.date asc`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  // async allShowtimesByTheater(idtheater) {
  //   const sql = `select * from showtime s join theater t on t.id = s.idtheater join film f on f.id = s.idfilm  
  //   where s.idtheater = ${idtheater}`;
  //   const [rows, fields] = await db.load(sql);
  //   //console.log(rows,typeof(rows));
  //   return rows;
  // },
  // async allShowtimesByFilm(idfilm,date) {
  //   const sql = `select * from showtime s join theater t on t.id = s.idtheater join film f on f.id = s.idfilm  
  //   where s.idfilm = ${idfilm} and date = '${date}'`;
  //   const [rows, fields] = await db.load(sql);
  //   //console.log(rows,typeof(rows));
  //   return rows;
  // },
  async allSeats(idshowtime) {
    const sql = `select * from showtime,seatsofshowtime where id = idshowtime and idshowtime = ${idshowtime}`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows);
    if(rows.length===0)
        return null;
    let lstSeats = [];
    let k = 0; 
    const num_rows = rows[0].numberofrows;
    const num_columns = rows[0].numberofcolumns;
    for (let i = 0; i < num_rows; i++) {
        let arr = [];
        for (let j = 0; j < num_columns; j++) {
            arr.push(rows[k++]);
        //console.log(arr);  
        }
        lstSeats.push(arr);
        
    }
    //console.log(lstSeats.length,lstSeats[0].length);
    return lstSeats;
  },
  //fuction search key parameter can be integer(id)
  async searchBy(key) {
    if(!isNaN(key)){
      const sql = `select * from showtime where id = ${key}`;
      const [rows, fields] = await db.load(sql);
      console.log(rows.length);
      if(rows.length===0)
        return null;
      return rows[0];
    }
    return null; 
    
  },
  async findBy(date) {
    const condition = {
      //idtheater,
      date
      
    };
      const sql = 'select * from showtime where ?';
      const [rows, fields] = await db.load1(sql,condition);
      console.log(rows.length);
      console.log(rows);
      if(rows.length===0)
        return null;
      return rows;
    
    
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

  async update(showtime) {
    const condition = {
      id: showtime.id
    };
    delete (showtime.id);
    const [result, fields] = await db.update(showtime, condition, 'showtime');
    return result;
  }
};
