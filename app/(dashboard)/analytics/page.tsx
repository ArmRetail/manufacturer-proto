//@ts-nocheck
"use client"

import * as React from "react"
import { CalendarIcon, Search, XCircle } from "lucide-react"
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import type { DateRange } from "react-day-picker"
import {
  ResponsiveContainer, Treemap, Tooltip, Bar, BarChart, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line,
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


// --- DATA & MOCK API FUNCTIONS ---
const productOptions = [ "Maggi Noodles 2-Minute Masala", "Knorr Chicken Cubes", "Surf Excel Matic Front Load", "Dove Beauty Bar Soap", "Colgate Total Advanced Health", "Lux International Soap", "Clinic Plus Strong & Long Shampoo", "Fair & Lovely Advanced Multi Vitamin", "Pepsodent Germi Check Toothpaste", "Vim Dishwash Liquid Gel", "Rin Advanced Detergent Powder", "Sunsilk Stunning Black Shine Shampoo", "Close Up Deep Action Red Hot Gel", "Wheel Active Detergent Powder", "Lifebuoy Total 10 Activ Silver Formula", "Pond's Age Miracle Day Cream", "Horlicks Health & Nutrition Drink", "Bru Instant Coffee", "Taj Mahal Tea Bags", "Kissan Mixed Fruit Jam" ]
const districtOptions = [ "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusa", "Dolakha", "Dolpa", "Doti", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalparasi East", "Nawalparasi West", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rukum East", "Rukum West", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahu", "Taplejung", "Terhathum", "Udayapur" ]
const categoryData = [ { name: "Seasoning & Spices", size: 35.2, fill: "#FF9900" }, { name: "Home Care", size: 22.8, fill: "#232F3E" }, { name: "Personal Care", size: 18.5, fill: "#146EB4" }, { name: "Food & Beverages", size: 12.3, fill: "#FF6600" }, { name: "Health & Wellness", size: 6.7, fill: "#87CEEB" }, { name: "Baby Care", size: 3.2, fill: "#FFA500" }, { name: "Others", size: 1.3, fill: "#708090" } ]
const defaultSalesTrendData = [ { name: "Jan", value: 53.67 }, { name: "Feb", value: 48.54 }, { name: "Mar", value: 55.57 }, { name: "Apr", value: 54.43 }, { name: "May", value: 42.6 }, { name: "Jun", value: 48.53 }, { name: "Jul", value: 47.44 }, { name: "Aug", value: 37.84 }, { name: "Sep", value: 17.33 }, { name: "Oct", value: 36.5 }, { name: "Nov", value: 28.0 }, { name: "Dec", value: 15.28 } ]
const defaultActiveOutletsData = [ { name: "Jan", value: 1.9 }, { name: "Feb", value: 2.5 }, { name: "Mar", value: 2.9 }, { name: "Apr", value: 2.6 }, { name: "May", value: 2.4 }, { name: "Jun", value: 2.7 }, { name: "Jul", value: 2.2 }, { name: "Aug", value: 1.8 }, { name: "Sep", value: 1.1 }, { name: "Oct", value: 1.4 }, { name: "Nov", value: 1.4 }, { name: "Dec", value: 0.8 } ]
const salesByProvinceData = [ { name: "Bagmati", value: 51.51 }, { name: "Gandaki", value: 21.43 }, { name: "Lumbini", value: 11.68 }, { name: "Koshi", value: 5.98 }, { name: "Madhesh", value: 4.15 }, { name: "Sudurpashchim", value: 1.86 } ]
const COLORS = ["#232F3E", "#FF9900", "#146EB4", "#FF6600", "#87CEEB", "#FFA500"]
const avgOrdersData = [ { name: "Jan 2022", skus: 1.27, orders: 1.15 }, { name: "Feb 2022", skus: 1.23, orders: 1.12 }, { name: "Mar 2022", skus: 1.2, orders: 1.19 }, { name: "Apr 2022", skus: 1.32, orders: 1.2 }, { name: "May 2022", skus: 1.28, orders: 1.19 }, { name: "Jun 2022", skus: 1.28, orders: 1.19 }, { name: "Jul 2022", skus: 1.25, orders: 1.14 }, { name: "Aug 2022", skus: 1.21, orders: 1.1 }, { name: "Sep 2022", skus: 1.14, orders: 1.06 }, { name: "Oct 2022", skus: 1.1, orders: 1.05 } ]
const avgSalesData = [ { name: "Jan 2022", sales: 20, value: 22 }, { name: "Feb 2022", sales: 18, value: 19 }, { name: "Mar 2022", sales: 17, value: 21 }, { name: "Apr 2022", sales: 15, value: 18 }, { name: "May 2022", sales: 18, value: 21 }, { name: "Jun 2022", sales: 16, value: 19 }, { name: "Jul 2022", sales: 15, value: 18 }, { name: "Aug 2022", sales: 18, value: 20 }, { name: "Sep 2022", sales: 22, value: 26 }, { name: "Oct 2022", sales: 18, value: 20 } ]

// Mock data generation for dynamic charts
const generateDailyData = (month, year) => {
  const startDate = startOfMonth(new Date(year, month));
  const endDate = endOfMonth(startDate);
  return eachDayOfInterval({ start: startDate, end: endDate }).map(day => ({
    name: format(day, 'd'),
    sales: Math.floor(Math.random() * (500 - 100 + 1) + 100),
    outlets: Math.floor(Math.random() * (80 - 20 + 1) + 20)
  }));
};

const getTopOutletsForDistrict = (district) => ([
    { name: 'ABC Store', value: 45000 },
    { name: 'Himalayan Mart', value: 38000 },
    { name: 'City Retail', value: 32000 },
    { name: 'Sunrise Traders', value: 25000 },
    { name: 'Local Kirana', value: 18000 },
]);


// --- REUSABLE COMPONENTS ---
const KpiCard = ({ title, value }: { title: string; value: string }) => (<Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle></CardHeader><CardContent><TooltipProvider><UITooltip><TooltipTrigger asChild><div className="text-2xl font-bold truncate cursor-default">{value}</div></TooltipTrigger><TooltipContent><p>{value}</p></TooltipContent></UITooltip></TooltipProvider></CardContent></Card>);
const DatePickerWithRange = ({ className, date, setDate }: any) => (<div className={cn("grid gap-2", className)}><Popover><PopoverTrigger asChild><Button id="date" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{date?.from ? (date.to ? (<>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>) : (format(date.from, "LLL dd, y"))) : (<span>Pick a date</span>)}</Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} /></PopoverContent></Popover></div>);
const SearchableSelect = ({ options, placeholder, emptyMessage, value, onValueChange }: any) => {const [open, setOpen] = React.useState(false); return (<Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">{value || placeholder}<Search className="ml-2 h-4 w-4 shrink-0 opacity-50" /></Button></PopoverTrigger><PopoverContent className="w-[--radix-popover-trigger-width] p-0"><Command><CommandInput placeholder={`Search ${emptyMessage.toLowerCase()}...`} /><CommandList><CommandEmpty>No {emptyMessage.toLowerCase()} found.</CommandEmpty><CommandGroup>{options.map((option) => (<CommandItem key={option} value={option} onSelect={(currentValue) => { onValueChange(currentValue === value ? "" : currentValue); setOpen(false) }}>{option}</CommandItem>))}</CommandGroup></CommandList></Command></PopoverContent></Popover>)};

// --- CHART COMPONENTS (Static and Dynamic) ---
const ChartTooltip = ({ active, payload, labelKey, valueKey, valuePrefix = "", valueSuffix = "" }: any) => {if (active && payload && payload.length) {return (<div className="bg-background p-2 border rounded-md shadow-lg"><p className="text-sm font-semibold">{payload[0].payload[labelKey]}</p><p className="text-sm text-muted-foreground">{`${valueKey}: ${valuePrefix}${payload[0].value}${valueSuffix}`}</p></div>);}; return null;};
const CustomTreemapContent = (props: any) => { const { depth, x, y, width, height, index, name, size } = props; if (depth === 0) return null; if (width < 40 || height < 30) return null; const fontSize = width > 120 ? 12 : width > 80 ? 10 : 8; return (<g><rect x={x} y={y} width={width} height={height} style={{ fill: categoryData[index - 1]?.fill ?? "#FF9900", stroke: "#fff", strokeWidth: 2, cursor: "pointer" }} /><text x={x + width / 2} y={y + height / 2 - 8} textAnchor="middle" fill="#ffffff" fontSize={fontSize} fontWeight={500} pointerEvents="none">{name}</text><text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="#ffffff" fontSize={width > 120 ? 14 : width > 80 ? 12 : 10} fontWeight={700} pointerEvents="none">{size}%</text></g>) }
const CategoryTreemap = () => (<ResponsiveContainer width="100%" height="100%"><Treemap data={categoryData} dataKey="size" ratio={4 / 3} stroke="#fff" fill="#8884d8" content={CustomTreemapContent}><Tooltip content={({ active, payload }) => active && payload && payload.length ? <ChartTooltip active payload={payload} labelKey="name" valueKey="Sales Share" valueSuffix="%" /> : null} /></Treemap></ResponsiveContainer>);
const ProductSalesByProvinceChart = ({ product }) => (<ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={salesByProvinceData} cx="50%" cy="50%" labelLine={false} outerRadius={100} innerRadius={70} fill="#8884d8" dataKey="value" paddingAngle={5}>{salesByProvinceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" formatter={(value, entry) => (<span className="text-muted-foreground text-sm">{value} {entry.payload?.value}%</span>)} /><foreignObject x="35%" y="40%" width="30%" height="20%"><div className="flex flex-col items-center justify-center h-full text-center"><p className="text-xl font-bold">Distribution</p><p className="text-xs text-muted-foreground truncate">{product}</p></div></foreignObject></PieChart></ResponsiveContainer>);
const SalesByProvinceChart = () => (<ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={salesByProvinceData} cx="50%" cy="50%" labelLine={false} outerRadius={100} innerRadius={70} fill="#8884d8" dataKey="value" paddingAngle={5}>{salesByProvinceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" formatter={(value, entry) => (<span className="text-muted-foreground text-sm">{value} {entry.payload?.value}%</span>)} /><foreignObject x="35%" y="40%" width="30%" height="20%"><div className="flex flex-col items-center justify-center h-full"></div></foreignObject></PieChart></ResponsiveContainer>);
const TopOutletsInDistrictChart = ({ district }) => (<ResponsiveContainer width="100%" height="100%"><BarChart data={getTopOutletsForDistrict(district)} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" tickFormatter={(value) => `रू${value/1000}K`} /><YAxis type="category" dataKey="name" width={100} /><Tooltip formatter={(value) => `रू${value.toLocaleString()}`} /><Bar dataKey="value" fill="#FF9900" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer>);
const SalesTrendChart = ({ data }) => (<ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `रू${value}M`} /><Tooltip content={({ active, payload }) => active && payload && payload.length ? <ChartTooltip active payload={payload} labelKey="name" valueKey="Sales" valuePrefix="रू" valueSuffix="M" /> : null} /><Bar dataKey="value" fill="#FF9900" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>);
const ActiveOutletsChart = ({ data }) => (<ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}K`} /><Tooltip content={({ active, payload }) => active && payload && payload.length ? <ChartTooltip active payload={payload} labelKey="name" valueKey="Outlets" valueSuffix="K" /> : null} /><Bar dataKey="value" fill="#FF9900" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>);
const DailyTrendChart = ({ data, dataKey, name, unit }) => (<ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" stroke="#888888" fontSize={12} /><YAxis stroke="#888888" fontSize={12} /><Tooltip /><Legend /><Line type="monotone" dataKey={dataKey} name={name} stroke="#FF9900" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>);
const AvgOrdersChart = () => (<ResponsiveContainer width="100%" height="100%"><LineChart data={avgOrdersData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value.split(" ")[0]} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><Tooltip /><Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} /><Line type="monotone" dataKey="orders" name="Avg Orders per Outlet" stroke="#FF9900" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="skus" name="SKUs Per Outlet" stroke="#232F3E" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>)
const AvgSalesChart = () => (<ResponsiveContainer width="100%" height="100%"><LineChart data={avgSalesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => value.split(" ")[0]} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `रू${value}K`} /><Tooltip formatter={(value: number) => `रू${value}K`} /><Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} /><Line type="monotone" dataKey="sales" name="Avg Sales per Outlet" stroke="#FF9900" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="value" name="Avg Order Value" stroke="#232F3E" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>)

// --- Main Dashboard Component ---
export default function DashboardPage() {
    // State for filters
    const [selectedMonth, setSelectedMonth] = React.useState('all');
    const [selectedYear, setSelectedYear] = React.useState('2022');
    const [selectedDate, setDate] = React.useState<DateRange | undefined>({ from: undefined, to: undefined });
    const [selectedProvince, setSelectedProvince] = React.useState('all');
    const [selectedDistrict, setSelectedDistrict] = React.useState('');
    const [selectedProduct, setSelectedProduct] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [selectedBrand, setSelectedBrand] = React.useState('all');
    const [selectedCustGroup, setSelectedCustGroup] = React.useState('all');

    // State for dynamic chart data
    const [dailyData, setDailyData] = React.useState([]);
    const isMonthlyView = selectedMonth !== 'all' && selectedYear !== '';

    React.useEffect(() => {
        if (isMonthlyView) {
            // Simulate fetching daily data for the selected month
            setDailyData(generateDailyData(parseInt(selectedMonth), parseInt(selectedYear)));
        }
    }, [selectedMonth, selectedYear, isMonthlyView]);

    const handleResetFilters = () => {
        setSelectedMonth('all');
        setSelectedYear('2022');
        setDate({ from: undefined, to: undefined });
        setSelectedProvince('all');
        setSelectedDistrict('');
        setSelectedProduct('');
        setSelectedCategory('all');
        setSelectedBrand('all');
        setSelectedCustGroup('all');
    };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      {/* Filters Card */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Analytics Filters</CardTitle>
            <CardDescription>Refine the data shown on the dashboard.</CardDescription>
          </div>
          <Button variant="outline" onClick={handleResetFilters}>
            <XCircle className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Top Tier: Simple Filters */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
                <div className="space-y-2"><Label>Month</Label><Select value={selectedMonth} onValueChange={setSelectedMonth}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Months</SelectItem>{Array.from({length: 12}, (_, i) => <SelectItem key={i} value={String(i)}>{format(new Date(0, i), 'MMMM')}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label>Year</Label><Select value={selectedYear} onValueChange={setSelectedYear}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="2022">2022</SelectItem><SelectItem value="2023">2023</SelectItem></SelectContent></Select></div>
                <div className="space-y-2 -ml-9"><Label>Province</Label><Select value={selectedProvince} onValueChange={setSelectedProvince}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Provinces</SelectItem></SelectContent></Select></div>
                <div className="space-y-2 -ml-7"><Label>Category</Label><Select value={selectedCategory} onValueChange={setSelectedCategory}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem></SelectContent></Select></div>
                <div className="space-y-2 -ml-4"><Label>Brand</Label><Select value={selectedBrand} onValueChange={setSelectedBrand}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Brands</SelectItem></SelectContent></Select></div>
                <div className="space-y-2 -ml-4"><Label>Customer Group</Label><Select value={selectedCustGroup} onValueChange={setSelectedCustGroup}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Groups</SelectItem></SelectContent></Select></div>
                 <div className="lg:col-span-2 space-y-2 "><Label>Custom Date Range</Label><DatePickerWithRange date={selectedDate} setDate={setDate} /></div>
            </div>
             {/* Bottom Tier: Complex Filters */}
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="space-y-2"><Label>Search by District</Label><SearchableSelect options={districtOptions} placeholder="Select a District to drill down" emptyMessage="District" value={selectedDistrict} onValueChange={setSelectedDistrict} /></div>
                 <div className="space-y-2"><Label>Search by City</Label><SearchableSelect options={districtOptions} placeholder="Select a District to drill down" emptyMessage="City" value={selectedDistrict} onValueChange={setSelectedDistrict} /></div>
                  <div className="space-y-2"><Label>Search by Local Area</Label><SearchableSelect options={districtOptions} placeholder="Select a City to drill down" emptyMessage="Local Area" value={selectedDistrict} onValueChange={setSelectedDistrict} /></div>
                <div className="space-y-2"><Label>Search by Product</Label><SearchableSelect options={productOptions} placeholder="Select a Local Area to drill down" emptyMessage="Product" value={selectedProduct} onValueChange={setSelectedProduct} /></div>
               
             </div>
        </CardContent>
      </Card>

      {/* KPI Cards Section - UPDATED */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {/* Row 1 */}
        <KpiCard title="Total Sales" value="रू 48.6M" />
        <KpiCard title="Active Outlets" value="15,000" />
        <KpiCard title="Total Orders" value="27,000" />
        <KpiCard title="Average Order Value" value="रू 1,800" />
        {/* Row 2 */}
        <KpiCard title="Avg Sales per Outlet" value="रू 3,240" />
        <KpiCard title="Unique SKUs Sold" value="20" />
        <KpiCard title="Active Brands" value="8" />
        <KpiCard title="Active Categories" value="7" />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
        {/* DYNAMIC CARD 1: Category Treemap / Product Distribution */}
        <Card className="lg:col-span-1 h-96">
            <CardHeader><CardTitle>{selectedProduct ? `Distribution for ${selectedProduct}` : "Sales by Category"}</CardTitle></CardHeader>
            <CardContent className="h-[85%]">{selectedProduct ? <ProductSalesByProvinceChart product={selectedProduct} /> : <CategoryTreemap />}</CardContent>
        </Card>

        {/* DYNAMIC CARD 2: Sales Trend (Yearly vs Daily) */}
        <Card className="lg:col-span-1 h-96">
            <CardHeader><CardTitle>{isMonthlyView ? "Daily Sales Trend" : "Monthly Sales Trend"}</CardTitle></CardHeader>
            <CardContent className="h-[85%]">{isMonthlyView ? <DailyTrendChart data={dailyData} dataKey="sales" name="Daily Sales" unit="रू" /> : <SalesTrendChart data={defaultSalesTrendData} />}</CardContent>
        </Card>
        
        {/* DYNAMIC CARD 3: Active Outlets (Yearly vs Daily) */}
        <Card className="lg:col-span-1 h-96">
            <CardHeader><CardTitle>{isMonthlyView ? "Daily Active Outlets" : "Monthly Active Outlets Trend"}</CardTitle></CardHeader>
            <CardContent className="h-[85%]">{isMonthlyView ? <DailyTrendChart data={dailyData} dataKey="outlets" name="Active Outlets" /> : <ActiveOutletsChart data={defaultActiveOutletsData} />}</CardContent>
        </Card>

        {/* DYNAMIC CARD 4: Province Distribution / District Drilldown */}
        <Card className="lg:col-span-1 h-96">
            <CardHeader><CardTitle>{selectedDistrict ? `Top Outlets in ${selectedDistrict}` : "Sales by Province"}</CardTitle></CardHeader>
            <CardContent className="h-[85%]">{selectedDistrict ? <TopOutletsInDistrictChart district={selectedDistrict} /> : <SalesByProvinceChart />}</CardContent>
        </Card>
        
        {/* STATIC CARD 5 */}
        <Card className="lg:col-span-1 h-96">
            <CardHeader><CardTitle>Avg Orders & SKUs per Outlet</CardTitle></CardHeader>
            <CardContent className="h-[85%]"><AvgOrdersChart /></CardContent>
        </Card>

        {/* STATIC CARD 6 */}
        <Card className="lg:col-span-1 h-96">
            <CardHeader><CardTitle>Avg Sales Per Outlet & Avg Basket Size</CardTitle></CardHeader>
            <CardContent className="h-[85%]"><AvgSalesChart /></CardContent>
        </Card>
      </div>
    </div>
  );
}