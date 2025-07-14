"use client"
import { DialogFooter } from "@/components/ui/dialog"
import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  Package,
  Users,
  Calendar,
  Eye,
  AlertCircle,
  Phone,
  Mail,
  Filter,
  UserCheck,
  UserX,
  FileText,
  CreditCard,
  UserMinus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock manufacturer's brands
const mockManufacturerBrands = [
  {
    id: "BRAND-001",
    name: "Wai Wai Noodles",
    totalSKU: 24,
    activeDistributors: 12,
    pendingRequests: 3,
    monthlyVolume: "2.5M NPR",
  },
  {
    id: "BRAND-002",
    name: "Chau Chau Noodles",
    totalSKU: 18,
    activeDistributors: 8,
    pendingRequests: 1,
    monthlyVolume: "1.8M NPR",
  },
]

// Mock incoming distributor requests
const mockDistributorRequests = [
  {
    id: "REQ-001",
    distributorName: "Ram Kumar Distributors",
    distributorId: "DIST-001",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    status: "pending",
    requestedOn: "2024-01-15T10:30:00Z",
    expectedVolume: "500,000 NPR/month",
    coverageArea: "Kathmandu Valley",
    distributorProfile: {
      businessName: "Ram Kumar Distributors Pvt. Ltd.",
      ownerName: "Ram Kumar Sharma",
      phone: "+977-9841234567",
      email: "ram@rkdistributors.com",
      address: "Thamel, Kathmandu",
      panNumber: "301234567",
      vatNumber: "600123456",
      businessLicense: "KTM-2016-001234",
      bankAccount: "Nepal Bank Ltd - 01234567890",
      creditLimit: "2,000,000 NPR",
      paymentTerms: "30 days",
      // Business metrics
      monthlyTurnover: "15,000,000 NPR",
      marketReach: "200+ retailers",
      distributionNetwork: "Urban & Semi-urban",
      businessRating: 4.2,
      onTimeDelivery: "95%",
      customerSatisfaction: "4.5/5",
      territoryExperience: "8 years in Kathmandu Valley",
      competitorBrands: "Maggi, Top Ramen, Mayos",
    },
  },
  {
    id: "REQ-002",
    distributorName: "Himalayan Trade House",
    distributorId: "DIST-002",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    status: "pending",
    requestedOn: "2024-01-12T14:20:00Z",
    expectedVolume: "300,000 NPR/month",
    coverageArea: "Pokhara Metropolitan",
    distributorProfile: {
      businessName: "Himalayan Trade House",
      ownerName: "Sita Gurung",
      phone: "+977-9856789012",
      email: "sita@himalayantrade.com",
      address: "Lakeside, Pokhara",
      panNumber: "301234568",
      vatNumber: "600123457",
      businessLicense: "PKR-2019-005678",
      bankAccount: "Everest Bank Ltd - 01234567891",
      creditLimit: "1,500,000 NPR",
      paymentTerms: "15 days",
      // Business metrics
      monthlyTurnover: "8,500,000 NPR",
      marketReach: "120+ retailers",
      distributionNetwork: "Tourist areas & Local markets",
      businessRating: 4.0,
      onTimeDelivery: "92%",
      customerSatisfaction: "4.3/5",
      territoryExperience: "5 years in Pokhara region",
      competitorBrands: "Maggi, Chau Chau",
    },
  },
  {
    id: "REQ-003",
    distributorName: "Eastern Nepal Suppliers",
    distributorId: "DIST-003",
    brandName: "Chau Chau Noodles",
    brandId: "BRAND-002",
    status: "pending",
    requestedOn: "2024-01-10T16:45:00Z",
    expectedVolume: "400,000 NPR/month",
    coverageArea: "Biratnagar and surrounding areas",
    distributorProfile: {
      businessName: "Eastern Nepal Suppliers",
      ownerName: "Rajesh Yadav",
      phone: "+977-9812345678",
      email: "rajesh@easternsuppliers.com",
      address: "Traffic Chowk, Biratnagar",
      panNumber: "301234569",
      vatNumber: "600123458",
      businessLicense: "BTG-2012-009876",
      bankAccount: "NIC Asia Bank - 01234567892",
      creditLimit: "3,000,000 NPR",
      paymentTerms: "45 days",
      // Business metrics
      monthlyTurnover: "22,000,000 NPR",
      marketReach: "350+ retailers",
      distributionNetwork: "Urban, Rural & Remote areas",
      businessRating: 4.7,
      onTimeDelivery: "98%",
      customerSatisfaction: "4.8/5",
      territoryExperience: "12 years in Eastern Nepal",
      competitorBrands: "Wai Wai, Maggi, Top Ramen, Mayos",
    },
  },
  {
    id: "REQ-004",
    distributorName: "Valley Fresh Distributors",
    distributorId: "DIST-004",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    status: "approved",
    requestedOn: "2024-01-05T09:15:00Z",
    approvedOn: "2024-01-08T11:30:00Z",
    expectedVolume: "600,000 NPR/month",
    coverageArea: "Lalitpur District",
    distributorProfile: {
      businessName: "Valley Fresh Distributors",
      ownerName: "Prakash Shrestha",
      phone: "+977-9823456789",
      email: "prakash@valleyfresh.com",
      address: "Patan Dhoka, Lalitpur",
      panNumber: "301234570",
      vatNumber: "600123459",
      businessLicense: "LTP-2014-004567",
      bankAccount: "Standard Chartered Bank - 01234567893",
      creditLimit: "2,500,000 NPR",
      paymentTerms: "30 days",
      // Business metrics
      monthlyTurnover: "18,500,000 NPR",
      marketReach: "280+ retailers",
      distributionNetwork: "Premium & Mid-tier markets",
      businessRating: 4.5,
      onTimeDelivery: "96%",
      customerSatisfaction: "4.6/5",
      territoryExperience: "10 years in Lalitpur",
      competitorBrands: "Maggi, Top Ramen",
    },
  },
  {
    id: "REQ-005",
    distributorName: "Mountain Peak Trading",
    distributorId: "DIST-005",
    brandName: "Chau Chau Noodles",
    brandId: "BRAND-002",
    status: "rejected",
    requestedOn: "2024-01-03T13:20:00Z",
    rejectedOn: "2024-01-06T10:45:00Z",
    rejectionReason:
      "Insufficient warehouse capacity for our minimum volume requirements. Current capacity of 2000 sq ft is below our 4000 sq ft minimum requirement.",
    expectedVolume: "250,000 NPR/month",
    coverageArea: "Chitwan District",
    distributorProfile: {
      businessName: "Mountain Peak Trading",
      ownerName: "Binod Thapa",
      phone: "+977-9834567890",
      email: "binod@mountainpeak.com",
      address: "Bharatpur, Chitwan",
      panNumber: "301234571",
      vatNumber: "600123460",
      businessLicense: "CTW-2021-007890",
      bankAccount: "Himalayan Bank Ltd - 01234567894",
      creditLimit: "800,000 NPR",
      paymentTerms: "15 days",
      // Business metrics
      monthlyTurnover: "5,200,000 NPR",
      marketReach: "80+ retailers",
      distributionNetwork: "Local markets",
      businessRating: 3.8,
      onTimeDelivery: "88%",
      customerSatisfaction: "4.1/5",
      territoryExperience: "3 years in Chitwan",
      competitorBrands: "Maggi, Wai Wai",
    },
  },
  // Add more mock data for pagination demonstration
  {
    id: "REQ-006",
    distributorName: "Kathmandu Wholesale Hub",
    distributorId: "DIST-006",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    status: "pending",
    requestedOn: "2024-01-08T11:15:00Z",
    expectedVolume: "750,000 NPR/month",
    coverageArea: "Kathmandu Metropolitan",
    distributorProfile: {
      businessName: "Kathmandu Wholesale Hub Pvt. Ltd.",
      ownerName: "Suresh Maharjan",
      phone: "+977-9845123456",
      email: "suresh@kwhub.com",
      address: "Asan, Kathmandu",
      panNumber: "301234572",
      vatNumber: "600123461",
      businessLicense: "KTM-2018-002345",
      bankAccount: "Nabil Bank Ltd - 01234567895",
      creditLimit: "3,500,000 NPR",
      paymentTerms: "45 days",
      monthlyTurnover: "25,000,000 NPR",
      marketReach: "400+ retailers",
      distributionNetwork: "Urban & Commercial areas",
      businessRating: 4.6,
      onTimeDelivery: "97%",
      customerSatisfaction: "4.7/5",
      territoryExperience: "12 years in Kathmandu",
      competitorBrands: "Maggi, Top Ramen, Chau Chau",
    },
  },
  {
    id: "REQ-007",
    distributorName: "Pokhara Valley Distributors",
    distributorId: "DIST-007",
    brandName: "Chau Chau Noodles",
    brandId: "BRAND-002",
    status: "approved",
    requestedOn: "2024-01-02T09:30:00Z",
    approvedOn: "2024-01-04T14:20:00Z",
    expectedVolume: "450,000 NPR/month",
    coverageArea: "Pokhara Valley",
    distributorProfile: {
      businessName: "Pokhara Valley Distributors",
      ownerName: "Maya Gurung",
      phone: "+977-9867890123",
      email: "maya@pvdistributors.com",
      address: "Mahendrapul, Pokhara",
      panNumber: "301234573",
      vatNumber: "600123462",
      businessLicense: "PKR-2020-003456",
      bankAccount: "Global IME Bank - 01234567896",
      creditLimit: "2,200,000 NPR",
      paymentTerms: "30 days",
      monthlyTurnover: "12,500,000 NPR",
      marketReach: "180+ retailers",
      distributionNetwork: "Tourist & Local markets",
      businessRating: 4.3,
      onTimeDelivery: "94%",
      customerSatisfaction: "4.4/5",
      territoryExperience: "7 years in Pokhara",
      competitorBrands: "Wai Wai, Maggi",
    },
  },
  {
    id: "REQ-008",
    distributorName: "Chitwan Commercial Center",
    distributorId: "DIST-008",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    status: "rejected",
    requestedOn: "2024-01-01T16:45:00Z",
    rejectedOn: "2024-01-03T10:30:00Z",
    rejectionReason:
      "Limited distribution network coverage. Current network covers only 60% of the required territory.",
    expectedVolume: "350,000 NPR/month",
    coverageArea: "Chitwan District",
    distributorProfile: {
      businessName: "Chitwan Commercial Center",
      ownerName: "Ram Bahadur Thapa",
      phone: "+977-9812345679",
      email: "ram@chitwan-commercial.com",
      address: "Bharatpur-10, Chitwan",
      panNumber: "301234574",
      vatNumber: "600123463",
      businessLicense: "CTW-2019-004567",
      bankAccount: "Rastriya Banijya Bank - 01234567897",
      creditLimit: "1,800,000 NPR",
      paymentTerms: "20 days",
      monthlyTurnover: "9,200,000 NPR",
      marketReach: "110+ retailers",
      distributionNetwork: "Local markets",
      businessRating: 3.9,
      onTimeDelivery: "89%",
      customerSatisfaction: "4.2/5",
      territoryExperience: "5 years in Chitwan",
      competitorBrands: "Chau Chau, Maggi",
    },
  },
]

