import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { authService } from './api/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
    },
  },
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
