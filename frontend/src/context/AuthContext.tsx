import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of the Auth state
interface AuthState {
  token: string | null;
  user: { email: string; id: string; tenantId: string } | null; // Adjust based on user info needed
  isAuthenticated: boolean;
}

// Define the shape of the Context value
interface AuthContextType extends AuthState {
  login: (token: string, user: any) => void; // Consider defining a specific user type
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial state (try to load from localStorage)
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('authToken');
  const userString = localStorage.getItem('authUser');
  const user = userString ? JSON.parse(userString) : null;
  return {
    token,
    user,
    isAuthenticated: !!token,
  };
};

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(getInitialState());

  const login = (token: string, user: any) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user)); // Store user info
    setAuthState({
      token,
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
    // Optionally redirect to login page here using useNavigate()
  };

  // Optional: Add effect to check token validity on load or periodically

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 