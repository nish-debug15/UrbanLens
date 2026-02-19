import { IssueStatus } from '../mockData';
import { Clock, TrendingUp, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = {
    'pending': {
      style: 'bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 border border-slate-200',
      icon: Clock,
      label: 'Pending'
    },
    'in-progress': {
      style: 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200',
      icon: TrendingUp,
      label: 'In Progress'
    },
    'resolved': {
      style: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200',
      icon: CheckCircle2,
      label: 'Resolved'
    }
  };

  const { style, icon: Icon, label } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style} shadow-sm ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
