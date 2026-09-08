const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const router = express.Router();

router.use(authMiddleware);

// Menu Spec Routes
router.post('/', createMenuItem);        // POST /api/v1/menu
router.get('/', getMenuItems);          // GET /api/v1/menu (?status=active)
router.put('/:id', updateMenuItem);      // PUT /api/v1/menu/:id
router.delete('/:id', deleteMenuItem);   // DELETE /api/v1/menu/:id

module.exports = router;
