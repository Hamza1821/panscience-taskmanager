import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: Date,
  assignedTo:  {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  
  required: true
},
  documents: [{ type: String }],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
