//@ts-nocheck

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Eye, MousePointerClick, Target, Copy, MapPin, Package } from "lucide-react"

// Mock data for the chart
const promoAnalyticsData = [
  { date: "Jul 1", impressions: 1200, clicks: 550, orders: 430 },
  { date: "Jul 2", impressions: 1800, clicks: 590, orders: 363 },
  { date: "Jul 3", impressions: 2400, clicks: 720, orders: 405 },
  { date: "Jul 4", impressions: 1000, clicks: 320, orders: 130 },
  { date: "Jul 5", impressions: 2800, clicks: 1200, orders: 711 },
  { date: "Jul 6", impressions: 3200, clicks: 1410, orders: 913 },
  { date: "Jul 7", impressions: 2500, clicks: 2180, orders: 1990 },
]

// Custom Tooltip for the chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background min-w-[150px] p-2 shadow-sm">
        <div className="flex flex-col  gap-2">
          <div className="flex flex-row justify-between space-y-1">
            <span className="text-[10px] uppercase text-muted-foreground">Date</span>
            <span className="font-normal text-[10px] text-muted-foreground">{label}</span>
          </div>
          <div className="flex flex-row justify-between space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">Impressions</span>
            <span className="font-bold" style={{ color: payload[0].color }}>{payload[0].value.toLocaleString()}</span>
          </div>
          <div className="flex flex-row justify-between space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">Clicks</span>
            <span className="font-bold" style={{ color: payload[1].color }}>{payload[1].value.toLocaleString()}</span>
          </div>
             <div className="flex flex-row justify-between space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">Orderss</span>
            <span className="font-bold" style={{ color: payload[2].color }}>{payload[2].value.toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function PromotionAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Summer Savings Promo</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-gray-600">1 Jul 2025 - 15 Jul 2025</p>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">Live</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">Popup</Badge>
            </div>
          </div>

        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="shadow-sm rounded-xl"><CardContent className="p-6 flex items-center justify-between"><div className="space-y-1"><p className="text-sm text-gray-600">Total Impressions</p><p className="text-3xl font-bold text-gray-900">6,800</p></div><div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Eye className="h-6 w-6 text-blue-600" /></div></CardContent></Card>
          <Card className="shadow-sm rounded-xl"><CardContent className="p-6 flex items-center justify-between"><div className="space-y-1"><p className="text-sm text-gray-600">Total Clicks</p><p className="text-3xl font-bold text-gray-900">1,050</p></div><div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"><MousePointerClick className="h-6 w-6 text-orange-600" /></div></CardContent></Card>
          <Card className="shadow-sm rounded-xl"><CardContent className="p-6 flex items-center justify-between"><div className="space-y-1"><p className="text-sm text-gray-600">Click-Through Rate</p><p className="text-3xl font-bold text-gray-900">15.4%</p></div><div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Target className="h-6 w-6 text-green-600" /></div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Line Chart */}
          <Card className="lg:col-span-2 shadow-sm rounded-xl">
            <CardHeader><CardTitle>Impressions & Clicks Over Time</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={promoAnalyticsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 153, 0, 0.1)" }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="impressions" stroke="#4f46e5" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="clicks" stroke="#f97316" strokeWidth={2} dot={false} />
                   <Line type="monotone" dataKey="orders" stroke="oklch(52.7% 0.154 150.069)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* Location Performance */}
            <Card className="shadow-sm rounded-xl">
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-gray-500" />Top Locations</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm"><p className="font-medium text-gray-800">Kathmandu</p><p className="font-mono text-gray-600">5.2% CTR</p></div>
                <div className="flex items-center justify-between text-sm"><p className="font-medium text-gray-800">Pokhara</p><p className="font-mono text-gray-600">4.7% CTR</p></div>
                <div className="flex items-center justify-between text-sm"><p className="font-medium text-gray-800">Butwal</p><p className="font-mono text-gray-600">4.1% CTR</p></div>
              </CardContent>
            </Card>

            {/* Promoted Products */}
            <Card className="shadow-sm rounded-xl">
              <CardHeader><CardTitle className="flex items-center gap-2"><Package className="h-5 w-5 text-gray-500" />Promoted Products</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg?height=48&width=48" alt="Product" className="w-12 h-12 rounded-lg bg-gray-100" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Tide Detergent 5kg</div>
                    <div className="text-sm text-gray-500">10% Off</div>
                  </div>
                  <div className="text-right"><div className="font-semibold text-gray-800">320</div><div className="text-xs text-gray-500">units sold</div></div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <img src="/placeholder.svg?height=48&width=48" alt="Product" className="w-12 h-12 rounded-lg bg-gray-100" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Pepsodent Family Pack</div>
                    <div className="text-sm text-gray-500">Buy 2 Get 1 Free</div>
                  </div>
                   <div className="text-right"><div className="font-semibold text-gray-800">210</div><div className="text-xs text-gray-500">units sold</div></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}