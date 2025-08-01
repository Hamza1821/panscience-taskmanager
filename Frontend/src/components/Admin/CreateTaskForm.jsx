import { useEffect, useState } from 'react';
import api from '../../services/api';
import './CreateTaskForm.scss';

function CreateTaskForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('pending');
  const [documents, setDocuments] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('assignedTo', assignedTo);
    formData.append('dueDate', dueDate);
    formData.append('priority', priority);
    formData.append('status', status);
    for (let file of documents) {
      formData.append('documents', file); // multiple 'documents'
    }

    try {
      const res = await api.post('/tasks', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Task created successfully');
      onSuccess?.(); // reload or navigate
    } catch (err) {
      setError(err.response?.data?.message || 'Task creation failed');
    }
  };

  return (
    <div className="create-task-form">
      <h3>Create New Task</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <select
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
          required
        >
          <option value="">-- Assign To --</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />

        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={e => setDocuments([...e.target.files])}
        />

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTaskForm;
