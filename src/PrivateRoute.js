import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, token }) => {
    return token ? children : <Navigate to="/doctorLogin" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    token: PropTypes.string,
};

export default PrivateRoute;
