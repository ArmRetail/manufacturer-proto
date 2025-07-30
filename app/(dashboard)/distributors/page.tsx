//@ts-nocheck
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Users,
  Package,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Plus,
  CalendarIcon,
  Percent,
  Target,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface RebateTier {
  id: string
  minAmount: number
  maxAmount: number
  percentage: number
}

interface Rebate {
  id: string
  distributorId: string
  name: string
  startDate: Date
  endDate: Date
  brands: string[]
  tiers: RebateTier[]
  isActive: boolean
  createdDate: Date
}

interface Distributor {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  district: string
  panNo: string
  joinedDate: string
  totalRetailers: number
  brands: string[]
  rebates?: Rebate[]
}

const mockDistributors: Distributor[] = [
  {
    id: "1",
    name: "Himalayan Distribution Co.",
    email: "contact@himalayandist.com",
    phone: "+977-1-4567890",
    address: "Thamel Marg, Ward 26",
    city: "Kathmandu",
    district: "Kathmandu",
    panNo: "123456789",
    joinedDate: "2023-01-15",
    totalRetailers: 45,
    brands: ["Wai Wai", "Khukuri", "Dairy Milk", "Coca Cola"],
    rebates: [
      {
        id: "r1",
        distributorId: "1",
        name: "Q1 2024 Rebate",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-03-31"),
        brands: ["Wai Wai", "Khukuri"],
        tiers: [
          { id: "t1", minAmount: 10, maxAmount: 20, percentage: 3 },
          { id: "t2", minAmount: 20, maxAmount: 30, percentage: 4 },
          { id: "t3", minAmount: 30, maxAmount: 999, percentage: 5 },
        ],
        isActive: true,
        createdDate: new Date("2023-12-15"),
      },
    ],
  },
  {
    id: "2",
    name: "Everest Supply Chain",
    email: "info@everestsupply.com",
    phone: "+977-61-234567",
    address: "Lakeside, Ward 6",
    city: "Pokhara",
    district: "Kaski",
    panNo: "234567890",
    joinedDate: "2023-02-20",
    totalRetailers: 32,
    brands: ["Wai Wai", "Pepsi", "Maggi", "Britannia"],
  },
  {
    id: "3",
    name: "Terai Logistics Hub",
    email: "hello@terailogistics.com",
    phone: "+977-21-345678",
    address: "Main Road, Ward 12",
    city: "Biratnagar",
    district: "Morang",
    panNo: "345678901",
    joinedDate: "2023-03-10",
    totalRetailers: 28,
    brands: ["Khukuri", "Dairy Milk", "Sprite", "Parle-G"],
  },
  {
    id: "4",
    name: "Mountain View Distributors",
    email: "support@mountainview.com",
    phone: "+977-71-456789",
    address: "Bhanu Chowk, Ward 8",
    city: "Dharan",
    district: "Sunsari",
    panNo: "456789012",
    joinedDate: "2023-04-05",
    totalRetailers: 38,
    brands: ["Wai Wai", "Coca Cola", "Maggi", "Britannia", "Pepsi"],
  },
  {
    id: "5",
    name: "Central Nepal Supply",
    email: "contact@centralsupply.com",
    phone: "+977-56-567890",
    address: "Narayanghat Road, Ward 15",
    city: "Bharatpur",
    district: "Chitwan",
    panNo: "567890123",
    joinedDate: "2023-05-12",
    totalRetailers: 52,
    brands: ["Khukuri", "Dairy Milk", "Sprite", "Parle-G", "Maggi"],
  },
  {
    id: "6",
    name: "Western Region Network",
    email: "info@westernnetwork.com",
    phone: "+977-81-678901",
    address: "Mahendra Highway, Ward 3",
    city: "Butwal",
    district: "Rupandehi",
    panNo: "678901234",
    joinedDate: "2023-06-18",
    totalRetailers: 41,
    brands: ["Wai Wai", "Pepsi", "Coca Cola", "Britannia"],
  },
  {
    id: "7",
    name: "Far West Distribution",
    email: "contact@farwestdist.com",
    phone: "+977-91-789012",
    address: "Seti Zone, Ward 5",
    city: "Dhangadhi",
    district: "Kailali",
    panNo: "789012345",
    joinedDate: "2023-07-22",
    totalRetailers: 23,
    brands: ["Khukuri", "Sprite", "Maggi"],
  },
  {
    id: "8",
    name: "Eastern Hills Supply",
    email: "hello@easternhills.com",
    phone: "+977-25-890123",
    address: "Hillside Road, Ward 9",
    city: "Ilam",
    district: "Ilam",
    panNo: "890123456",
    joinedDate: "2023-08-14",
    totalRetailers: 19,
    brands: ["Wai Wai", "Dairy Milk", "Parle-G"],
  },
]

const allDistricts = Array.from(new Set(mockDistributors.map((d) => d.district))).sort()
const allBrands = Array.from(new Set(mockDistributors.flatMap((d) => d.brands))).sort()
const ITEMS_PER_PAGE = 8

