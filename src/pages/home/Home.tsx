import { routes } from '@/utils/constants';
import { useEffect } from 'react';
import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const isAuthenticated = useStore((state) => state.auth.data.isAuthenticated);
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
