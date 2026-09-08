const pool = require('../config/db');

// GET /api/v1/analytics/sales-summary
exports.getSalesSummary = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(dr.record_date, 'YYYY-MM-DD') AS date,
        SUM(dr.qty_sold * mi.price) AS total_revenue,
        SUM(dr.qty_sold) AS total_items_sold
      FROM daily_records dr
      JOIN menu_items mi ON dr.menu_item_id = mi.id
      WHERE dr.record_date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY dr.record_date
      ORDER BY dr.record_date ASC
    `);

    const formatted = result.rows.map(row => ({
      date: row.date,
      total_revenue: Number(row.total_revenue) || 0,
      total_items_sold: Number(row.total_items_sold) || 0
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/analytics/waste-trend
exports.getWasteTrend = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(dr.record_date, 'YYYY-MM-DD') AS date,
        TO_CHAR(dr.record_date, 'Day') AS day_of_week,
        SUM(dr.qty_prepared) AS total_prepared,
        SUM(dr.qty_leftover) AS total_waste,
        ROUND(
          (SUM(dr.qty_leftover)::decimal / NULLIF(SUM(dr.qty_prepared), 0)) * 100, 2
        ) AS waste_percentage
      FROM daily_records dr
      WHERE dr.record_date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY dr.record_date
      ORDER BY dr.record_date ASC
    `);

    const formatted = result.rows.map(row => ({
      date: row.date,
      day_of_week: row.day_of_week.trim(),
      total_prepared: Number(row.total_prepared) || 0,
      total_waste: Number(row.total_waste) || 0,
      waste_percentage: Number(row.waste_percentage) || 0
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/analytics/item-efficiency
exports.getItemEfficiency = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        mi.id AS menu_item_id,
        mi.name,
        ROUND(AVG(dr.qty_leftover), 2) AS avg_daily_waste,
        SUM(dr.qty_leftover * mi.price) AS total_lost_revenue
      FROM daily_records dr
      JOIN menu_items mi ON dr.menu_item_id = mi.id
      GROUP BY mi.id, mi.name
      ORDER BY total_lost_revenue DESC
    `);

    const formatted = result.rows.map(row => ({
      menu_item_id: row.menu_item_id,
      name: row.name,
      avg_daily_waste: Number(row.avg_daily_waste) || 0,
      total_lost_revenue: Number(row.total_lost_revenue) || 0
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};
