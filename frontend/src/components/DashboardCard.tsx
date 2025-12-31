import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  bgColor?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  bgColor = 'from-blue-600 to-purple-600'
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 mb-2">{title}</p>
          <p className="text-gray-900 mb-2">{value}</p>
          {trend && (
            <p className={`${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
