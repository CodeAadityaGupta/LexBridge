import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LawyerProfile from './pages/LawyerProfile';
import Privacy from './pages/Privacy';

// Layout, Guards & Utilities
import ProtectedRoute from './src/Layout/ProtectedRoute';
import ErrorBoundary from './src/UI/ErrorBoundary';

function App() {
  const hydrate = useAuthStore((state) => state.hydrate);

  // Initialize and hydrate auth state on start
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Lawyer Profile Route */}
          <Route
            path="/lawyer/:id"
            element={
              <ProtectedRoute>
                <LawyerProfile />
              </ProtectedRoute>
            }
          />

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
