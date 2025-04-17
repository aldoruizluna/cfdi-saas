import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Basic styling (replace with your actual UI library/CSS)
const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' },
  formGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px' },
  input: { width: '100%', padding: '8px', boxSizing: 'border-box' },
  button: { padding: '10px 15px', cursor: 'pointer' },
  error: { color: 'red', marginTop: '10px' },
  link: { marginTop: '15px', display: 'block' },
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To redirect back after login
  const apiUrl = import.meta.env.VITE_API_URL;

  // Determine where to redirect after login
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!apiUrl) {
      setError('API URL not configured.');
      setIsLoading(false);
      return;
    }

    try {
      // --- Step 1: Login to get token --- 
      const loginResponse = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Login failed');
      }

      const accessToken = loginData.access_token;

      // --- Step 2: Fetch user profile using the token --- 
      const profileResponse = await fetch(`${apiUrl}/auth/profile`, {
          method: 'POST', // Matches the method in AuthController
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
          // Handle potential errors fetching profile (e.g., token expired slightly before request)
          throw new Error(profileData.message || 'Failed to fetch user profile');
      }

      // --- Step 3: Update Auth Context and Navigate --- 
      login(accessToken, profileData); // Store token and actual user profile data
      navigate(from, { replace: true }); // Redirect to intended page or dashboard

    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <Link to="/register" style={styles.link}>Don't have an account? Register</Link>
    </div>
  );
}

export default LoginPage; 