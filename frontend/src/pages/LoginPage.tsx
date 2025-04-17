import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const { login } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; // Get API URL from env

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!apiUrl) {
        setError('API URL not configured.');
        return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Assuming the backend returns { access_token: '...' } on success
      // We also need user info. Let's assume login returns the token,
      // and we might need another request to get user details, or the backend
      // could include basic user info in the login response or token payload.
      // For now, let's assume login response is { access_token: '...' }
      // and we extract user info from the decoded token (though not ideal).
      // A better approach is to fetch user profile after login.
      
      // TODO: Decode token to get user info or fetch /auth/profile
      const fakeUserInfo = { email: email, id: 'temp-id', tenantId: 'temp-tenant' }; // Placeholder!

      login(data.access_token, fakeUserInfo);
      navigate('/dashboard'); // Redirect to dashboard on successful login

    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
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
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <Link to="/register" style={styles.link}>Don't have an account? Register</Link>
    </div>
  );
}

export default LoginPage; 