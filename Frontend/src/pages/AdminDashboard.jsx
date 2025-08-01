import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/Admin/UserTable';
import TaskTable from '../components/Admin/TaskTable';
import CreateTaskForm from '../components/Admin/CreateTaskForm'; // ✅ Import the form
import './AdminDashboard.scss';
import LogoutButton from '../components/LogoutButton';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();
  const [user , setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <div style={
          {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            alignItems: 'center',
            padding: '20px',
          }
        }>
        <h1>Admin Dashboard : {user?.email}</h1>
      <LogoutButton />

      </div>

      <div className="tab-controls">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={activeTab === 'tasks' ? 'active' : ''}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          ➕ Create Task
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'users' && <UserTable />}
        {activeTab === 'tasks' && <TaskTable />}
        {activeTab === 'create' && <CreateTaskForm onSuccess={() => setActiveTab('tasks')} />}
      </div>
    </div>
  );
}

export default AdminDashboard;
