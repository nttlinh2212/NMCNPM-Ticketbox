const db = require('../utils/db');

module.exports = {
  async allCustomer() {
    const sql = 'select * from user';
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    return rows;
  },
  //fuction search key parameter can be integer(id) or string(username)
  async searchBy(key) {
    if(!isNaN(key)){
      const sql = `select * from user where id = ${key}`;
      const [rows, fields] = await db.load(sql);
      console.log(rows.length);
      if (rows.length===0)
        return null;
      return rows[0];
    }
    const sql = `select * from user where username like "${key}"`;
    console.log(sql);
    const [rows, fields] = await db.load(sql);
    console.log(rows.length);
    if (rows.length===0)
        return null;
    return rows[0];  
    
  },
  async searchSimilar(usename) {
    const sql = `select * from user where username like "%${usename}%"`;
    console.log(sql);
    const [rows, fields] = await db.load(sql);
    console.log(rows.length);
    return rows;  
    
  },

  async add(user) {
    const [result, fields] = await db.add(cus, 'user');
    // console.log(result);

    return result;
  },
  async del(id) {
    const condition = {
      id
    };
    const [result, fields] = await db.del(condition, 'user');

    return result;
  },

  async update(user) {
    const condition = {
      id: user.id
    };
    delete (user.id);
    const [result, fields] = await db.update(user, condition, 'user');
    return result;
  },
  //0 wrong 1 cus 2 admin
  async checkAnAccount(username, password){
    const sql = `select * from user where username = ${username} and password =${password}`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows,typeof(rows));
    if(rows.length===0)
        return 0;
    if(rows[0].isadmin)
        return 2;
    return 1;
  }

};
