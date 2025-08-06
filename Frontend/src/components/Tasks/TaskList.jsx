import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks'); // Assumes backend filters by user
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed');
    }
  };

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate?.split('T')[0]}</p>
            <a
                href={`${window.location.origin}/uploads/${doc}`}
                target="_blank"
                rel="noreferrer"
              >
                File {i + 1}
            </a>

            <div className="task-actions">
              <Link to={`/edit/${task._id}`} className="edit-btn">✏️ Edit</Link>
              <button onClick={() => handleDelete(task._id)} className="delete-btn">🗑️ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
