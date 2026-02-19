import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { IssueCard } from '../components/IssueCard';
import { mockIssues, IssueStatus } from '../mockData';
import { motion } from 'motion/react';

export function Reports() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | IssueStatus>('all');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || issue.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const counts = {
    all: mockIssues.length,
    pending: mockIssues.filter(i => i.status === 'pending').length,
    'in-progress': mockIssues.filter(i => i.status === 'in-progress').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length
  };

  const tabs = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'pending', label: 'Pending', count: counts.pending },
    { value: 'in-progress', label: 'In Progress', count: counts['in-progress'] },
    { value: 'resolved', label: 'Resolved', count: counts.resolved },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pb-20">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-slate-200/50 p-6 sticky top-0 z-10 shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            All Reports
          </h1>
          
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 rounded-2xl border-slate-200 bg-white focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>
            <button className="p-3 border border-slate-200 rounded-2xl hover:bg-white transition-all bg-white/50 backdrop-blur-sm">
              <ArrowUpDown className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200/50 sticky top-[152px] z-10">
        <div className="overflow-x-auto">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0 h-auto inline-flex min-w-full">
              {tabs.map(tab => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent px-6 py-3 data-[state=active]:text-cyan-600 data-[state=active]:font-semibold whitespace-nowrap"
                >
                  {tab.label} 
                  <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.value 
                      ? 'bg-cyan-100 text-cyan-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4">
        {filteredIssues.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-sm mx-auto border border-slate-200">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-cyan-600" />
              </div>
              <p className="text-slate-600 font-medium">No reports found</p>
              <p className="text-sm text-slate-500 mt-2">Try adjusting your search or filters</p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <IssueCard 
                  issue={issue}
                  onClick={() => navigate(`/issue/${issue.id}`)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
