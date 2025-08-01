import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskForm from '../components/Tasks/TaskForm';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error('Error loading task:', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <TaskForm task={task} onSuccess={() => navigate('/')} />
    </div>
  );
}

export default EditTask;
