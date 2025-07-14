//@ts-nocheck
"use client"
import * as React from "react"
import { CalendarIcon, Search, XCircle, ArrowLeft, Package, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  ResponsiveContainer,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from "recharts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// --- DATA & MOCK API FUNCTIONS ---
const distributorOptions = [
  "Himalayan Distributors Pvt. Ltd.",
  "Kathmandu Trade House",
  "Valley Distribution Network",
  "Everest Supply Chain",
  "Bagmati Wholesale Hub",
  "Mountain Peak Distributors",
  "Central Distribution Co.",
  "Nepal Trade Partners",
  "Sunrise Distribution Ltd.",
  "Golden Gate Distributors",
]

const productOptions = [
  "Maggi Noodles 2-Minute Masala",
  "Knorr Chicken Cubes",
  "Surf Excel Matic Front Load",
  "Dove Beauty Bar Soap",
  "Colgate Total Advanced Health",
  "Lux International Soap",
  "Clinic Plus Strong & Long Shampoo",
  "Fair & Lovely Advanced Multi Vitamin",
  "Pepsodent Germi Check Toothpaste",
  "Vim Dishwash Liquid Gel",
  "Sunsilk Shampoo",
  "Lifebuoy Soap",
  "Red Label Tea",
  "Horlicks",
  "Boost",
]

const categoryOptions = [
  "Seasoning & Spices",
  "Home Care",
  "Personal Care",
  "Food & Beverages",
  "Health & Wellness",
  "Baby Care",
  "Dairy Products",
  "Snacks & Confectionery",
  "Cleaning Supplies",
  "Frozen Foods",
]

const brandOptions = [
  "Maggi",
  "Knorr",
  "Surf Excel",
  "Dove",
  "Colgate",
  "Lux",
  "Clinic Plus",
  "Fair & Lovely",
  "Pepsodent",
  "Vim",
  "Sunsilk",
  "Lifebuoy",
  "Red Label",
  "Horlicks",
  "Boost",
]

const locationOptions = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Kaski",
  "Lamjung",
  "Gorkha",
  "Tanahu",
  "Syangja",
  "Chitwan",
  "Nawalpur",
  "Biratnagar",
  "Morang",
  "Sunsari",
  "Jhapa",
  "Dharan",
  "Dhankuta",
]

// Distributor info
const distributorData = {
  name: "Himalayan Trade House",
  owner: "Sita Gurung",
  phone: "+977-61-465789",
  email: "sita@himalayantrade.com",
  avatar: "/placeholder.svg?height=40&width=40",
  assignedZones: ["Kaski", "Lamjung", "Gorkha", "Tanahu", "Syangja"],
  rating: 4.8,
  joinedDate: "2019-03-15",
  totalRetailers: 1280,
  activeRetailers: 1150,
}

// Tab configuration
const analyticsTabs = [
  { key: "distributor-retailer", label: "Distributor to Retailer", icon: Package },
  { key: "manufacturer-distributor", label: "Manufacturer to Distributor", icon: Truck },
]

