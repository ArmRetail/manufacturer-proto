import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Star,
  Package,
  DollarSign,
  Calendar,
  Award
} from "lucide-react";

interface Distributor {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'inactive' | 'pending';
  performance: {
    rating: number;
    ordersThisMonth: number;
    revenueThisMonth: number;
    growthRate: number;
  };
  products: number;
  lastActivity: string;
  tier: 'gold' | 'silver' | 'bronze';
}

interface DistributorPerformanceProps {
  distributors: Distributor[];
}

function getStatusBadge(status: Distributor['status']) {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    default:
      return null;
  }
}

function getTierBadge(tier: Distributor['tier']) {
  switch (tier) {
    case 'gold':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Award className="h-3 w-3 mr-1" />Gold</Badge>;
    case 'silver':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100"><Award className="h-3 w-3 mr-1" />Silver</Badge>;
    case 'bronze':
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100"><Award className="h-3 w-3 mr-1" />Bronze</Badge>;
    default:
      return null;
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
}

function DistributorRow({ distributor }: { distributor: Distributor }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-shrink-0">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {distributor.name}
            </p>
            {getStatusBadge(distributor.status)}
            {getTierBadge(distributor.tier)}
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-1">
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {distributor.region}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Package className="h-3 w-3 mr-1" />
              {distributor.products} products
            </span>
          </div>
          <StarRating rating={distributor.performance.rating} />
        </div>
      </div>
      
      <div className="flex items-center space-x-6 text-sm">
        <div className="text-center">
          <div className="font-medium text-gray-900">{distributor.performance.ordersThisMonth}</div>
          <div className="text-xs text-gray-500">Orders</div>
        </div>
        
        <div className="text-center">
          <div className="font-medium text-gray-900">
            ${(distributor.performance.revenueThisMonth / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-500">Revenue</div>
        </div>
        
        <div className="text-center">
          <div className={`flex items-center font-medium ${
            distributor.performance.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {distributor.performance.growthRate >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {distributor.performance.growthRate > 0 ? '+' : ''}{distributor.performance.growthRate}%
          </div>
          <div className="text-xs text-gray-500">Growth</div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-gray-500 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {distributor.lastActivity}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DistributorPerformance({ distributors }: DistributorPerformanceProps) {
  const activeDistributors = distributors.filter(d => d.status === 'active');
  const topPerformers = [...activeDistributors]
    .sort((a, b) => b.performance.rating - a.performance.rating)
    .slice(0, 5);
  
  const regionStats = distributors.reduce((acc, distributor) => {
    if (!acc[distributor.region]) {
      acc[distributor.region] = { count: 0, revenue: 0 };
    }
    acc[distributor.region].count++;
    acc[distributor.region].revenue += distributor.performance.revenueThisMonth;
    return acc;
  }, {} as Record<string, { count: number; revenue: number }>);

  const totalRevenue = distributors.reduce((sum, d) => sum + d.performance.revenueThisMonth, 0);
  const avgRating = distributors.reduce((sum, d) => sum + d.performance.rating, 0) / distributors.length;

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-900">
                  ${(totalRevenue / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-blue-600">This month</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Active Distributors</p>
                <p className="text-2xl font-bold text-green-900">{activeDistributors.length}</p>
                <p className="text-xs text-green-600">Out of {distributors.length} total</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-900">{avgRating.toFixed(1)}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-xs text-yellow-600 ml-1">Overall performance</span>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Top Performing Distributors
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {topPerformers.map((distributor) => (
            <DistributorRow key={distributor.id} distributor={distributor} />
          ))}
        </CardContent>
      </Card>

      {/* Regional Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Regional Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(regionStats).map(([region, stats]) => (
              <div key={region} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{region}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Distributors:</span>
                    <span className="font-medium">{stats.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-medium">${(stats.revenue / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
