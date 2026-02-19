import { useNavigate } from 'react-router';
import { Camera, TrendingUp, Clock, CheckCircle, AlertCircle, Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { IssueCard } from '../components/IssueCard';
import { mockIssues, mockStats } from '../mockData';
import { motion } from 'motion/react';

export function Home() {
  const navigate = useNavigate();
  const recentIssues = mockIssues.slice(0, 4);

  const stats = [
    { label: 'Total Reports', value: mockStats.totalReports, icon: TrendingUp, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
    { label: 'Pending', value: mockStats.pending, icon: Clock, color: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50' },
    { label: 'In Progress', value: mockStats.inProgress, icon: AlertCircle, color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
    { label: 'Resolved', value: mockStats.resolved, icon: CheckCircle, color: 'from-emerald-500 to-green-500', bg: 'from-emerald-50 to-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pb-20">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white p-6 pb-12 relative overflow-hidden">
        {/* Decorative elements */}
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
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <p className="text-cyan-100 font-medium">Let's make Bengaluru better together</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-8 space-y-6">
        {/* Report Issue CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => navigate('/capture')}
            className="w-full bg-white hover:bg-slate-50 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 border-2 border-cyan-200 hover:border-cyan-300 py-7 shadow-xl shadow-cyan-500/10 rounded-2xl font-bold text-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all"></div>
            <Camera className="w-6 h-6 mr-2 text-cyan-600 relative z-10" />
            <span className="relative z-10 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Report New Issue
            </span>
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Quick Stats</h2>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              This Month
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-4 cursor-pointer transition-all border border-white/50 shadow-sm hover:shadow-md`}
              >
                <div className={`flex items-center text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                  <stat.icon className="w-4 h-4 mr-1.5" style={{ 
                    stroke: 'url(#gradient)',
                    fill: 'none' 
                  }} />
                  <span className="text-xs font-semibold">{stat.label}</span>
                </div>
                <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900 text-lg">Recent Reports</h2>
            <button 
              onClick={() => navigate('/reports')}
              className="text-sm text-cyan-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <IssueCard 
                  issue={issue}
                  onClick={() => navigate(`/issue/${issue.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