// FMCG Orders Data
const fmcgOrders = [
  {
    id: "ORD-2024-001",
    orderDate: "2024-01-15",
    products: [
      { name: "Maggi 2-Minute Noodles Masala", quantity: 500, unit: "packs" },
      { name: "Knorr Chicken Cubes", quantity: 200, unit: "boxes" },
    ],
    totalItems: 700,
    status: "delivered",
    deliveryDate: "2024-01-18",
  },
  {
    id: "ORD-2024-002",
    orderDate: "2024-01-20",
    products: [
      { name: "Surf Excel Matic Front Load", quantity: 150, unit: "bottles" },
      { name: "Dove Beauty Bar Soap", quantity: 300, unit: "pieces" },
      { name: "Lux International Soap", quantity: 250, unit: "pieces" },
    ],
    totalItems: 700,
    status: "shipped",
    deliveryDate: "2024-01-23",
  },
  {
    id: "ORD-2024-003",
    orderDate: "2024-01-25",
    products: [
      { name: "Colgate Total Advanced Health", quantity: 180, unit: "tubes" },
      { name: "Pepsodent Germi Check", quantity: 120, unit: "tubes" },
    ],
    totalItems: 300,
    status: "processing",
    deliveryDate: "2024-01-28",
  },
  {
    id: "ORD-2024-004",
    orderDate: "2024-02-01",
    products: [
      { name: "Clinic Plus Strong & Long Shampoo", quantity: 100, unit: "bottles" },
      { name: "Sunsilk Shampoo", quantity: 80, unit: "bottles" },
      { name: "Fair & Lovely Advanced Multi Vitamin", quantity: 60, unit: "tubes" },
    ],
    totalItems: 240,
    status: "delivered",
    deliveryDate: "2024-02-04",
  },
  {
    id: "ORD-2024-005",
    orderDate: "2024-02-05",
    products: [
      { name: "Vim Dishwash Liquid Gel", quantity: 200, unit: "bottles" },
      { name: "Lifebuoy Soap", quantity: 400, unit: "pieces" },
    ],
    totalItems: 600,
    status: "shipped",
    deliveryDate: "2024-02-08",
  },
  {
    id: "ORD-2024-006",
    orderDate: "2024-02-10",
    products: [
      { name: "Red Label Tea", quantity: 150, unit: "packets" },
      { name: "Horlicks", quantity: 80, unit: "jars" },
      { name: "Boost", quantity: 60, unit: "jars" },
    ],
    totalItems: 290,
    status: "pending",
    deliveryDate: "2024-02-13",
  },
  {
    id: "ORD-2024-007",
    orderDate: "2024-02-15",
    products: [
      { name: "Maggi 2-Minute Noodles Chicken", quantity: 400, unit: "packs" },
      { name: "Knorr Soup Mix", quantity: 150, unit: "packets" },
    ],
    totalItems: 550,
    status: "processing",
    deliveryDate: "2024-02-18",
  },
  {
    id: "ORD-2024-008",
    orderDate: "2024-02-20",
    products: [
      { name: "Surf Excel Easy Wash", quantity: 120, unit: "packets" },
      { name: "Dove Shampoo", quantity: 90, unit: "bottles" },
      { name: "Lux Soft Touch Soap", quantity: 200, unit: "pieces" },
    ],
    totalItems: 410,
    status: "delivered",
    deliveryDate: "2024-02-23",
  },
  {
    id: "ORD-2024-009",
    orderDate: "2024-02-25",
    products: [
      { name: "Colgate Max Fresh", quantity: 160, unit: "tubes" },
      { name: "Pepsodent Complete Care", quantity: 140, unit: "tubes" },
    ],
    totalItems: 300,
    status: "shipped",
    deliveryDate: "2024-02-28",
  },
  {
    id: "ORD-2024-010",
    orderDate: "2024-03-01",
    products: [
      { name: "Clinic Plus Anti-Dandruff", quantity: 70, unit: "bottles" },
      { name: "Sunsilk Thick & Long", quantity: 85, unit: "bottles" },
      { name: "Fair & Lovely Instant Glow", quantity: 50, unit: "tubes" },
    ],
    totalItems: 205,
    status: "pending",
    deliveryDate: "2024-03-04",
  },
  {
    id: "ORD-2024-011",
    orderDate: "2024-03-05",
    products: [
      { name: "Vim Bar", quantity: 300, unit: "pieces" },
      { name: "Lifebuoy Total 10", quantity: 350, unit: "pieces" },
    ],
    totalItems: 650,
    status: "processing",
    deliveryDate: "2024-03-08",
  },
  {
    id: "ORD-2024-012",
    orderDate: "2024-03-10",
    products: [
      { name: "Red Label Natural Care", quantity: 120, unit: "packets" },
      { name: "Horlicks Lite", quantity: 60, unit: "jars" },
      { name: "Boost Health Drink", quantity: 45, unit: "jars" },
    ],
    totalItems: 225,
    status: "delivered",
    deliveryDate: "2024-03-13",
  },
]

