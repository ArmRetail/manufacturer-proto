"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, BarChart3, TrendingUp, Plus, Clock, X } from "lucide-react"
import { useRouter } from "next/navigation"


export default function PromotionPage() {
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter();


  // Add this data at the top of the component, after the useState
  const statusTabs = [
    { key: "all", label: "All Status", icon: BarChart3 },
    { key: "not-started", label: "Not Started", icon: Search },
    { key: "ongoing", label: "On-going", icon: TrendingUp },
    { key: "suspended", label: "Suspended", icon: MoreVertical },
    { key: "expired", label: "Expired", icon: Search },
    { key: "pending-qc", label: "Pending QC", icon: Clock },
    { key: "rejected", label: "Rejected", icon: X },
  ]

  // Mock data for counting (add this after statusTabs)
  const mockPromotions = [
    { status: "ongoing" },
    { status: "not-started" },
    { status: "expired" },
    { status: "suspended" },
    { status: "ongoing" },
    { status: "not-started" },
    { status: "ongoing" },
    { status: "expired" },
    { status: "pending-qc" },
    { status: "rejected" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Promotion Management Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header with Create Button */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Promotion Management</h1>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={()=> router.push('/promotions/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Promotion
          </Button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search promotions..." className="pl-10 bg-white" />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex overflow-x-auto">
            {statusTabs.map((tab) => {
              const IconComponent = tab.icon
              const count =
                tab.key === "all"
                  ? mockPromotions.length
                  : mockPromotions.filter((req) => req.status === tab.key).length
              const isActive = activeTab === tab.key

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? "border-orange-500 text-orange-600 bg-orange-50"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {tab.label}
                  <Badge
                    className={`ml-1 ${
                      isActive
                        ? "bg-orange-100 text-orange-700 border-orange-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    } text-xs px-2 py-0.5 w-6 h-5 flex items-center justify-center`}
                  >
                    {count}
                  </Badge>
                </button>
              )
            })}
          </div>
        </div>



        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Promotion Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Period</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Discount Apply To</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Orders Placed</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Discount Details</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px] "
                      title="Summer Sale 2024"
                      onClick={()=> router.push('/promotions/analytics')}
                    >
                      Summer Sale 2024
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706021</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-07-01 00:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-07-31 23:59:59
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">All Products</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">15</td>
                <td className="px-6 py-3 text-sm text-gray-700">20% off, Min order: Rs. 500</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    On-going
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600" onClick={()=> router.push('/promotions/analytics')}>View</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Pause</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px]"
                      title="Festival Special"
                      onClick={()=> router.push('/promotions/analytics')}
                    >
                      Festival Special
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706022</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-08-15 00:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-08-25 23:59:59
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">Selected Products</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">0</td>
                <td className="px-6 py-3 text-sm text-gray-700">Buy 2 Get 1 Free</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="px-2 bg-orange-50 text-orange-700 border border-orange-200">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Not Started
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600" onClick={()=> router.push('/promotions/analytics')}>View</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Start</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px]"
                      title="Winter Clearance"
                      onClick={()=> router.push('/promotions/analytics')}
                    >
                      Winter Clearance
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706023</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-06-01 00:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-06-30 23:59:59
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">All Products</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">45</td>
                <td className="px-6 py-3 text-sm text-gray-700">30% off, Max discount: Rs. 1000</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="bg-gray-50 text-gray-700 border border-gray-200">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                    Expired
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600" onClick={()=> router.push('/promotions/analytics')}>View</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px]"
                      title="Flash Sale Monday"
                      onClick={()=> router.push('/promotions/analytics')}
                    >
                      Flash Sale Monday
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706024</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-07-20 10:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-07-20 18:00:00
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">Electronics</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">8</td>
                <td className="px-6 py-3 text-sm text-gray-700">50% off, Limited time</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border border-yellow-200">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Suspended
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600" onClick={()=> router.push('/promotions/analytics')}>View</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Resume</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Edit</DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px]"
                      title="Back to School"
                      onClick={()=> router.push('/promotions/analytics')}
                    >
                      Back to School
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706025</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-08-01 00:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-08-31 23:59:59
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">Books & Stationery</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">23</td>
                <td className="px-6 py-3 text-sm text-gray-700">15% off, Free shipping</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    On-going
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600" onClick={()=> router.push('/promotions/analytics')}>View</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Pause</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px]"
                      title="New Customer Welcome Promotion with Special Discount Offers"
                      onClick={()=> router.push('/promotions/analytics')}
                    >
                      New Customer Welcome Promotion with Special Discount Offers
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706026</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-07-01 00:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-12-31 23:59:59
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">All Products</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">67</td>
                <td className="px-6 py-3 text-sm text-gray-700">10% off first order</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    On-going
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600" onClick={()=> router.push('/promotions/analytics')}>View</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Pause</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px]"
                      title="Weekend Special Flash Sale with Limited Time Offers"
                      onClick={()=> router.push('/promotions/analytics')}
                    >
                      Weekend Special Flash Sale with Limited Time Offers
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706027</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-07-27 00:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-07-28 23:59:59
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">Fashion</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">12</td>
                <td className="px-6 py-3 text-sm text-gray-700">25% off, Weekend only</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    On-going
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600" onClick={()=> router.push('/promotions/analytics')}>View</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Edit</DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <div>
                    <div
                      className="text-sm font-medium text-gray-900 truncate cursor-pointer max-w-[200px]"
                      title="Loyalty Rewards"
                    >
                      Loyalty Rewards
                    </div>
                    <div className="text-sm text-orange-600 font-medium">ID: 50000016706028</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  <div>
                    <div>
                      <span className="text-orange-600 font-medium">From</span> 2024-09-01 00:00:00
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">To</span> 2024-09-30 23:59:59
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">VIP Members</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">0</td>
                <td className="px-6 py-3 text-sm text-gray-700">Double points + 5% off</td>
                <td className="px-6 py-3">
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700 border border-orange-200">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Not Started
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">View</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700 hover:text-orange-600">Edit</DropdownMenuItem>
                   </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Total 8</span>
            <Select defaultValue="8">
              <SelectTrigger className="w-16 h-8 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="24">24</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="bg-white">
              Previous
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              1
            </Button>
            <Button variant="outline" size="sm" disabled className="bg-white">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
