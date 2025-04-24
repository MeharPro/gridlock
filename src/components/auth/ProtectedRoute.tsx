
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '@/services/AuthService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireOnboarding = true
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoggedIn = AuthService.isLoggedIn();
  const hasCompletedOnboarding = AuthService.hasCompletedOnboarding();

  // If authentication is required but user is not logged in
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If onboarding is required and user is logged in but hasn't completed onboarding
  if (requireAuth && requireOnboarding && isLoggedIn && !hasCompletedOnboarding) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  // If user is already logged in and tries to access login/signup pages
  if (!requireAuth && isLoggedIn) {
    // If they've completed onboarding, go to home, otherwise to onboarding
    if (hasCompletedOnboarding) {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/onboarding" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
