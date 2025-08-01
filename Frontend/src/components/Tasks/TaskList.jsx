import { useEffect, useState } from 'react';
import api from '../../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks'); // Assumes backend filters by user
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    fetchTasks();
  }, []);

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
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
