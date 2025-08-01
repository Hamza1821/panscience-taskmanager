// src/pages/DashboardRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  return null;
}

export default DashboardRedirect;
