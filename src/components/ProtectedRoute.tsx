import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireParent?: boolean;
}

const ProtectedRoute = ({ children, requireAuth = true, requireParent = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useApp();
  const location = useLocation();

  // Protected routes that require authentication
  const protectedPaths = [
    '/select-experience',
    '/kids',
    '/adults',
    '/profile',
  ];

  // Check if current path is a protected route
  const isProtectedPath = protectedPaths.some(path => 
    location.pathname === path || location.pathname.startsWith(path + '/')
  );

  // If route requires authentication but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Save the attempted location for redirect after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If route requires parent role but user doesn't have it
  if (requireParent && user?.role !== 'Parent') {
    // Redirect to experience selection if authenticated, or auth if not
    return <Navigate to={isAuthenticated ? '/select-experience' : '/auth'} replace />;
  }

  // If user is authenticated but trying to access auth pages (except setup pages during first-time flow)
  if (!requireAuth && isAuthenticated) {
    const isSetupPage = location.pathname.startsWith('/auth/setup');
    const isAuthPage = location.pathname.startsWith('/auth');
    
    // Allow setup pages for first-time users
    if (isAuthPage && !isSetupPage) {
      return <Navigate to="/select-experience" replace />;
    }
    
    // For setup pages, only redirect if user is NOT first-time
    if (isSetupPage && user && !user.isFirstTime) {
      return <Navigate to="/select-experience" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

