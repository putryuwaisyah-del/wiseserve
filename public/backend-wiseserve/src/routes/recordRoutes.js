const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createRecord,
  getRecords,
  updateRecord
} = require('../controllers/recordController');

const router = express.Router();

router.use(authMiddleware);

// Daily Operations Routes
router.post('/', createRecord);         // POST /api/v1/records
router.get('/', getRecords);           // GET /api/v1/records (?start_date=...&end_date=...)
router.put('/:id', updateRecord);       // PUT /api/v1/records/:id

module.exports = router;
