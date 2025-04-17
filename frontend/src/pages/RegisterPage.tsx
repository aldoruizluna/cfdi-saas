import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Use if logging in user immediately after register

// Basic styling (reuse or adapt from LoginPage)
const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' },
  formGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px' },
  input: { width: '100%', padding: '8px', boxSizing: 'border-box' },
  button: { padding: '10px 15px', cursor: 'pointer' },
  error: { color: 'red', marginTop: '10px' },
  link: { marginTop: '15px', display: 'block' },
};

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [error, setError] = useState<string | null>(null);
  // const { login } = useAuth(); // Use if logging in after register
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!apiUrl) {
        setError('API URL not configured.');
        return;
    }

    try {
      // Send payload matching RegisterDto (name, email, password, tenantName)
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          tenantName // Send tenantName
        }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Registration successful - redirect to login
      navigate('/login'); 

    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
         <div style={styles.formGroup}>
          <label htmlFor="tenantName" style={styles.label}>Company/Tenant Name:</label>
          <input
            type="text"
            id="tenantName"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
         <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
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
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <Link to="/login" style={styles.link}>Already have an account? Login</Link>
    </div>
  );
}

export default RegisterPage; 