import TaskForm from '../components/Tasks/TaskForm';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <TaskForm onSuccess={() => navigate('/')} />
    </div>
  );
}

export default CreateTask;
