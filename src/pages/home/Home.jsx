import { routes } from '@/utils/constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const isAuthenticated = useSelector(
    (state) => state.authorization.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile());
    } else {
      navigate(routes.login());
    }
  }, [isAuthenticated, navigate]);

  return <></>;
}