export default function DistributorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredDistributors, setFilteredDistributors] = useState(mockDistributors)
  const [distributors, setDistributors] = useState(mockDistributors)


  const applyFilters = () => {
    let filtered = distributors

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (distributor) =>
          distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          distributor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          distributor.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          distributor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          distributor.panNo.includes(searchTerm),
      )
    }

    // District filter
    if (selectedDistrict !== "all") {
      filtered = filtered.filter((distributor) => distributor.district === selectedDistrict)
    }

    // Brand filter
    if (selectedBrand !== "all") {
      filtered = filtered.filter((distributor) => distributor.brands.includes(selectedBrand))
    }

    setFilteredDistributors(filtered)
    setCurrentPage(1)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    applyFilters()
  }

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
    applyFilters()
  }

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value)
    applyFilters()
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredDistributors.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentDistributors = filteredDistributors.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }



  const getActiveRebatesCount = (distributor: Distributor) => {
    return distributor.rebates?.filter((rebate) => rebate.isActive).length || 0
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Distributors</h1>
              <p className="text-slate-600 mt-1">Manage your distribution network and rebate systems across Nepal</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="flex flex-wrap gap-3 items-end bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 mb-2">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-1/2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, city, district, email, or PAN..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 min-w-full border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                {/* District Filter */}
                <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
                  <SelectTrigger className="border-slate-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="All Districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {allDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Brand Filter */}
                <Select value={selectedBrand} onValueChange={handleBrandChange}>
                  <SelectTrigger className="border-slate-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {allBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Distributors Table */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-700">Distributor & Contact</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Location</th>
                 
                      <th className="text-left p-4 font-semibold text-slate-700  bg-red-300">Brands</th>
                      <th className="text-left p-4 font-semibold text-slate-700 ">Rebates</th>
                   
                      <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDistributors.map((distributor, index) => (
                      <tr
                        key={distributor.id}
                        className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                        }`}
                      >
                        <td className="p-4">
                          <div className="space-y-2">
                            <div>
                              <div className="font-semibold text-slate-900">{distributor.name}</div>
                              <div className="text-sm text-slate-500">
                                <span className="text-orange-600">PAN:</span> {distributor.panNo}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-3 w-3 text-orange-600" />
                                <span className="text-slate-600">{distributor.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-3 w-3 text-orange-600" />
                                <span className="text-slate-600">{distributor.phone}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-orange-600 mt-0.5" />
                            <div className="text-sm">
                              <div className="text-slate-900">
                                {distributor.city}, {distributor.district}
                              </div>
                              <div className="text-slate-500">{distributor.address}</div>
                            </div>
                          </div>
                        </td>
                     
                        <td className="p-4">
                          <div className="flex  items-center space-x-2">
                            <Package className="h-4 w-4 text-orange-500" />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex flex-wrap gap-1 cursor-pointer">
                                  {distributor.brands.slice(0, 2).map((brand) => (
                                    <Badge
                                      key={brand}
                                      variant="secondary"
                                      className="text-xs bg-orange-100 text-orange-600 hover:bg-orange-100"
                                    >
                                      {brand}
                                    </Badge>
                                  ))}
                                  {distributor.brands.length > 2 && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-slate-100 text-orange-600 hover:bg-slate-100"
                                    >
                                      +{distributor.brands.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <div className="space-y-1">
                                  <p className="font-semibold text-sm">All Brands ({distributor.brands.length})</p>
                                  <div className="flex flex-wrap gap-1">
                                    {distributor.brands.map((brand) => (
                                      <Badge
                                        key={brand}
                                        variant="secondary"
                                        className="text-xs bg-orange-100 text-orange-600"
                                      >
                                        {brand}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            {/* <Percent className="h-4 w-4 text-green-500" /> */}
                            <div className="text-sm flex ">
                              <div className="font-semibold text-slate-900">
                                {getActiveRebatesCount(distributor)} Active
                              </div>

                            </div>
                          </div>
                        </td>
                     
                        <td className="p-4">
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="w-full !text-white"
                              onClick={() => (window.location.href = "distributors/analytics")}
                            >
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Analytics
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredDistributors.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-lg mb-2">No distributors found</div>
                  <div className="text-slate-500 text-sm">
                    {searchTerm || selectedDistrict !== "all" || selectedBrand !== "all"
                      ? "Try adjusting your search terms or filters"
                      : "No distributors have been added yet"}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {filteredDistributors.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
                  <div className="text-sm text-slate-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredDistributors.length)} of{" "}
                    {filteredDistributors.length} distributors
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="border-slate-200 hover:border-slate-300 bg-transparent disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className={
                            currentPage === page
                              ? "bg-orange-500 hover:bg-orange-600 text-white"
                              : "border-slate-200 hover:border-slate-300 bg-transparent"
                          }
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="border-slate-200 hover:border-slate-300 bg-transparent disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>


     
    </TooltipProvider>
  )
}
