import { useEffect, useState } from 'react';
import api from '../../services/api';
import './TaskForm.scss';

function TaskForm({ task = null, onSuccess }) {
  const isEdit = !!task;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
  });
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        dueDate: task.dueDate?.split('T')[0] || '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocuments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    for (let i = 0; i < documents.length; i++) {
      data.append('documents', documents[i]);
    }

    try {
      if (isEdit) {
        await api.put(`/tasks/${task._id}`, data);
      } else {
        await api.post('/tasks', data);
      }

      onSuccess?.(); // reload task list or redirect
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving task');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{isEdit ? 'Edit Task' : 'Create Task'}</h3>
      {error && <p className="error">{error}</p>}

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
      />

      <button type="submit">{isEdit ? 'Update' : 'Create'} Task</button>
    </form>
  );
}

export default TaskForm;
