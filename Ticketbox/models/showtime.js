const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select * from showtime';
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  async allShowtimesByTheater(idtheater) {
    const sql = `select * from showtime where idtheater = ${idtheater}`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  async allShowtimesByFilm(idfilm) {
    const sql = `select * from showtime where idfilm = ${idfilm}`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
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
