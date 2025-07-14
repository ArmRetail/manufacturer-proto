// @ts-nocheck
"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  DollarSign,
  Package,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  AlertTriangle,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// --- MOCK DATA ---
const kpiData = {
  totalSales: "रू 12,450,000",
  salesGrowth: "+12.5%",
  pendingOrders: 46,
  ordersGrowth: "+8.2%",
  activeCustomers: 1247,
  customersGrowth: "+18.3%",
  avgOrderValue: "रू 85,500",
  avgOrderGrowth: "+5.7%",
}

const salesOverviewData = [
  { date: "Oct 1", sales: 450000, orders: 12 },
  { date: "Oct 5", sales: 620000, orders: 18 },
  { date: "Oct 10", sales: 880000, orders: 24 },
  { date: "Oct 15", sales: 710000, orders: 19 },
  { date: "Oct 20", sales: 1150000, orders: 31 },
  { date: "Oct 25", sales: 980000, orders: 26 },
  { date: "Oct 30", sales: 1520000, orders: 42 },
]

const topBrandsData = [
  { name: "Wai Wai Noodles", value: 4200000, color: "#f97316" },
  { name: "Chau Chau Noodles", value: 2800000, color: "#fb923c" },
  { name: "Other Products", value: 1450000, color: "#fed7aa" },
]

const topPerformingProducts = [
  {
    name: "Wai Wai Chicken Noodles",
    sales: "रू 2,450,000",
    units: 12500,
    growth: "+15.2%",
    category: "Instant Noodles",
    stock: "In Stock",
  },
  {
    name: "Chau Chau Masala Noodles",
    sales: "रू 1,850,000",
    units: 9800,
    growth: "+8.7%",
    category: "Instant Noodles",
    stock: "Low Stock",
  },
  {
    name: "Himalayan Salt",
    sales: "रू 920,000",
    units: 5600,
    growth: "+22.1%",
    category: "Spices",
    stock: "In Stock",
  },
  {
    name: "Everest Garam Masala",
    sales: "रू 750,000",
    units: 4200,
    growth: "+12.8%",
    category: "Spices",
    stock: "In Stock",
  },
]

const inventoryAlerts = [
  {
    id: 1,
    product: "Chau Chau Masala Noodles Premium Pack",
    sku: "CCN-001",
    currentStock: 45,
    minStock: 100,
    status: "critical",
    unit: "boxes",
  },
  {
    id: 2,
    product: "Wai Wai Chicken Flavor Instant Noodles",
    sku: "WWC-002",
    currentStock: 78,
    minStock: 150,
    status: "low",
    unit: "boxes",
  },
  {
    id: 3,
    product: "Himalayan Rock Salt Natural",
    sku: "HRS-003",
    currentStock: 0,
    minStock: 200,
    status: "out",
    unit: "kg",
  },
  {
    id: 4,
    product: "Everest Turmeric Powder",
    sku: "ETP-004",
    currentStock: 25,
    minStock: 80,
    status: "critical",
    unit: "packets",
  },
]