const statusTabs = [
  { key: "all", label: "All Requests", icon: Package },
  { key: "pending", label: "Pending Review", icon: Clock },
  { key: "approved", label: "Approved", icon: CheckCircle },
  { key: "rejected", label: "Rejected", icon: XCircle },
]

const ITEMS_PER_PAGE = 5

export default function ManufacturerBrandRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<(typeof mockDistributorRequests)[0] | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [cancelReason, setCancelReason] = useState("")

  // Filter distributor requests
  const filteredRequests = useMemo(() => {
    let filtered = mockDistributorRequests

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((request) => request.status === activeTab)
    }

    // Filter by brand
    if (selectedBrand !== "all") {
      filtered = filtered.filter((request) => request.brandId === selectedBrand)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.brandName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [activeTab, selectedBrand, searchTerm])

  // Pagination calculations
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [activeTab, selectedBrand, searchTerm])

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    }

    const icons = {
      pending: Clock,
      approved: CheckCircle,
      rejected: XCircle,
    }

    const IconComponent = icons[status as keyof typeof icons]

    return (
      <Badge
        className={`${variants[status as keyof typeof variants]} border font-medium px-2 py-1 text-xs flex items-center gap-1 w-20 justify-center`}
      >
        <IconComponent className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleViewDetails = (request: (typeof mockDistributorRequests)[0]) => {
    setSelectedRequest(request)
    setShowDetailsDialog(true)
  }

  const handleApprove = (request: (typeof mockDistributorRequests)[0]) => {
    setSelectedRequest(request)
    setShowApprovalDialog(true)
  }

  const handleReject = (request: (typeof mockDistributorRequests)[0]) => {
    setSelectedRequest(request)
    setRejectionReason("")
    setShowRejectionDialog(true)
  }

  const handleCancel = (request: (typeof mockDistributorRequests)[0]) => {
    setSelectedRequest(request)
    setCancelReason("")
    setShowCancelDialog(true)
  }

  const handleConfirmApproval = () => {
    if (selectedRequest) {
      console.log("Approving request:", selectedRequest.id)
      setShowApprovalDialog(false)
      setSelectedRequest(null)
    }
  }

  const handleConfirmRejection = () => {
    if (selectedRequest && rejectionReason.trim()) {
      console.log("Rejecting request:", selectedRequest.id, "Reason:", rejectionReason)
      setShowRejectionDialog(false)
      setSelectedRequest(null)
      setRejectionReason("")
    }
  }

  const handleConfirmCancel = () => {
    if (selectedRequest && cancelReason.trim()) {
      console.log("Cancelling partnership:", selectedRequest.id, "Reason:", cancelReason)
      setShowCancelDialog(false)
      setSelectedRequest(null)
      setCancelReason("")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisiblePages = 5
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
    <div className="flex-1 bg-gray-50 w-full min-w-0 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Distributor Partnership Requests</h1>
            <p className="text-gray-600 mt-1">Review and manage incoming partnership requests from distributors</p>
          </div>

          {/* Filters */}
          <Card className="shadow-sm border-gray-200 bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by distributor name or brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {mockManufacturerBrands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Status Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex overflow-x-auto">
              {statusTabs.map((tab) => {
                const IconComponent = tab.icon
                const count =
                  tab.key === "all"
                    ? mockDistributorRequests.length
                    : mockDistributorRequests.filter((req) => req.status === tab.key).length
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

          {/* Main Requests Table */}
          <Card className="shadow-sm border-gray-200 bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="font-semibold text-gray-900 px-6 py-4">Distributor</TableHead>
                      <TableHead className="font-semibold text-gray-900 px-6 py-4">Brand</TableHead>
                      <TableHead className="font-semibold text-gray-900 px-6 py-4">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900 px-6 py-4">Requested On</TableHead>
                      <TableHead className="font-semibold text-gray-900 px-6 py-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRequests.map((request) => {
                      return (
                        <TableRow key={request.id} className="hover:bg-gray-50 border-gray-100">
                          <TableCell className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900">{request.distributorName}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                <Building2 className="h-3 w-3" />
                                {request.distributorProfile.ownerName}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="font-medium text-gray-900">{request.brandName}</div>
                          </TableCell>
                          <TableCell className="px-6 py-4">{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="h-3 w-3" />
                              {formatDate(request.requestedOn)}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDetails(request)}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              {request.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(request)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                  >
                                    <UserCheck className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReject(request)}
                                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                                  >
                                    <UserX className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {request.status === "rejected" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(request)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                  >
                                    <UserCheck className="h-4 w-4 mr-1" />
                                    Accept
                                  </Button>
                                </>
                              )}
                              {request.status === "approved" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCancel(request)}
                                  className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                                >
                                  <UserMinus className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
                      <p className="text-gray-600">
                        {activeTab === "all" ? "No distributor requests available" : `No ${activeTab} requests found`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {filteredRequests.length > 0 && (
            <Card className="shadow-sm border-gray-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredRequests.length)} of{" "}
                    {filteredRequests.length} results
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Request Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-white min-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-orange-600" />
                  {selectedRequest.distributorName} - Partnership Request
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Detailed information about the distributor and their business performance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Request Details and Business Overview side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Request Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{selectedRequest.brandName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        {getStatusBadge(selectedRequest.status)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Requested On:</span>
                        <span className="font-medium">{formatDate(selectedRequest.requestedOn)}</span>
                      </div>
                   
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coverage Area:</span>
                        <span className="font-medium">{selectedRequest.coverageArea}</span>
                      </div>
                      {selectedRequest.status === "rejected" && selectedRequest.rejectionReason && (
                        <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-red-800 text-sm font-medium mb-1">Rejection Reason:</p>
                          <p className="text-red-700 text-sm">{selectedRequest.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Business Overview
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <p className="text-gray-600 mb-1">PAN Number:</p>
                        <p className="font-medium flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          {selectedRequest.distributorProfile.panNumber}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-600 mb-1">VAT Number:</p>
                        <p className="font-medium flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {selectedRequest.distributorProfile.vatNumber}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-600 mb-1">Total Retailers in ARM Network:</p>
                        <p className="font-medium">{selectedRequest.distributorProfile.marketReach}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Contact Information */}
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Business Name:</p>
                      <p className="font-medium">{selectedRequest.distributorProfile.businessName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Owner Name:</p>
                      <p className="font-medium">{selectedRequest.distributorProfile.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Phone:</p>
                      <p className="font-medium flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {selectedRequest.distributorProfile.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Email:</p>
                      <p className="font-medium flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {selectedRequest.distributorProfile.email}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-600 mb-1">Address:</p>
                      <p className="font-medium">{selectedRequest.distributorProfile.address}</p>
                    </div>
                  </div>
                </Card>

                {/* Delivery Zones & Coverage */}
        <Card className="p-4">
  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
    <Building2 className="h-4 w-4" />
    Delivery Zones & Coverage
  </h3>
  <ScrollArea className="h-48 rounded-md border bg-gray-50 px-4 py-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-800">
      <p>Pokhara Metropolitan - Ward 1</p>
      <p>Pokhara Metropolitan - Ward 2</p>
      <p>Pokhara Metropolitan - Ward 3</p>
      <p>Pokhara Metropolitan - Ward 4</p>
      <p>Pokhara Metropolitan - Ward 5</p>
      <p>Pokhara Metropolitan - Ward 6</p>
      <p>Pokhara Metropolitan - Ward 7</p>
      <p>Pokhara Metropolitan - Ward 8</p>
      <p>Lekhnath - Ward 9</p>
      <p>Hemja</p>
      <p>Majhthana</p>
      <p>Dhampus</p>
      <p>Lumle</p>
      <p>Ghandruk</p>
      <p>Begnas Area</p>
      <p>Sarangkot</p>
      <p>Naudanda</p>
      <p>Kahun Hill Area</p>
        <p>Hemja</p>
      <p>Majhthana</p>
      <p>Dhampus</p>
      <p>Lumle</p>
      <p>Ghandruk</p>
      <p>Begnas Area</p>
      <p>Sarangkot</p>
      <p>Naudanda</p>
      <p>Kahun Hill Area</p>
    </div>
  </ScrollArea>
</Card>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  onClick={() => setShowDetailsDialog(false)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  Close
                </Button>
                {selectedRequest.status === "approved" && (
                  <Button
                    onClick={() => handleCancel(selectedRequest)}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Cancel Partnership
                  </Button>
                )}
                {selectedRequest.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleReject(selectedRequest)}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedRequest)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Approve Partnership
                    </Button>
                  </>
                )}
                {selectedRequest.status === "rejected" && (
                  <>
                    <Button
                      onClick={() => handleApprove(selectedRequest)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Accept Partnership
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <AlertDialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-green-600 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Approve Partnership
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to approve the partnership request from{" "}
              <span className="font-semibold text-gray-900">{selectedRequest?.distributorName}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmApproval}
              className="bg-green-500 hover:bg-green-600 text-white font-medium"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Partnership
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rejection Dialog */}
      <AlertDialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Reject Partnership
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Please provide a reason for rejecting the partnership request from{" "}
              <span className="font-semibold text-gray-900">{selectedRequest?.distributorName}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Please explain why this partnership request is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={4}
              required
            />
          </div>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRejection}
              disabled={!rejectionReason.trim()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Partnership Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <UserMinus className="h-5 w-5" />
              Cancel Partnership
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Please provide a reason for cancelling the partnership with{" "}
              <span className="font-semibold text-gray-900">{selectedRequest?.distributorName}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Please explain why this partnership is being cancelled..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={4}
              required
            />
          </div>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              disabled={!cancelReason.trim()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserMinus className="h-4 w-4 mr-2" />
              Cancel Partnership
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
