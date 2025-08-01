import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import DashboardRedirect from './pages/DashboardRedirect';
import CreateTaskForm from './components/Admin/CreateTaskForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreateTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/" element={<DashboardRedirect />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/create" element={<CreateTaskForm />} />
      
    </Routes>
  );
}

export default App;
