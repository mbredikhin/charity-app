import { useStore } from '@/store';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  Component: React.FC;
}

export function PrivateRoute({ Component }: PrivateRouteProps) {
  const isAuthenticated = useStore((state) => state.auth.data.isAuthenticated);
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute;
