import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Eye,
  TrendingDown,
  MapPin
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  status: 'active' | 'inactive' | 'pending' | 'low_stock';
  category: string;
  distributors: number;
  regions: string[];
  lastActivity: string;
  stockLevel?: number;
  minStock?: number;
}

interface ProductStatusOverviewProps {
  products: Product[];
}

function getStatusBadge(status: Product['status']) {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100"><AlertCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    case 'low_stock':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><TrendingDown className="h-3 w-3 mr-1" />Low Stock</Badge>;
    default:
      return null;
  }
}

function ProductRow({ product }: { product: Product }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-shrink-0">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {product.name}
            </p>
            {getStatusBadge(product.status)}
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>SKU: {product.sku}</span>
            <span>•</span>
            <span>{product.category}</span>
            <span>•</span>
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {product.regions.length} regions
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 text-sm">
        <div className="text-center">
          <div className="font-medium text-gray-900">{product.distributors}</div>
          <div className="text-xs text-gray-500">Distributors</div>
        </div>
        
        {product.stockLevel !== undefined && (
          <div className="text-center">
            <div className={`font-medium ${product.stockLevel <= (product.minStock || 0) ? 'text-red-600' : 'text-gray-900'}`}>
              {product.stockLevel}
            </div>
            <div className="text-xs text-gray-500">Stock</div>
          </div>
        )}
        
        <div className="text-center">
          <div className="text-xs text-gray-500">{product.lastActivity}</div>
        </div>
      </div>
    </div>
  );
}

export default function ProductStatusOverview({ products }: ProductStatusOverviewProps) {
  const statusCounts = products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const criticalProducts = products.filter(p => p.status === 'inactive' || p.status === 'low_stock');
  const recentlyActive = products.filter(p => p.status === 'active').slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Active Products</p>
                <p className="text-2xl font-bold text-green-900">{statusCounts.active || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Inactive Products</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.inactive || 0}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-900">{statusCounts.pending || 0}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Low Stock</p>
                <p className="text-2xl font-bold text-red-900">{statusCounts.low_stock || 0}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Issues */}
      {criticalProducts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-800 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Products Requiring Attention ({criticalProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {criticalProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recently Active Products */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Recently Active Products
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentlyActive.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
