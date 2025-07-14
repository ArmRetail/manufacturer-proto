import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  ShoppingCart, 
  CheckCircle, 
  Clock, 
  UserPlus, 
  Package,
  AlertTriangle,
  TrendingUp,
  FileText,
  DollarSign
} from "lucide-react";

interface Activity {
  id: string;
  type: 'order' | 'approval' | 'distributor_request' | 'product_update' | 'promotion' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status?: 'completed' | 'pending' | 'failed';
  metadata?: {
    amount?: number;
    distributor?: string;
    product?: string;
    region?: string;
  };
}

interface RecentActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
}

function getActivityIcon(type: Activity['type']) {
  switch (type) {
    case 'order':
      return <ShoppingCart className="h-4 w-4" />;
    case 'approval':
      return <CheckCircle className="h-4 w-4" />;
    case 'distributor_request':
      return <UserPlus className="h-4 w-4" />;
    case 'product_update':
      return <Package className="h-4 w-4" />;
    case 'promotion':
      return <TrendingUp className="h-4 w-4" />;
    case 'alert':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
}

function getActivityColor(type: Activity['type'], priority: Activity['priority']) {
  if (priority === 'high') return 'text-red-600 bg-red-50';
  
  switch (type) {
    case 'order':
      return 'text-blue-600 bg-blue-50';
    case 'approval':
      return 'text-green-600 bg-green-50';
    case 'distributor_request':
      return 'text-purple-600 bg-purple-50';
    case 'product_update':
      return 'text-orange-600 bg-orange-50';
    case 'promotion':
      return 'text-indigo-600 bg-indigo-50';
    case 'alert':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

function getPriorityBadge(priority: Activity['priority']) {
  switch (priority) {
    case 'high':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
    case 'low':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
    default:
      return null;
  }
}

function getStatusBadge(status?: Activity['status']) {
  if (!status) return null;
  
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    case 'failed':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><AlertTriangle className="h-3 w-3 mr-1" />Failed</Badge>;
    default:
      return null;
  }
}

function ActivityItem({ activity }: { activity: Activity }) {
  const colorClasses = getActivityColor(activity.type, activity.priority);
  
  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors">
      <div className={`flex-shrink-0 p-2 rounded-full ${colorClasses}`}>
        {getActivityIcon(activity.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {activity.title}
          </p>
          <div className="flex items-center space-x-2">
            {activity.priority === 'high' && getPriorityBadge(activity.priority)}
            {getStatusBadge(activity.status)}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          {activity.description}
        </p>
        
        {activity.metadata && (
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
            {activity.metadata.amount && (
              <span className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                ${activity.metadata.amount.toLocaleString()}
              </span>
            )}
            {activity.metadata.distributor && (
              <span>{activity.metadata.distributor}</span>
            )}
            {activity.metadata.product && (
              <span>{activity.metadata.product}</span>
            )}
            {activity.metadata.region && (
              <span>{activity.metadata.region}</span>
            )}
          </div>
        )}
        
        <p className="text-xs text-gray-500">
          {activity.timestamp}
        </p>
      </div>
    </div>
  );
}

export default function RecentActivityFeed({ activities, maxItems = 10 }: RecentActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);
  
  const activityCounts = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const highPriorityCount = activities.filter(a => a.priority === 'high').length;
  const pendingCount = activities.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Activity Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">New Orders</p>
                <p className="text-2xl font-bold text-blue-900">{activityCounts.order || 0}</p>
              </div>
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Approvals</p>
                <p className="text-2xl font-bold text-green-900">{activityCounts.approval || 0}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pending Items</p>
                <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
              </div>
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">High Priority</p>
                <p className="text-2xl font-bold text-red-900">{highPriorityCount}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Activity
            </div>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              {activities.length} total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {displayedActivities.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {displayedActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activity to display</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
