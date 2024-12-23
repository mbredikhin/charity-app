import PropTypes from 'prop-types';
import { useStore } from '@/store';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ Component }) {
  const isAuthenticated = useStore((state) => state.auth.data.isAuthenticated);
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  Component: PropTypes.any,
};

export default PrivateRoute;
