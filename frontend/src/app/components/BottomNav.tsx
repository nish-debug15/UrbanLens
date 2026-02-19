import { Home, Map, FileText, BarChart3, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 z-50 safe-area-inset-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                isActive ? 'text-cyan-600' : 'text-slate-500'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-2 top-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className={`relative ${isActive ? 'transform scale-110' : ''}`}>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