// DISTRIBUTOR TO RETAILER DATA
const distributorToRetailerData = {
  salesTrend: [
    { name: "Jan", sales: 45.2, networkAvg: 38.5 },
    { name: "Feb", sales: 52.8, networkAvg: 41.2 },
    { name: "Mar", sales: 48.6, networkAvg: 39.8 },
    { name: "Apr", sales: 61.3, networkAvg: 45.6 },
    { name: "May", sales: 39.4, networkAvg: 42.1 },
    { name: "Jun", sales: 56.7, networkAvg: 44.3 },
    { name: "Jul", sales: 43.8, networkAvg: 40.9 },
    { name: "Aug", sales: 38.2, networkAvg: 37.8 },
    { name: "Sep", sales: 29.5, networkAvg: 35.2 },
    { name: "Oct", sales: 44.1, networkAvg: 41.7 },
    { name: "Nov", sales: 41.2, networkAvg: 39.4 },
    { name: "Dec", sales: 35.8, networkAvg: 36.9 },
  ],
  categoryPerformance: [
    { name: "Seasoning & Spices", sales: 185.2, share: 25.0, fill: "#FF9900" },
    { name: "Home Care", sales: 142.8, share: 19.3, fill: "#232F3E" },
    { name: "Personal Care", sales: 108.5, share: 14.7, fill: "#146EB4" },
    { name: "Food & Beverages", sales: 74.3, share: 10.0, fill: "#FF6600" },
    { name: "Health & Wellness", sales: 65.7, share: 8.9, fill: "#87CEEB" },
    { name: "Baby Care", sales: 40.5, share: 5.5, fill: "#FFA500" },
    { name: "Dairy Products", sales: 35.2, share: 4.8, fill: "#9400D3" },
    { name: "Snacks & Confectionery", sales: 31.8, share: 4.3, fill: "#FF1493" },
    { name: "Cleaning Supplies", sales: 28.9, share: 3.9, fill: "#00CED1" },
    { name: "Frozen Foods", sales: 26.7, share: 3.6, fill: "#32CD32" },
  ],
  topProducts: [
    { name: "Maggi Noodles", sales: 125.4, units: 2850, growth: 12.5 },
    { name: "Surf Excel", sales: 98.7, units: 1450, growth: 3.2 },
    { name: "Dove Soap", sales: 85.2, units: 1890, growth: 8.7 },
    { name: "Colgate Total", sales: 72.6, units: 1250, growth: 15.3 },
    { name: "Lux Soap", sales: 68.9, units: 1680, growth: 5.8 },
    { name: "Knorr Cubes", sales: 54.3, units: 980, growth: 2.1 },
    { name: "Clinic Plus", sales: 42.8, units: 750, growth: 1.5 },
    { name: "Pepsodent", sales: 38.1, units: 950, growth: 9.2 },
    { name: "Vim Liquid", sales: 35.5, units: 1100, growth: 4.5 },
    { name: "Fair & Lovely", sales: 32.0, units: 600, growth: 11.8 },
    { name: "Sunsilk Shampoo", sales: 28.4, units: 550, growth: 6.3 },
    { name: "Lifebuoy Soap", sales: 25.9, units: 1300, growth: 2.9 },
    { name: "Red Label Tea", sales: 22.1, units: 450, growth: 7.1 },
    { name: "Horlicks", sales: 19.8, units: 300, growth: 14.2 },
    { name: "Boost", sales: 17.3, units: 250, growth: 10.1 },
  ],
  orderFlow: [
    { name: "Jan", inventoryRestocked: 180, retailerOrders: 175, fulfilledOrders: 172 },
    { name: "Feb", inventoryRestocked: 220, retailerOrders: 215, fulfilledOrders: 210 },
    { name: "Mar", inventoryRestocked: 195, retailerOrders: 190, fulfilledOrders: 185 },
    { name: "Apr", inventoryRestocked: 245, retailerOrders: 240, fulfilledOrders: 235 },
    { name: "May", inventoryRestocked: 165, retailerOrders: 160, fulfilledOrders: 155 },
    { name: "Jun", inventoryRestocked: 225, retailerOrders: 220, fulfilledOrders: 218 },
    { name: "Jul", inventoryRestocked: 185, retailerOrders: 180, fulfilledOrders: 175 },
    { name: "Aug", inventoryRestocked: 155, retailerOrders: 150, fulfilledOrders: 148 },
    { name: "Sep", inventoryRestocked: 125, retailerOrders: 120, fulfilledOrders: 118 },
    { name: "Oct", inventoryRestocked: 175, retailerOrders: 170, fulfilledOrders: 168 },
    { name: "Nov", inventoryRestocked: 168, retailerOrders: 165, fulfilledOrders: 162 },
    { name: "Dec", inventoryRestocked: 145, retailerOrders: 140, fulfilledOrders: 138 },
  ],
  kpis: {
    monthlySales: "रू 48.6M",
    activeRetailers: "365",
    totalOrders: "1,845",
    averageOrderValue: "रू 26,350",
    avgSalesPerRetailer: "रू 133K",
    totalSKU: "27",
    categories: "6",
    totalBrands: "12",
  },
}

