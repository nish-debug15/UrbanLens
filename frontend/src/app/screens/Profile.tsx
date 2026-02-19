import { useNavigate } from 'react-router';
import { User, MapPin, Bell, Shield, HelpCircle, LogOut, ChevronRight, Sparkles, Award, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { motion } from 'motion/react';

export function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const settingsSections = [
    {
      title: 'ACCOUNT',
      items: [
        { icon: User, label: 'Edit Profile', onClick: () => {} },
        { icon: MapPin, label: 'Default Location', onClick: () => {}, badge: 'Koramangala' },
      ]
    },
    {
      title: 'NOTIFICATIONS',
      items: [
        { icon: Bell, label: 'Push Notifications', hasSwitch: true, defaultChecked: true },
        { icon: Bell, label: 'Status Updates', hasSwitch: true, defaultChecked: true },
      ]
    },
    {
      title: 'OTHER',
      items: [
        { icon: Shield, label: 'Privacy Policy', onClick: () => {} },
        { icon: HelpCircle, label: 'Help & Support', onClick: () => {} },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white p-6 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 rounded-full blur-2xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <p className="text-cyan-100 font-medium">Manage your account settings</p>
        </motion.div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-12 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50"
        >
          <div className="flex items-center mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-1.5 shadow-md">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-xl font-bold text-slate-900">Rajesh Kumar</h2>
              <p className="text-sm text-slate-500 font-medium">rajesh.kumar@email.com</p>
              <div className="flex items-center gap-1 mt-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                  Community Champion
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-200">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 cursor-pointer"
            >
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">24</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Reports</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-3 cursor-pointer"
            >
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">18</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Resolved</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 cursor-pointer"
            >
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">385</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Points</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Settings Sections */}
      <div className="px-4 space-y-4">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.1 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-white/50"
          >
            <h3 className="text-xs font-bold text-slate-500 px-5 pt-4 pb-2 tracking-wider">{section.title}</h3>
            
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                {item.hasSwitch ? (
                  <div className="flex items-center justify-between px-5 py-4 hover:bg-white/50 transition-colors border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-2 rounded-xl">
                        <item.icon className="w-5 h-5 text-cyan-600" />
                      </div>
                      <span className="text-slate-900 font-medium">{item.label}</span>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/50 transition-colors border-t border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-2 rounded-xl">
                        <item.icon className="w-5 h-5 text-cyan-600" />
                      </div>
                      <span className="text-slate-900 font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 h-14 rounded-2xl font-semibold"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* App Version */}
        <p className="text-center text-xs text-slate-500 py-4 font-medium">
          UrbanLens Bengaluru • v2.0.0 • Made with ❤️ for Namma Bengaluru
        </p>
      </div>
    </div>
  );
}
