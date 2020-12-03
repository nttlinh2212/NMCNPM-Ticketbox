const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select * from film';
    const [rows, fields] = await db.load(sql);
    console.log(rows)
    return rows;
  },

  async single(id) {
    const sql = `select * from film where id = ${id}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
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

  async patch(entity) {
    const condition = {
      id: entity.id
    };
    delete (entity.id);

    const [result, fields] = await db.patch(entity, condition, 'film');
    return result;
  }
};
