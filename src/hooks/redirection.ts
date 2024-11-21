import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    
    if (router.pathname === '/application' && !user) {
      // Redirect to /auth/login if no user in localStorage
      router.replace('/auth/login');
    } else if (router.pathname === '/auth/login' && user) {
      // Redirect to /application if user exists
      router.replace('/application');
    }
  }, [router]);
};
