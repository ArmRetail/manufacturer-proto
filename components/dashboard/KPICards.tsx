import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Users, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  DollarSign
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon: React.ReactNode;
  status?: 'good' | 'warning' | 'critical';
  subtitle?: string;
}

function KPICard({ title, value, change, icon, status = 'good', subtitle }: KPICardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'critical': return 'border-red-200 bg-red-50';
      default: return 'border-green-200 bg-white';
    }
  };

  const getChangeIcon = () => {
    if (!change) return null;
    switch (change.type) {
      case 'increase': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decrease': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getChangeColor = () => {
    if (!change) return '';
    switch (change.type) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className={`${getStatusColor()} hover:shadow-md transition-shadow`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-gray-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
        )}
        {change && (
          <div className={`flex items-center text-xs ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="ml-1">
              {change.value > 0 ? '+' : ''}{change.value}% from {change.period}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface KPICardsProps {
  data: {
    activeProducts: number;
    totalDistributors: number;
    pendingApprovals: number;
    monthlyRevenue: number;
    productAvailability: number;
    distributorEngagement: number;
  };
}

export default function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <KPICard
        title="Active Products"
        value={data.activeProducts}
        change={{ value: 12, type: 'increase', period: 'last month' }}
        icon={<Package className="h-4 w-4" />}
        subtitle="Live on platform"
      />
      
      <KPICard
        title="Total Distributors"
        value={data.totalDistributors}
        change={{ value: 8, type: 'increase', period: 'last month' }}
        icon={<Users className="h-4 w-4" />}
        subtitle="Active partnerships"
      />
      
      <KPICard
        title="Pending Approvals"
        value={data.pendingApprovals}
        icon={<Clock className="h-4 w-4" />}
        status={data.pendingApprovals > 10 ? 'warning' : 'good'}
        subtitle="Require attention"
      />
      
      <KPICard
        title="Monthly Revenue"
        value={`$${(data.monthlyRevenue / 1000).toFixed(0)}K`}
        change={{ value: 15, type: 'increase', period: 'last month' }}
        icon={<DollarSign className="h-4 w-4" />}
        subtitle="This month"
      />
      
      <KPICard
        title="Product Availability"
        value={`${data.productAvailability}%`}
        change={{ value: -2, type: 'decrease', period: 'last week' }}
        icon={<CheckCircle className="h-4 w-4" />}
        status={data.productAvailability < 85 ? 'warning' : 'good'}
        subtitle="Platform coverage"
      />
      
      <KPICard
        title="Distributor Engagement"
        value={`${data.distributorEngagement}%`}
        change={{ value: 5, type: 'increase', period: 'last week' }}
        icon={<TrendingUp className="h-4 w-4" />}
        subtitle="Active this week"
      />
    </div>
  );
}