// MANUFACTURER TO DISTRIBUTOR DATA
const manufacturerToDistributorData = {
  salesTrend: [
    { name: "Jan", sales: 125.8, networkAvg: 98.2 },
    { name: "Feb", sales: 142.3, networkAvg: 105.8 },
    { name: "Mar", sales: 138.9, networkAvg: 102.4 },
    { name: "Apr", sales: 165.7, networkAvg: 118.9 },
    { name: "May", sales: 118.6, networkAvg: 95.7 },
    { name: "Jun", sales: 152.4, networkAvg: 112.8 },
    { name: "Jul", sales: 135.2, networkAvg: 108.3 },
    { name: "Aug", sales: 128.7, networkAvg: 101.5 },
    { name: "Sep", sales: 95.8, networkAvg: 88.9 },
    { name: "Oct", sales: 145.3, networkAvg: 115.2 },
    { name: "Nov", sales: 139.8, networkAvg: 109.6 },
    { name: "Dec", sales: 122.5, networkAvg: 98.7 },
  ],
  categoryPerformance: [
    { name: "Seasoning & Spices", sales: 485.7, share: 28.5, fill: "#FF9900" },
    { name: "Home Care", sales: 342.1, share: 20.1, fill: "#232F3E" },
    { name: "Personal Care", sales: 298.4, share: 17.5, fill: "#146EB4" },
    { name: "Food & Beverages", sales: 185.9, share: 10.9, fill: "#FF6600" },
    { name: "Health & Wellness", sales: 142.8, share: 8.4, fill: "#87CEEB" },
    { name: "Baby Care", sales: 98.5, share: 5.8, fill: "#FFA500" },
    { name: "Dairy Products", sales: 75.3, share: 4.4, fill: "#9400D3" },
    { name: "Snacks & Confectionery", sales: 52.7, share: 3.1, fill: "#FF1493" },
    { name: "Cleaning Supplies", sales: 38.9, share: 2.3, fill: "#00CED1" },
    { name: "Frozen Foods", sales: 28.4, share: 1.7, fill: "#32CD32" },
  ],
  topProducts: [
    { name: "Maggi Noodles", sales: 325.8, units: 7850, growth: 18.2 },
    { name: "Surf Excel", sales: 285.4, units: 4250, growth: 12.8 },
    { name: "Dove Soap", sales: 245.7, units: 5890, growth: 15.3 },
    { name: "Colgate Total", sales: 198.3, units: 3850, growth: 22.1 },
    { name: "Lux Soap", sales: 175.9, units: 4680, growth: 8.7 },
    { name: "Knorr Cubes", sales: 142.8, units: 2980, growth: 6.5 },
    { name: "Clinic Plus", sales: 125.4, units: 2150, growth: 4.2 },
    { name: "Pepsodent", sales: 98.7, units: 2450, growth: 14.8 },
    { name: "Vim Liquid", sales: 85.2, units: 3100, growth: 9.3 },
    { name: "Fair & Lovely", sales: 72.6, units: 1600, growth: 19.5 },
    { name: "Sunsilk Shampoo", sales: 68.9, units: 1550, growth: 11.2 },
    { name: "Lifebuoy Soap", sales: 54.3, units: 3300, growth: 7.8 },
    { name: "Red Label Tea", sales: 42.8, units: 1250, growth: 13.4 },
    { name: "Horlicks", sales: 38.1, units: 850, growth: 25.7 },
    { name: "Boost", sales: 32.5, units: 750, growth: 16.9 },
  ],
  kpis: {
    monthlySales: "रू 138.9M",
    totalOrders: "4,285",
    averageOrderValue: "रू 32,450",
    totalSKU: "27",
    categories: "6",
    totalBrands: "12",
  },
}

