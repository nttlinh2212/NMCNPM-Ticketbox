const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select * from film';
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  //fuction search key parameter can be integer(id) or string(title)
  async searchBy(key) {
    if(!isNaN(key)){
      const sql = `select * from film where id = ${key}`;
      const [rows, fields] = await db.load(sql);
      console.log(rows.length);
      if(rows.length===0)
        return null;
      return rows[0];
    }
    const sql = `select * from film where title like "${key}"`;
    console.log(sql);
    const [rows, fields] = await db.load(sql);
    console.log(rows.length);
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
  async full_text_search(keyword) {
    const sql = `SELECT * FROM film
    where match(title,cast,director) against ('${keyword}')`;
    const [result, fields] = await db.load(sql);
    console.log("listfilmfound: "+result);
    return result;
  },
  async add(film) {
    const [result, fields] = await db.add(film, 'film');
    // console.log(result);
    return result;
  },

  async del(id) {
    const condition = {
      id
    };
    const [result, fields] = await db.del(condition, 'film');
    return result;
  },

  async update(film) {
    const condition = {
      id: film.id
    };
    delete (film.id);
    const [result, fields] = await db.update(film, condition, 'film');
    return result;
  }
};
