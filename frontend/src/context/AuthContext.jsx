import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Set default axios header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Init user from local storages
  useEffect(() => {
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://task-manager-system-izqz.onrender.com/api/auth/login', { email, password });
      if (res.data) {
        setToken(res.data.token);
        setUser(res.data);
        addToast("Logged in successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || "Invalid credentials", "error");
    }
  };

  const register = async (email, password) => {
    try {
      const res = await axios.post('https://task-manager-system-izqz.onrender.com/api/auth/register', { email, password });
      if (res.data) {
        setToken(res.data.token);
        setUser(res.data);
        addToast("Account created successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || "Server error during registration", "error");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    addToast("Logged out.", "info");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
