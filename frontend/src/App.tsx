import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Import the actual page component
import RegisterPage from './pages/RegisterPage'; // Import the actual page component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute (to be created)
import './App.css';

// Placeholder Dashboard Page (move to src/pages later if complex)
function DashboardPage() {
  // Example usage of useAuth hook
  // const { user, logout } = useAuth(); 
  return (
    <div>
      <h1>Dashboard (Protected)</h1>
      {/* Display user info, invoices, etc. */}
      {/* <p>Welcome, {user?.email}!</p> */} 
      <button onClick={() => {/* TODO: Implement logout */}}>Logout</button>
    </div>
  );
}

// Placeholder Home Page (move to src/pages later if complex)
function HomePage() {
  return (
    <div>
      <h1>Welcome to FinMex Suite</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard (Requires Login)</Link></li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Wrap protected routes with ProtectedRoute component */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* Add other protected routes here inside ProtectedRoute if needed */}

      </Routes>
    </div>
  );
}

export default App; 