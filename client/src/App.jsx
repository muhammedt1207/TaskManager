import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './redux/actions/AuthActions';
import Sample from './Pages/Sample';

const Signin = lazy(() => import('./Pages/Signin'));
const Signup = lazy(() => import('./Pages/Signup'));
const Dashboard = lazy(() => import('./Pages/DashBoard'));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(user, 'user data..........');
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/signin" />;
  };

  // Public Route component
  const PublicRoute = ({ children }) => {
    return user ? <Navigate to="/dashboard" /> : children;
  };

  // Base Route Component
  const BaseRoute = () => {
    return user ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />;
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BaseRoute />} />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
