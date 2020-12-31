const db = require('../utils/db');

module.exports = {
  getNumberOfItems(cart) {
    let n = 0;
    for (const item of cart) {
      n += item.quantity;
    }

    return n;
  },

  async add(cart, item) {
    for (const ci of cart) {
      //console.log(ci.idshowtime === item.idshowtime && ci.idrowm === item.idrow);
      if (ci.idshowtime === item.idshowtime && ci.idrow === item.idrow && ci.idcolumn === item.idcolumn) {

        return 0;
      }
    }
    const {idshowtime,idrow,idcolumn} = item;
    if(await this.isAvailableASeat(idshowtime,idrow,idcolumn)){
      cart.push(item);
      return 1;
    }
      
    return -1;
  },

  remove(cart, item) {
    for (i = cart.length - 1; i >= 0; i--) {
    
      if (cart[i].idshowtime === item.idshowtime && cart[i].idrow === item.idrow && cart[i].idcolumn === item.idcolumn) {
        cart.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  async isAvailableASeat(idshowtime, idrow, idcolumn) {
    const sql = `select * from seatsofshowtime where idshowtime = ${idshowtime} and idrow = ${idrow} and idcolumn = ${idcolumn} and status is null`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows);
    if(rows.length===0)
        return null;
    return rows[0];
  },
  async getASeat(idshowtime, idrow, idcolumn) {
    const sql = `select * from seatsofshowtime where idshowtime = ${idshowtime} and idrow = ${idrow} and idcolumn = ${idcolumn}`;
    const [rows, fields] = await db.load(sql);
    //console.log(rows);
    if(rows.length===0)
        return null;
    return rows[0];
  },
  async bookASeat(idshowtime, idrow, idcolumn, idcus) {
    const sql = `update seatsofshowtime set status = ${idcus}  where idshowtime = ${idshowtime} and idrow = ${idrow} and idcolumn = ${idcolumn}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },
};
