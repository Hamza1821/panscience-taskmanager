import { useEffect, useState } from 'react';
import api from '../../services/api';
import TaskForm from '../Tasks/TaskForm';

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleUpdateSuccess = () => {
    setEditingTaskId(null);
    fetchTasks();
  };

  return (
    <div className="admin-task-table">
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) =>
              editingTaskId === task._id ? (
                <tr key={task._id}>
                  <td colSpan="7">
                    <TaskForm task={task} onSuccess={handleUpdateSuccess} />
                  </td>
                </tr>
              ) : (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.assignedTo?.email || 'N/A'}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>{task.dueDate?.split('T')[0]}</td>
                  <td>
                    {task.documents?.length > 0 ? (
                      <ul>
                        {task.documents.map((doc, i) => (
                          <li key={i}>
                            <button
                                onClick={() =>
                                  window.open(`${window.location.origin}/uploads/${doc}`, '_blank')
                                }
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: 'blue',
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  padding: 0,
                                  font: 'inherit',
                                }}
                              >
                                File {i + 1}
                              </button>

                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No files'
                    )}
                  </td>
                  <td>
                    <button onClick={() => setEditingTaskId(task._id)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(task._id)}>🗑️ Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskTable;
