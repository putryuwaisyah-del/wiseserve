const pool = require('../config/db');

// POST /api/v1/menu
exports.createMenuItem = async (req, res, next) => {
  try {
    const { name, price, category, cost_to_produce = 0 } = req.body || {};

    if (!name || price === undefined || !category) {
      return res.status(400).json({ message: 'name, price, and category are required' });
    }

    const result = await pool.query(
      `INSERT INTO menu_items (name, price, category, cost_to_produce, status)
       VALUES ($1, $2, $3, $4, 'active') RETURNING *`,
      [name.trim(), Number(price), category.trim(), Number(cost_to_produce)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/menu
exports.getMenuItems = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM menu_items';
    const params = [];

    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }
    query += ' ORDER BY id ASC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/menu/:id
exports.updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { price, status } = req.body || {};

    const result = await pool.query(
      `UPDATE menu_items
       SET price = COALESCE($1, price),
           status = COALESCE($2, status),
           updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [price !== undefined ? Number(price) : null, status, id]
    );

    if (!result.rows[0]) return res.status(404).json({ message: 'Menu item not found' });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/menu/:id (Soft Delete / Archive)
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE menu_items SET status = 'archived', updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id]
    );

    if (!result.rows[0]) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item archived successfully', item: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
