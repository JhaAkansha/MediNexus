import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ token }) {
 if (!token) {
    // If the user is not authenticated, redirect to login page
   return <Navigate to="/doctorLogin" />;
  }

  // If the user is authenticated, allow access to the child route
  return <Outlet />;
}