const { default: mongoose } = require('mongoose');
const Task = require('../models/Task');

const taskController = {
  createTask: async (req, res) => {
    try {
      const task = new Task({
        ...req.body,
        
      });
      console.log(task)
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getTasks: async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid user ID' });
        }
    
        const match = { user: id };
        const sort = {};

        if (req.query.status) {
        match.status = req.query.status;
      }

      if (req.query.category) {
        match.category = req.query.category;
      }

      if (req.query.startDate && req.query.endDate) {
        match.dueDate = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        };
      }

      if (req.query.search) {
        match.title = { $regex: req.query.search, $options: 'i' }; 
      }
  
      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }

      const tasks = await Task.find(match).sort(sort);
      res.status(201).json(tasks);
    } catch (error) {
        console.log(error )
      res.status(500).json({ error: error.message });
    }
  },

  getTask: async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
      });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTask: async (req, res) => {
    console.log(req.body, req.params.id);
    try {
        const updates = Object.keys(req.body); 
        const task = await Task.findOne({ _id: req.params.id });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        res.status(200).json(task); 
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
},


  deleteTask: async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOverdueTasks: async (req, res) => {
    try {
      const tasks = await Task.find({
        user: req.user._id,
        dueDate: { $lt: new Date() },
        status: { $ne: 'Completed' },
      });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = taskController;