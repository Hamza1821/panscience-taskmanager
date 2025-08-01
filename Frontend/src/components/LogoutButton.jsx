// src/components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Add some styling to the button */}
      <style>
        {`
          .logout-btn {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
          }
          .logout-btn:hover {
            background-color: #d32f2f;
          }
        `}
      </style>

      <button className="logout-btn" onClick={handleLogout}>
        🔒 Logout
      </button>
    </>
  );
}

export default LogoutButton;
