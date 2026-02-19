import { Outlet, useLocation } from 'react-router';
import { BottomNav } from './BottomNav';

export function Layout() {
  const location = useLocation();
  
  // Routes that don't need bottom navigation
  const noNavRoutes = ['/', '/login', '/capture', '/preview'];
  const showNav = !noNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
      {showNav && <BottomNav />}
    </div>
  );
}
