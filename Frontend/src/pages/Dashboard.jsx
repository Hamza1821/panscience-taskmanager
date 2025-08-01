import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/Tasks/TaskList.jsx';
import './Dashboard.scss';
import LogoutButton from '../components/LogoutButton.jsx';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }

    if (storedUser.role === 'admin') {
      navigate('/admin');
    } else {
      setUser(storedUser); // Only store if regular user
    }
  }, [navigate]);

  if (!user) return null; // while redirecting or loading

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div style={
          {
            display: 'flex',
             justifyContent: 'center',
            gap: '20px',
            alignItems: 'center',
            padding: '20px',
          }
        }>
          <h2>Welcome, {user.email}</h2>
        <LogoutButton />
        </div>
        <p>You can view tasks assigned to you below:</p>
      </div>

      <TaskList />
    </div>
  );
}

export default Dashboard;
