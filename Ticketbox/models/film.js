const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select * from film';
    const [rows, fields] = await db.load(sql);
    console.log(rows,typeof(rows));
    return rows;
  },

  async searchBy(id) {
    const sql = `select * from film where id = ${id}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async add(film) {
    const [result, fields] = await db.add(film, 'film');
    // console.log(result);
    if (result.length === 0)
      return null;

    return result;
  },

  async del(id) {
    const condition = {
      id
    };
    const [result, fields] = await db.del(condition, 'film');
    if (result.length === 0)
      return null;

    return result;
  },

  async update(film) {
    const condition = {
      id: film.id
    };
    delete (film.id);

    const [result, fields] = await db.update(film, condition, 'film');
    if (result.length === 0)
      return null;
    return result;
  }
};
