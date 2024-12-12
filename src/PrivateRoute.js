// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ token, children }) => {
//   // Check token in state or localStorage
//   const savedToken = token || localStorage.getItem('authToken');

//   if (!savedToken) {
//     return <Navigate to="/doctorLogin" />;
//   }

//   return children;
// };

// export default PrivateRoute;

import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ token }) {
  if (!token) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/doctorLogin" />;
  }

  // If the user is authenticated, allow access to the child route
  return <Outlet />;
}