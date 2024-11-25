const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

// router.use(auth);

router.get('/:id', taskController.getTasks);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/overdue', taskController.getOverdueTasks);

module.exports = router;
