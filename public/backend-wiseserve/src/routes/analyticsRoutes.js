const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getSalesSummary,
  getWasteTrend,
  getItemEfficiency
} = require('../controllers/analyticsController');

const router = express.Router();

router.use(authMiddleware);

// Analytics Spec Routes
router.get('/sales-summary', getSalesSummary);    // GET /api/v1/analytics/sales-summary
router.get('/waste-trend', getWasteTrend);        // GET /api/v1/analytics/waste-trend
router.get('/item-efficiency', getItemEfficiency);// GET /api/v1/analytics/item-efficiency

module.exports = router;
