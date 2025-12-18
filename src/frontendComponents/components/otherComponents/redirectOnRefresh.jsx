import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RedirectOnRefresh() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    const hasRedirected = sessionStorage.getItem('hasRedirected');

    if (
      performance.navigation.type === 1 && 
      location.pathname !== '/' &&
      !hasRedirected
    ) {
      sessionStorage.setItem('hasRedirected', 'true');
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return null;
}