// --- Date Picker Component ---
function DatePickerWithRange({ className, date, setDate }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal border-gray-300 hover:border-orange-500",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// --- KPI Card Component ---
function KPICard({ title, value, growth, icon: Icon, isHighlighted = false }) {
  const isPositive = growth.startsWith("+")
  const GrowthIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card className={cn(isHighlighted && "border-orange-500 bg-orange-50")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-medium", isHighlighted && "text-orange-700")}>{title}</CardTitle>
        <Icon className={cn("h-4 w-4", isHighlighted ? "text-orange-600" : "text-gray-500")} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", isHighlighted && "text-orange-700")}>{value}</div>
        <div className="flex items-center gap-1 mt-1">
          <GrowthIcon className={cn("h-3 w-3", isPositive ? "text-green-600" : "text-red-600")} />
          <span className={cn("text-xs font-medium", isPositive ? "text-green-600" : "text-red-600")}>{growth}</span>
          <span className="text-xs text-gray-500">vs last period</span>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Simple Restock Dialog Component ---
function RestockDialog({ product, onRestock }) {
  const [newStock, setNewStock] = React.useState(product.currentStock)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSave = () => {
    onRestock(product.id, newStock)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
          Restock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
          <DialogDescription>
            Update stock level for {product.product} ({product.sku})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(Number.parseInt(e.target.value) || 0)}
              placeholder="Enter new stock quantity"
            />
            <div className="text-sm text-gray-500">
              Current: {product.currentStock} {product.unit}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
            Update Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Main Dashboard Component ---
export default function DashboardPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)),
    to: new Date(),
  })

  const [inventory, setInventory] = React.useState(inventoryAlerts)

  const handleRestock = (productId, newStock) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              currentStock: newStock,
              status:
                newStock === 0
                  ? "out"
                  : newStock < item.minStock * 0.5
                    ? "critical"
                    : newStock < item.minStock
                      ? "low"
                      : "good",
            }
          : item,
      ),
    )
  }

  const getStockBadge = (status) => {
    const statusColors = {
      "In Stock": "bg-green-100 text-green-800 border-green-200",
      "Low Stock": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Out of Stock": "bg-red-100 text-red-800 border-red-200",
    }
    return <Badge className={`${statusColors[status]} border font-medium text-xs`}>{status}</Badge>
  }

  const getAlertBadge = (status) => {
    const statusColors = {
      critical: "bg-red-100 text-red-800 border-red-200",
      low: "bg-yellow-100 text-yellow-800 border-yellow-200",
      good: "bg-green-100 text-green-800 border-green-200",
    }
    return <Badge className={`${statusColors[status]} border font-medium text-xs capitalize`}>{status}</Badge>
  }

  const getStockProgress = (current, min, max) => {
    return (current / max) * 100
  }

  const getProgressColor = (current, min) => {
    if (current <= min * 0.5) return "bg-red-500"
    if (current <= min) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      {/* KPI Cards - 4 useful metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Sales"
          value={kpiData.totalSales}
          growth={kpiData.salesGrowth}
          icon={DollarSign}
          isHighlighted={true}
        />
        <KPICard title="Pending Orders" value={kpiData.pendingOrders} growth={kpiData.ordersGrowth} icon={Package} />
        <KPICard
          title="Active Customers"
          value={kpiData.activeCustomers}
          growth={kpiData.customersGrowth}
          icon={Users}
        />
        <KPICard title="Avg Order Value" value={kpiData.avgOrderValue} growth={kpiData.avgOrderGrowth} icon={Star} />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Sales Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-gray-900">Sales Overview</CardTitle>
            <CardDescription>Revenue and order trends for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesOverviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `रू${value / 1000000}M`} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "sales" ? `रू${value.toLocaleString()}` : value,
                    name === "sales" ? "Sales" : "Orders",
                  ]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#ea580c" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Brands */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Top Brands</CardTitle>
            <CardDescription>Revenue by brand category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={topBrandsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topBrandsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `रू${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {topBrandsData.map((brand, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }}></div>
                    <span className="text-gray-700">{brand.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">रू{(brand.value / 1000000).toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Performing Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Top Performing Products</CardTitle>
              <CardDescription>Best selling products this month</CardDescription>
            </div>
           
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformingProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      {getStockBadge(product.stock)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{product.category}</span>
                      <span>•</span>
                      <span>{product.units.toLocaleString()} units</span>
                      <span className="text-green-600 font-medium">{product.growth}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-orange-600">{product.sales}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Inventory Alerts</CardTitle>
              <CardDescription>Products requiring immediate attention</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-gray-300 hover:border-orange-500 bg-transparent">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Manage Stock
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventory.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 truncate cursor-help" title={alert.product}>
                        {alert.product.length > 25 ? `${alert.product.substring(0, 25)}...` : alert.product}
                      </span>
                      <span className="text-sm text-gray-500 flex-shrink-0">({alert.sku})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {alert.currentStock} {alert.unit}
                      </span>
                      {alert.status === "critical" && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">Critical</Badge>
                      )}
                      {alert.status === "low" && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">Low Stock</Badge>
                      )}
                      {alert.status === "out" && (
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-xs">Out of Stock</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <RestockDialog product={alert} onRestock={handleRestock} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
