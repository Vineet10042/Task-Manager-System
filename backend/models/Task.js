const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo',
  },
  priority: {
    type: String,
    enum: ['Low', 'Med', 'High'],
    default: 'Med',
  },
  dueDate: {
    type: Date,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Proper indexing as requested
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
