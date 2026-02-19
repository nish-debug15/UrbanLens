export type IssueSeverity = 'low' | 'medium' | 'high';
export type IssueStatus = 'pending' | 'in-progress' | 'resolved';
export type IssueType = 'pothole' | 'streetlight' | 'graffiti' | 'garbage' | 'sidewalk' | 'drainage' | 'traffic' | 'other';

export interface Issue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  status: IssueStatus;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    ward?: string;
  };
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mockIssues: Issue[] = [
  {
    id: '1',
    type: 'pothole',
    severity: 'high',
    status: 'in-progress',
    description: 'Large pothole on main road causing traffic congestion',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'MG Road, Bangalore',
      ward: 'Shantala Nagar Ward'
    },
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-02-17')
  },
  {
    id: '2',
    type: 'streetlight',
    severity: 'medium',
    status: 'pending',
    description: 'Street light not working near bus stop',
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: 'Indiranagar, Bangalore',
      ward: 'Indiranagar Ward'
    },
    createdAt: new Date('2026-02-16'),
    updatedAt: new Date('2026-02-16')
  },
  {
    id: '3',
    type: 'garbage',
    severity: 'high',
    status: 'pending',
    description: 'Overflowing garbage bins near residential area',
    location: {
      lat: 12.9698,
      lng: 77.6446,
      address: 'Koramangala, Bangalore',
      ward: 'Koramangala Ward'
    },
    createdAt: new Date('2026-02-18'),
    updatedAt: new Date('2026-02-18')
  },
  {
    id: '4',
    type: 'drainage',
    severity: 'high',
    status: 'in-progress',
    description: 'Blocked drainage causing waterlogging',
    location: {
      lat: 13.0358,
      lng: 77.5970,
      address: 'Malleswaram, Bangalore',
      ward: 'Malleswaram Ward'
    },
    createdAt: new Date('2026-02-14'),
    updatedAt: new Date('2026-02-19')
  },
  {
    id: '5',
    type: 'traffic',
    severity: 'medium',
    status: 'pending',
    description: 'Traffic signal malfunction during peak hours',
    location: {
      lat: 12.9279,
      lng: 77.6271,
      address: 'HSR Layout, Bangalore',
      ward: 'HSR Layout Ward'
    },
    createdAt: new Date('2026-02-17'),
    updatedAt: new Date('2026-02-17')
  },
  {
    id: '6',
    type: 'sidewalk',
    severity: 'medium',
    status: 'resolved',
    description: 'Broken sidewalk tiles near school',
    location: {
      lat: 12.9941,
      lng: 77.5970,
      address: 'Yeshwanthpur, Bangalore',
      ward: 'Yeshwanthpur Ward'
    },
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-02-18')
  },
  {
    id: '7',
    type: 'pothole',
    severity: 'medium',
    status: 'in-progress',
    description: 'Multiple potholes on service road',
    location: {
      lat: 12.9121,
      lng: 77.6446,
      address: 'BTM Layout, Bangalore',
      ward: 'BTM Layout Ward'
    },
    createdAt: new Date('2026-02-13'),
    updatedAt: new Date('2026-02-18')
  },
  {
    id: '8',
    type: 'graffiti',
    severity: 'low',
    status: 'resolved',
    description: 'Graffiti on public wall',
    location: {
      lat: 12.9611,
      lng: 77.6387,
      address: 'Domlur, Bangalore',
      ward: 'Domlur Ward'
    },
    createdAt: new Date('2026-02-08'),
    updatedAt: new Date('2026-02-16')
  },
  {
    id: '9',
    type: 'streetlight',
    severity: 'low',
    status: 'resolved',
    description: 'Dim street light requiring replacement',
    location: {
      lat: 13.0199,
      lng: 77.5651,
      address: 'Rajajinagar, Bangalore',
      ward: 'Rajajinagar Ward'
    },
    createdAt: new Date('2026-02-11'),
    updatedAt: new Date('2026-02-17')
  },
  {
    id: '10',
    type: 'garbage',
    severity: 'medium',
    status: 'pending',
    description: 'Garbage not collected for 3 days',
    location: {
      lat: 12.9539,
      lng: 77.6821,
      address: 'Whitefield, Bangalore',
      ward: 'Whitefield Ward'
    },
    createdAt: new Date('2026-02-18'),
    updatedAt: new Date('2026-02-18')
  }
];

export const mockStats = {
  totalReports: 247,
  pending: 86,
  inProgress: 73,
  resolved: 88,
  avgResponseTime: '1.8 days',
  thisWeek: 42,
  thisMonth: 156
};

export const mockAnalyticsData = {
  issuesByType: [
    { name: 'Pothole', value: 68, color: '#0EA5E9' },
    { name: 'Street Light', value: 45, color: '#10B981' },
    { name: 'Garbage', value: 52, color: '#F59E0B' },
    { name: 'Drainage', value: 38, color: '#EF4444' },
    { name: 'Traffic', value: 28, color: '#8B5CF6' },
    { name: 'Other', value: 16, color: '#6B7280' }
  ],
  issuesBySeverity: [
    { name: 'Low', value: 68, percentage: 27.5 },
    { name: 'Medium', value: 115, percentage: 46.6 },
    { name: 'High', value: 64, percentage: 25.9 }
  ],
  weeklyTrend: [
    { day: 'Mon', reports: 18 },
    { day: 'Tue', reports: 24 },
    { day: 'Wed', reports: 21 },
    { day: 'Thu', reports: 29 },
    { day: 'Fri', reports: 26 },
    { day: 'Sat', reports: 14 },
    { day: 'Sun', reports: 10 }
  ],
  monthlyTrend: [
    { month: 'Sep', reports: 132 },
    { month: 'Oct', reports: 148 },
    { month: 'Nov', reports: 165 },
    { month: 'Dec', reports: 178 },
    { month: 'Jan', reports: 194 },
    { month: 'Feb', reports: 247 }
  ],
  wardDistribution: [
    { ward: 'Koramangala', issues: 28 },
    { ward: 'Indiranagar', issues: 24 },
    { ward: 'Whitefield', issues: 31 },
    { ward: 'HSR Layout', issues: 22 },
    { ward: 'Malleswaram', issues: 19 },
    { ward: 'Others', issues: 123 }
  ]
};

export const issueTypeLabels: Record<IssueType, string> = {
  pothole: 'Pothole',
  streetlight: 'Street Light',
  graffiti: 'Graffiti',
  garbage: 'Garbage',
  sidewalk: 'Sidewalk',
  drainage: 'Drainage',
  traffic: 'Traffic Signal',
  other: 'Other'
};

export const issueTypeIcons: Record<IssueType, string> = {
  pothole: '🕳️',
  streetlight: '💡',
  graffiti: '🎨',
  garbage: '🗑️',
  sidewalk: '🚶',
  drainage: '💧',
  traffic: '🚦',
  other: '📋'
};
