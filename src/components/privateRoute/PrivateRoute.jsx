import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ Component }) {
  const isAuthenticated = useSelector(
    (state) => state.authorization.isAuthenticated
  );
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  Component: PropTypes.any,
};

export default PrivateRoute;
