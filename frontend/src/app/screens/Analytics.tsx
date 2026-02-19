import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Activity, Clock, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockAnalyticsData, mockStats } from '../mockData';
import { motion } from 'motion/react';

const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-xl shadow-lg border border-slate-200">
        <p className="text-sm font-semibold text-slate-900">{payload[0].name}</p>
        <p className="text-lg font-bold text-cyan-600">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function Analytics() {
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white p-6 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 rounded-full blur-2xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-2xl font-bold mb-2">Analytics</h1>
          <p className="text-cyan-100 font-medium">Community impact overview</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 space-y-4">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 shadow-lg text-white">
            <TrendingUp className="w-5 h-5 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{mockStats.totalReports}</p>
            <p className="text-xs opacity-90 font-medium mt-1">Total Reports</p>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12%</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-4 shadow-lg text-white">
            <Activity className="w-5 h-5 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{mockStats.resolved}</p>
            <p className="text-xs opacity-90 font-medium mt-1">Resolved</p>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <ArrowUpRight className="w-3 h-3" />
              <span>+8%</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 shadow-lg text-white">
            <Zap className="w-5 h-5 mb-2 opacity-80" />
            <p className="text-2xl font-bold">{mockStats.avgResponseTime}</p>
            <p className="text-xs opacity-90 font-medium mt-1">Avg Time</p>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <ArrowDownRight className="w-3 h-3" />
              <span>-15%</span>
            </div>
          </div>
        </motion.div>

        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Weekly Trend</h2>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              Last 7 Days
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockAnalyticsData.weeklyTrend}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748B' }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }} />
              <Bar 
                dataKey="reports" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Issues by Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <h2 className="font-bold text-slate-900 mb-4">Issues by Type</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={mockAnalyticsData.issuesByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke="white"
                strokeWidth={2}
              >
                {mockAnalyticsData.issuesByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {mockAnalyticsData.issuesByType.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center text-sm bg-slate-50 rounded-xl p-2"
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-slate-700 flex-1 text-xs font-medium truncate">{item.name}</span>
                <span className="text-slate-900 font-bold text-xs ml-1">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Severity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <h2 className="font-bold text-slate-900 mb-4">Severity Distribution</h2>
          <div className="space-y-4">
            {mockAnalyticsData.issuesBySeverity.map((item, index) => {
              const gradients = {
                'Low': 'from-emerald-500 to-green-500',
                'Medium': 'from-amber-500 to-orange-500',
                'High': 'from-red-500 to-rose-500'
              };

              const bgGradients = {
                'Low': 'from-emerald-50 to-green-50',
                'Medium': 'from-amber-50 to-orange-50',
                'High': 'from-red-50 to-rose-50'
              };

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`bg-gradient-to-r ${bgGradients[item.name as keyof typeof bgGradients]} rounded-xl p-4`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">{item.value}</span>
                      <span className="text-xs text-slate-600 bg-white/60 px-2 py-1 rounded-full font-medium">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className={`h-3 bg-gradient-to-r ${gradients[item.name as keyof typeof gradients]} rounded-full shadow-sm`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Ward Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <h2 className="font-bold text-slate-900 mb-4">Top Affected Wards</h2>
          <div className="space-y-3">
            {mockAnalyticsData.wardDistribution.slice(0, 5).map((ward, index) => (
              <motion.div
                key={ward.ward}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{ward.ward}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(ward.issues / mockAnalyticsData.wardDistribution[0].issues) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                        className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-8 text-right">{ward.issues}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
