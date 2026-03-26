const Task = require('../models/Task');

// @desc    Get all user tasks (with filtering, sorting, and pagination)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sortBy, page = 1, limit = 10 } = req.query;
    
    // Build query object
    const query = { userId: req.user.id };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Pagination logic
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let allTasks = await Task.find(query);

    // Precise runtime sorting engine natively handling Null dates and Enum weights
    if (sortBy === 'priority') {
      const pWeight = { 'High': 3, 'Med': 2, 'Low': 1 };
      allTasks.sort((a, b) => {
        const weightDiff = (pWeight[b.priority] || 0) - (pWeight[a.priority] || 0);
        return weightDiff !== 0 ? weightDiff : new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortBy === 'dueDate') {
      allTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return new Date(b.createdAt) - new Date(a.createdAt);
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else {
      allTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const total = allTasks.length;
    const tasks = allTasks.slice(skip, skip + limitNum);

    res.status(200).json({
      tasks,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Title is required to create a task');
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'Todo',
      priority: priority || 'Med',
      dueDate,
      userId: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Safe check against missing user IDs from unauthenticated legacy tasks
    if (task.userId && task.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Safe ownership validation
    if (task.userId && task.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to delete this task');
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id, message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
