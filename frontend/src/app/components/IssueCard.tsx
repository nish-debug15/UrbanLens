import { Issue, issueTypeLabels, issueTypeIcons } from '../mockData';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
}

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      whileHover={{ y: -2, shadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl border border-slate-200 p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-cyan-200 backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{issueTypeIcons[issue.type]}</span>
          <h3 className="font-semibold text-slate-900">{issueTypeLabels[issue.type]}</h3>
        </div>
        <SeverityBadge severity={issue.severity} />
      </div>
      
      <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">{issue.description}</p>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center text-xs text-slate-500 gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-500" />
          <span className="truncate">{issue.location.address}</span>
        </div>
        
        <div className="flex items-center text-xs text-slate-500 gap-1 ml-auto">
          <Calendar className="w-3.5 h-3.5 text-cyan-500" />
          <span>{formatDate(issue.createdAt)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        {issue.location.ward && (
          <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
            {issue.location.ward}
          </span>
        )}
        <StatusBadge status={issue.status} className="ml-auto" />
      </div>
    </motion.div>
  );
}