// --- REUSABLE COMPONENTS ---
const KpiCard = ({ title, value }: { title: string; value: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <TooltipProvider>
        <UITooltip>
          <TooltipTrigger asChild>
            <div className="text-2xl font-bold truncate cursor-default">{value}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{value}</p>
          </TooltipContent>
        </UITooltip>
      </TooltipProvider>
    </CardContent>
  </Card>
)

const DatePickerWithRange = ({ className, date, setDate }: any) => (
  <div className={cn("grid gap-2", className)}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
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
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
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

const SearchableSelect = ({ options, placeholder, emptyMessage, value, onValueChange }: any) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {value || placeholder}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={`Search ${emptyMessage.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {emptyMessage.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// --- CHART COMPONENTS ---
const SalesTrendChart = ({ data, activeTab }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={(value) => `रू${value}M`} />
      <Tooltip
        formatter={(value: number, name: string) => [
          `रू${value}M`,
          name === "sales"
            ? activeTab === "distributor-retailer"
              ? "This Distributor"
              : "This Distributor"
            : "Network Average",
        ]}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="sales"
        stroke="#FF9900"
        strokeWidth={3}
        name={activeTab === "distributor-retailer" ? "This Distributor" : "This Distributor"}
        dot={{ fill: "#FF9900", strokeWidth: 2, r: 4 }}
      />
      <Line
        type="monotone"
        dataKey="networkAvg"
        stroke="#232F3E"
        strokeWidth={2}
        strokeDasharray="5 5"
        name="Network Average"
        dot={{ fill: "#232F3E", strokeWidth: 2, r: 3 }}
      />
    </LineChart>
  </ResponsiveContainer>
)

const CategoryPerformanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="share"
        paddingAngle={2}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="middle"
        wrapperStyle={{
          maxHeight: "260px",
          overflowY: "auto",
          paddingLeft: "10px",
        }}
        formatter={(value, entry) => (
          <span className="text-sm text-muted-foreground">
            {value} ({entry.payload?.share.toFixed(1)}%)
          </span>
        )}
      />
    </PieChart>
  </ResponsiveContainer>
)

const TopProductsTable = ({ data }) => (
  <div className="h-full -mt-4">
    <div className="sticky top-0 bg-white z-10 border-b">
      <div className="grid grid-cols-4 gap-4 p-4 font-medium text-sm text-muted-foreground">
        <div>Product</div>
        <div className="text-right">Sales</div>
        <div className="text-right">Units</div>
        <div className="text-right">Growth</div>
      </div>
    </div>
    <ScrollArea className="h-[calc(100%-60px)]">
      <div className="space-y-1 p-4">
        {data.map((product, index) => (
          <div key={product.name} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 last:border-b-0">
            <div className="font-medium text-sm">{product.name}</div>
            <div className="text-right text-sm">रू{product.sales.toFixed(1)}M</div>
            <div className="text-right text-sm">{product.units.toLocaleString()}</div>
            <div className={`text-right text-sm ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.growth > 0 ? "+" : ""}
              {product.growth.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  </div>
)

const OrderFlowChart = ({ data, activeTab }) => (
  <ResponsiveContainer width="100%" height="100%">
    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="inventoryRestocked" fill="#FF9900" name="Inventory Restocked" radius={[4, 4, 0, 0]} />
      <Bar dataKey="retailerOrders" fill="#232F3E" name="Retailer Orders" radius={[4, 4, 0, 0]} />
    </ComposedChart>
  </ResponsiveContainer>
)

// Orders Table Component with Pagination
const OrdersTable = () => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const ordersPerPage = 5

  const totalPages = Math.ceil(fmcgOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const currentOrders = fmcgOrders.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: { color: "bg-green-100 text-green-800 border-green-200", label: "Delivered" },
      shipped: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Shipped" },
      processing: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Processing" },
      pending: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Pending" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={`${config.color} border font-medium text-xs`}>{config.label}</Badge>
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 3
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={
            currentPage === i
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }
        >
          {i}
        </Button>,
      )
    }

    return buttons
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="font-semibold text-gray-900">Order ID</TableHead>
              <TableHead className="font-semibold text-gray-900">Order Date</TableHead>
              <TableHead className="font-semibold text-gray-900">Products</TableHead>
              <TableHead className="font-semibold text-gray-900">Total Items</TableHead>
              <TableHead className="font-semibold text-gray-900">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50 border-gray-100">
                <TableCell className="font-medium text-sm">{order.id}</TableCell>
                <TableCell className="text-sm">{format(new Date(order.orderDate), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-sm">
                  <div className="space-y-1">
                    {order.products.slice(0, 2).map((product, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        {product.name} ({product.quantity} {product.unit})
                      </div>
                    ))}
                    {order.products.length > 2 && (
                      <div className="text-xs text-gray-500">+{order.products.length - 2} more items</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">{order.totalItems.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, fmcgOrders.length)} of {fmcgOrders.length} orders
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="flex gap-1">{renderPaginationButtons()}</div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function DistributorAnalyticsForManufacturer() {
  // State for filters
  const [selectedMonth, setSelectedMonth] = React.useState("all")
  const [selectedYear, setSelectedYear] = React.useState("2024")
  const [selectedDate, setDate] = React.useState<DateRange | undefined>({ from: undefined, to: undefined })
  const [selectedDistributor, setSelectedDistributor] = React.useState("Himalayan Trade House")
  const [selectedProduct, setSelectedProduct] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [selectedBrand, setSelectedBrand] = React.useState("")
  const [selectedLocation, setSelectedLocation] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("distributor-retailer")

  const handleResetFilters = () => {
    setSelectedMonth("all")
    setSelectedYear("2024")
    setDate({ from: undefined, to: undefined })
    setSelectedDistributor("Himalayan Trade House")
    setSelectedProduct("")
    setSelectedCategory("all")
    setSelectedBrand("")
    setSelectedLocation("")
  }

  // Get current data based on active tab
  const currentData = activeTab === "distributor-retailer" ? distributorToRetailerData : manufacturerToDistributorData

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-12 w-12">
            <AvatarImage src={distributorData.avatar || "/placeholder.svg"} alt={distributorData.name} />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
              {distributorData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{distributorData.name}</h1>
            <p className="text-sm text-gray-600">{distributorData.owner}</p>
            <p className="text-sm text-gray-600">
              {distributorData.phone} • {distributorData.email}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Distributor Analytics</h2>
        </div>
      </div>

      {/* Custom Status Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex">
          {analyticsTabs.map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.key

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors w-1/2 ${
                  isActive
                    ? "border-orange-500 text-orange-600 bg-orange-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Filter {activeTab === "distributor-retailer" ? "distributor to retailer" : "manufacturer to distributor"}{" "}
              performance data
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleResetFilters}>
            <XCircle className="mr-2 h-4 w-4" /> Reset
          </Button>
        </CardHeader>
        <CardContent>
          {/* Filters in one row */}
          <div className="flex flex-row gap-4">
            <div className="space-y-2">
              <Label>Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={String(i)}>
                      {format(new Date(0, i), "MMMM")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-2 space-y-2">
              <Label>Date Range</Label>
              <DatePickerWithRange date={selectedDate} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Brand</Label>
              <SearchableSelect
                options={brandOptions}
                placeholder="All Brands"
                emptyMessage="Brand"
                value={selectedBrand}
                onValueChange={setSelectedBrand}
              />
            </div>
            <div className="space-y-2">
              <Label>Product</Label>
              <SearchableSelect
                options={productOptions}
                placeholder="All Products"
                emptyMessage="Product"
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <SearchableSelect
                options={locationOptions}
                placeholder="All Locations"
                emptyMessage="Location"
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      {activeTab === "distributor-retailer" ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <KpiCard title="Monthly Sales to Retailers" value={currentData.kpis.monthlySales} />
          <KpiCard title="Active Retailers" value={currentData.kpis.activeRetailers} />
          <KpiCard title="Total Orders from Retailers" value={currentData.kpis.totalOrders} />
          <KpiCard title="Average Order Value" value={currentData.kpis.averageOrderValue} />
          <KpiCard title="Avg Sales per Retailer" value={currentData.kpis.avgSalesPerRetailer} />
          <KpiCard title="Total SKU" value={currentData.kpis.totalSKU} />
          <KpiCard title="Categories" value={currentData.kpis.categories} />
          <KpiCard title="Total Brands" value={currentData.kpis.totalBrands} />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          <KpiCard title="Monthly Sales to Distributor" value={currentData.kpis.monthlySales} />
          <KpiCard title="Total Orders from Distributor" value={currentData.kpis.totalOrders} />
          <KpiCard title="Average Order Value" value={currentData.kpis.averageOrderValue} />
          <KpiCard title="Total SKU" value={currentData.kpis.totalSKU} />
          <KpiCard title="Categories" value={currentData.kpis.categories} />
          <KpiCard title="Total Brands" value={currentData.kpis.totalBrands} />
        </div>
      )}

      {/* Full Width Sales Trend Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {activeTab === "distributor-retailer"
              ? "Sales to Retailers Performance Trend"
              : "Sales to Distributor Performance Trend"}
          </CardTitle>
          <CardDescription>
            {activeTab === "distributor-retailer"
              ? "Monthly sales to retailers comparison with network average"
              : "Monthly sales to distributor comparison with network average"}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          <SalesTrendChart data={currentData.salesTrend} activeTab={activeTab} />
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {/* Category Performance */}
        <Card className="h-96">
          <CardHeader>
            <CardTitle>
              {activeTab === "distributor-retailer"
                ? "Category Performance (Retailer Sales)"
                : "Category Performance (Distributor Sales)"}
            </CardTitle>
            <CardDescription>
              {activeTab === "distributor-retailer"
                ? "Sales distribution by product category to retailers"
                : "Sales distribution by product category to distributor"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[85%]">
            <CategoryPerformanceChart data={currentData.categoryPerformance} />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="h-96 overflow-hidden">
          <CardHeader>
            <CardTitle>
              {activeTab === "distributor-retailer"
                ? "Top Products (Retailer Sales)"
                : "Top Products (Distributor Sales)"}
            </CardTitle>
            <CardDescription>
              {activeTab === "distributor-retailer"
                ? "Best-selling products to retailers"
                : "Best-selling products to distributor"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[calc(100%-90px)] p-0">
            <TopProductsTable data={currentData.topProducts} />
          </CardContent>
        </Card>
      </div>

      {/* Order Flow Chart or Orders Table */}
      {activeTab === "distributor-retailer" ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Inventory & Retailer Order Flow</CardTitle>
            <CardDescription>Inventory restocked vs. orders from retailers</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <OrderFlowChart data={currentData.orderFlow} activeTab={activeTab} />
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>FMCG Orders from Manufacturer</CardTitle>
            <CardDescription>Recent orders placed by distributor to manufacturer</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdersTable />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
