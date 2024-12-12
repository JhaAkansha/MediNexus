// import { Navigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ children, token }) => {
//     return token ? children : <Navigate to="/doctorLogin" />;
// };

// PrivateRoute.propTypes = {
//     children: PropTypes.node.isRequired,
//     token: PropTypes.string,
// };

// export default PrivateRoute;

// PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ token, children }) => {
  // Check token in state or localStorage
  const savedToken = token || localStorage.getItem('authToken');

  if (!savedToken) {
    return <Navigate to="/doctorLogin" />;
  }

  return children;
};

export default PrivateRoute;