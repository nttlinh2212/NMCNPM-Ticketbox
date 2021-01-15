const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select * from theater';
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  async all1() {
    const sql = 'select name, 0 as revenue from theater';
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  //fuction search key parameter can be integer(id) or string(name)
  async searchBy(key) {
    if(!isNaN(key)){
      const sql = `select * from theater where id = ${key}`;
      const [rows, fields] = await db.load(sql);
      //console.log(rows.length);
      if(rows.length===0)
        return null;
      return rows[0];
    }
    const sql = `select * from theater where name like "%${key}%"`;
    //console.log(sql);
    const [rows, fields] = await db.load(sql);
    //console.log(rows.length);
    if(rows.length===0)
        return null;
    return rows[0];  
    
  },
  async searchSimilar(key) {
    const sql = `select * from film where title like "%${key}%"`;
    console.log(sql);
    const [rows, fields] = await db.load(sql);
    console.log(rows.length);
    return rows;  
    
  },
  async add(theater) {
    const [result, fields] = await db.add(theater, 'theater');
    // console.log(result);
    return result;
  },

  async del(id) {
    const condition = {
      id
    };
    const [result, fields] = await db.del(condition, 'theater');
    return result;
  },

  async update(theater) {
    const condition = {
      id: theater.id
    };
    delete (theater.id);

    const [result, fields] = await db.update(theater, condition, 'theater');
    return result;
  }
};
