import Task from '../models/task.model.js';

// Admin: Create a new task
export const createTask = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create tasks.' });
    }

    const { title, description, assignedTo, dueDate, priority, status } = req.body;

    const documents = req.files?.map(file => file.filename); // only filenames

    const task = new Task({
      title,
      description,
      assignedTo, // This must be ObjectId from <select> input
      dueDate,
      priority,
      status,
      documents,
      createdBy: req.user._id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Task creation error:', err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// All tasks: Admin sees all, user sees only assigned
export const getAllTasks = async (req, res) => {
  try {
    const { status, priority, dueDate, page = 1, limit = 10 } = req.query;
    const query = {};
    

    if (req.user.role !== 'admin') {
      // console.log('User role:', req.user.role);
      // console.log('User ID:', req.user.id);
      query.assignedTo = req.user.id; // 👈 match user's ObjectId
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (dueDate) query.dueDate = { $lte: new Date(dueDate) };
    

    const tasks = await Task.find(query)
      .populate('assignedTo', 'email') // show user email
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ dueDate: 1 });
    // console.log('Tasks fetched:', tasks.length, tasks);
    res.json(tasks);
  } catch (err) {
    console.error('getAllTasks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'email');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    console.error('getTaskById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const documents = req.files?.map(file => file.filename) || [];

    const updates = { ...req.body };

    // ✅ Fix: If new files uploaded, overwrite; otherwise, do not touch documents
    if (documents.length > 0) {
      updates.documents = documents;
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('updateTask error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('deleteTask error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
