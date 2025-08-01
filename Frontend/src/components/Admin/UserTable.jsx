import { useEffect, useState } from 'react';
import api from '../../services/api';

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get('/users/')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to load users', err));
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/users/${userId}`);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleEdit = async (user) => {
    const newRole = prompt(`Update role for ${user.email}:`, user.role);
   
console.log('User entered role:', newRole);
    if (!newRole || newRole === user.role) return;

    try {
      await api.put(`/users/${user._id}`, { role: newRole });
      fetchUsers(); // refresh list
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => {
                  console.log('Edit clicked');
                  handleEdit(u)}}>✏️ Edit</button>
                <button onClick={() => {
                  console.log('Delete clicked');
                  handleDelete(u._id)}}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
