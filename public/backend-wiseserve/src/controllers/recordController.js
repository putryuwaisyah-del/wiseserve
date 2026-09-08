const pool = require('../config/db');

// POST /api/v1/records
exports.createRecord = async (req, res, next) => {
  try {
    const { menu_item_id, date, qty_prepared, qty_sold, qty_leftover } = req.body || {};

    if (!menu_item_id || qty_prepared === undefined || qty_sold === undefined || qty_leftover === undefined) {
      return res.status(400).json({ message: 'menu_item_id, qty_prepared, qty_sold, and qty_leftover are required' });
    }

    const result = await pool.query(
      `INSERT INTO daily_records (menu_item_id, record_date, qty_prepared, qty_sold, qty_leftover)
       VALUES ($1, COALESCE($2, CURRENT_DATE), $3, $4, $5)
       ON CONFLICT (menu_item_id, record_date)
       DO UPDATE SET qty_prepared = EXCLUDED.qty_prepared,
                     qty_sold = EXCLUDED.qty_sold,
                     qty_leftover = EXCLUDED.qty_leftover,
                     updated_at = NOW()
       RETURNING *`,
      [menu_item_id, date || null, Number(qty_prepared), Number(qty_sold), Number(qty_leftover)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/records
exports.getRecords = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;
    let query = `
      SELECT dr.*, mi.name AS menu_item_name, mi.category, mi.price
      FROM daily_records dr
      JOIN menu_items mi ON dr.menu_item_id = mi.id
    `;
    const params = [];

    if (start_date && end_date) {
      query += ' WHERE dr.record_date BETWEEN $1 AND $2';
      params.push(start_date, end_date);
    } else if (start_date) {
      query += ' WHERE dr.record_date >= $1';
      params.push(start_date);
    }

    query += ' ORDER BY dr.record_date DESC, dr.id DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/records/:id
exports.updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { qty_prepared, qty_sold, qty_leftover } = req.body || {};

    const result = await pool.query(
      `UPDATE daily_records
       SET qty_prepared = COALESCE($1, qty_prepared),
           qty_sold = COALESCE($2, qty_sold),
           qty_leftover = COALESCE($3, qty_leftover),
           updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [
        qty_prepared !== undefined ? Number(qty_prepared) : null,
        qty_sold !== undefined ? Number(qty_sold) : null,
        qty_leftover !== undefined ? Number(qty_leftover) : null,
        id
      ]
    );

    if (!result.rows[0]) return res.status(404).json({ message: 'Record not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
