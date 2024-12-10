const pool = require('../db/db');

module.exports = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM transactions ORDER BY transaction_date DESC');
    return rows;
  },
  
  create: async (data) => {
    const { type, title, amount, transaction_date } = data;
    const created_at = new Date();
    const updated_at = new Date();
    const [result] = await pool.query(
      'INSERT INTO transactions (type, title, amount, transaction_date, created_at, updated_at) VALUES (?,?,?,?,?,?)',
      [type, title, amount, transaction_date, created_at, updated_at]
    );
    return result.insertId;
  },
  
  update: async (id, data) => {
    const { type, title, amount, transaction_date } = data;
    const updated_at = new Date();
    await pool.query(
      'UPDATE transactions SET type=?, title=?, amount=?, transaction_date=?, updated_at=? WHERE id=?',
      [type, title, amount, transaction_date, updated_at, id]
    );
  },
  
  delete: async (id) => {
    await pool.query('DELETE FROM transactions WHERE id=?', [id]);
  },
  
  getByMonth: async (year, month) => {
    const [rows] = await pool.query(
      `SELECT * FROM transactions 
       WHERE YEAR(transaction_date)=? AND MONTH(transaction_date)=? 
       ORDER BY transaction_date ASC`,
      [year, month]
    );
    return rows;
  }
}
