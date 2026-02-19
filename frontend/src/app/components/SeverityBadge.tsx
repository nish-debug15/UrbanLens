import { IssueSeverity } from '../mockData';

interface SeverityBadgeProps {
  severity: IssueSeverity;
  className?: string;
}

export function SeverityBadge({ severity, className = '' }: SeverityBadgeProps) {
  const styles = {
    low: 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200 shadow-sm',
    medium: 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200 shadow-sm',
    high: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm'
  };

  const dots = {
    low: 'bg-emerald-500',
    medium: 'bg-amber-500',
    high: 'bg-red-500'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[severity]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[severity]} animate-pulse`}></span>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}
