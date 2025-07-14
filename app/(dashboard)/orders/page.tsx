"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Phone,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Mail,
  Plus,
  Search,
  ShoppingCart,
  AlertTriangle,
  IdCard 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock order data (same as before)
const mockOrderData = [
  {
    distributorId: "DIST-001",
    distributorName: "Ram Kumar Distributors",
    ownerName: "Ram Kumar Sharma",
    phone: "+977-9841234567",
    email: "ram@rkdistributors.com",
    address: "Thamel, Kathmandu 44600, Bagmati Province",
    panNo: "123456789",
    orders: [
      {
        orderId: "MFG-ORD-001",
        brandName: "Wai Wai Noodles",
        productName: "Wai Wai Noodles - Chicken Flavor 75g Pack (Carton of 48)",
        productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
        quantity: 100,
        unitPrice: 1200,
        totalPrice: 120000,
        status: "pending",
        paymentStatus: "unpaid",
        orderDate: "2024-01-15",
        expectedDelivery: "2024-01-25",
      },
      {
        orderId: "MFG-ORD-002",
        brandName: "Chau Chau Noodles",
        productName: "Chau Chau Noodles - Masala Flavor 70g Pack (Carton of 48)",
        productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
        quantity: 75,
        unitPrice: 1100,
        totalPrice: 82500,
        status: "processing",
        paymentStatus: "paid",
        orderDate: "2024-01-14",
        expectedDelivery: "2024-01-24",
      },
    ],
  },
  {
    distributorId: "DIST-002",
    distributorName: "Himalayan Trade House",
    ownerName: "Sita Gurung",
    phone: "+977-9856789012",
    email: "sita@himalayantrade.com",
    address: "Lakeside, Pokhara 33700, Gandaki Province",
    panNo: "987654321",
    orders: [
      {
        orderId: "MFG-ORD-003",
        brandName: "Wai Wai Noodles",
        productName: "Wai Wai Noodles - Vegetable Flavor 75g Pack (Carton of 48)",
        productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
        quantity: 60,
        unitPrice: 1200,
        totalPrice: 72000,
        status: "packaged",
        paymentStatus: "paid",
        orderDate: "2024-01-12",
        expectedDelivery: "2024-01-22",
      },
      {
        orderId: "MFG-ORD-004",
        brandName: "Chau Chau Noodles",
        productName: "Chau Chau Noodles - Chicken Flavor 70g Pack (Carton of 48)",
        productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
        quantity: 80,
        unitPrice: 1100,
        totalPrice: 88000,
        status: "shipped",
        paymentStatus: "paid",
        orderDate: "2024-01-10",
        expectedDelivery: "2024-01-20",
      },
    ],
  },
  {
    distributorId: "DIST-003",
    distributorName: "Eastern Nepal Suppliers",
    ownerName: "Rajesh Yadav",
    phone: "+977-9812345678",
    email: "rajesh@easternsuppliers.com",
    address: "Traffic Chowk, Biratnagar 56613, Province 1",
    panNo: "456789123",
    orders: [
      {
        orderId: "MFG-ORD-005",
        brandName: "Wai Wai Noodles",
        productName: "Wai Wai Noodles - Chicken Flavor 75g Pack (Carton of 48)",
        productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
        quantity: 150,
        unitPrice: 1200,
        totalPrice: 180000,
        status: "delivered",
        paymentStatus: "paid",
        orderDate: "2024-01-08",
        expectedDelivery: "2024-01-18",
      },
    ],
  },
  {
    distributorId: "DIST-004",
    distributorName: "Valley Fresh Distributors",
    ownerName: "Prakash Shrestha",
    phone: "+977-9823456789",
    email: "prakash@valleyfresh.com",
    address: "Patan Dhoka, Lalitpur 44700, Bagmati Province",
    panNo: "789123456",
    orders: [
      {
        orderId: "MFG-ORD-006",
        brandName: "Chau Chau Noodles",
        productName: "Chau Chau Noodles - Masala Flavor 70g Pack (Carton of 48)",
        productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
        quantity: 90,
        unitPrice: 1100,
        totalPrice: 99000,
        status: "cancelled",
        paymentStatus: "unpaid",
        orderDate: "2024-01-05",
        expectedDelivery: "2024-01-15",
      },
      {
        orderId: "MFG-ORD-007",
        brandName: "Wai Wai Noodles",
        productName: "Wai Wai Noodles - Vegetable Flavor 75g Pack (Carton of 48)",
        productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
        quantity: 120,
        unitPrice: 1200,
        totalPrice: 144000,
        status: "failed",
        paymentStatus: "unpaid",
        orderDate: "2024-01-16",
        expectedDelivery: "2024-01-26",
      },
    ],
  },
]

const statusTabs = [
  { key: "all", label: "All", icon: Package },
  { key: "pending", label: "Pending", icon: Clock },
  { key: "processing", label: "Processing", icon: Package },
  { key: "packaged", label: "Packaged", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
  { key: "cancelled", label: "Cancelled", icon: XCircle },
  { key: "failed", label: "Failed", icon: AlertCircle },
]

// Mock distributors for autocomplete
const mockDistributors = mockOrderData.map((dist) => ({
  id: dist.distributorId,
  name: dist.distributorName,
  owner: dist.ownerName,
  phone: dist.phone,
  email: dist.email,
  address: dist.address,
  panNo: dist.panNo,
}))

// Mock addresses for autocomplete
const mockAddresses = [
  "Thamel, Kathmandu 44600, Bagmati Province",
  "Lakeside, Pokhara 33700, Gandaki Province",
  "Traffic Chowk, Biratnagar 56613, Province 1",
  "Patan Dhoka, Lalitpur 44700, Bagmati Province",
  "New Road, Kathmandu 44600, Bagmati Province",
  "Mahendrapool, Pokhara 33700, Gandaki Province",
]

const mockProducts = [
  {
    id: "PROD-001",
    name: "Wai Wai Noodles - Chicken Flavor 75g Pack (Carton of 48)",
    brand: "Wai Wai Noodles",
    price: 1200,
    category: "Instant Noodles",
    stock: 150,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
  },
  {
    id: "PROD-002",
    name: "Chau Chau Noodles - Masala Flavor 70g Pack (Carton of 48)",
    brand: "Chau Chau Noodles",
    price: 1100,
    category: "Instant Noodles",
    stock: 89,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
  },
  {
    id: "PROD-003",
    name: "Wai Wai Noodles - Vegetable Flavor 75g Pack (Carton of 48)",
    brand: "Wai Wai Noodles",
    price: 1200,
    category: "Instant Noodles",
    stock: 75,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
  },
  {
    id: "PROD-004",
    name: "Himalayan Rock Salt Natural 1kg",
    brand: "Himalayan",
    price: 650,
    category: "Spices & Seasonings",
    stock: 45,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
  },
  {
    id: "PROD-005",
    name: "Everest Garam Masala Powder 100g",
    brand: "Everest",
    price: 450,
    category: "Spices & Seasonings",
    stock: 120,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
  },
]

export default function ManufacturerOrders() {
  const [activeTab, setActiveTab] = useState("all")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false)
  const [isProductSelectionOpen, setIsProductSelectionOpen] = useState(false)

  // FILTER STATE
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState<string | null>(null)
  const [dateTo, setDateTo] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  // CREATE ORDER STATE
  const [newOrder, setNewOrder] = useState({
    distributorName: "",
    panNo: "",
    address: "",
    ownerName: "",
    phone: "",
    email: "",
    expectedDelivery: "",
    notes: "",
    products: [] as Array<{ id: string; name: string; brand: string; price: number; quantity: number }>,
  })

  // AUTOCOMPLETE STATE
  const [distributorSuggestions, setDistributorSuggestions] = useState<typeof mockDistributors>([])
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [showDistributorSuggestions, setShowDistributorSuggestions] = useState(false)
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false)
  const [selectedDistributor, setSelectedDistributor] = useState<(typeof mockDistributors)[0] | null>(null)
  const [hasModifiedAutoFilledData, setHasModifiedAutoFilledData] = useState(false)

  // PRODUCT SELECTION STATE
  const [productSearch, setProductSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<Array<{ id: string; quantity: number }>>([])

    // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Check if desktop size
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Flatten data for table rows
  const tableData = useMemo(() => {
    const flatData = []
    for (const distributor of mockOrderData) {
      for (const order of distributor.orders) {
        flatData.push({
          ...order,
          distributorId: distributor.distributorId,
          distributorName: distributor.distributorName,
          ownerName: distributor.ownerName,
          phone: distributor.phone,
          email: distributor.email,
          address: distributor.address,
          panNo: distributor.panNo,
        })
      }
    }
    return flatData
  }, [])

  // Filter orders
  const filteredData = useMemo(() => {
    let data = tableData
    if (activeTab !== "all") {
      data = data.filter((order) => order.status === activeTab)
    }
    if (statusFilter !== "all") {
      data = data.filter((order) => order.status === statusFilter)
    }
    if (paymentStatusFilter !== "all") {
      data = data.filter((order) => order.paymentStatus === paymentStatusFilter)
    }
    if (dateFrom) {
      data = data.filter((order) => order.orderDate >= dateFrom)
    }
    if (dateTo) {
      data = data.filter((order) => order.orderDate <= dateTo)
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase()
      data = data.filter(
        (order) =>
          order.productName.toLowerCase().includes(s) ||
          order.distributorName.toLowerCase().includes(s) ||
          order.orderId.toLowerCase().includes(s) ||
          order.brandName.toLowerCase().includes(s),
      )
    }
    return data
  }, [tableData, activeTab, statusFilter, paymentStatusFilter, dateFrom, dateTo, search])

  // After the filteredData useMemo, add this new useMemo to group and sort data by distributor:

  const groupedFilteredData = useMemo(() => {
    // Sort by distributor name first, then by order date
    const sortedData = [...filteredData].sort((a, b) => {
      if (a.distributorName !== b.distributorName) {
        return a.distributorName.localeCompare(b.distributorName)
      }
      return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
    })

    // Mark first occurrence of each distributor
    const groupedData = sortedData.map((order, index) => {
      const isFirstForDistributor = index === 0 || sortedData[index - 1].distributorName !== order.distributorName
      return {
        ...order,
        showDistributorInfo: isFirstForDistributor,
      }
    })

    return groupedData
  }, [filteredData])

   // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return groupedFilteredData.slice(startIndex, endIndex)
  }, [groupedFilteredData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(groupedFilteredData.length / itemsPerPage)
  const totalItems = groupedFilteredData.length


  // Filter products for selection
  const filteredProducts = useMemo(() => {
    let products = mockProducts
    if (categoryFilter !== "all") {
      products = products.filter((p) => p.category === categoryFilter)
    }
    if (productSearch.trim()) {
      const s = productSearch.trim().toLowerCase()
      products = products.filter((p) => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s))
    }
    return products
  }, [productSearch, categoryFilter])

  // Handle distributor name input
  const handleDistributorNameChange = (value: string) => {
    setNewOrder({ ...newOrder, distributorName: value })

    if (value.trim()) {
      const suggestions = mockDistributors.filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
      setDistributorSuggestions(suggestions)
      setShowDistributorSuggestions(true)
    } else {
      setShowDistributorSuggestions(false)
    }

    // Check if user modified auto-filled data
    if (selectedDistributor && value !== selectedDistributor.name) {
      setHasModifiedAutoFilledData(true)
    }
  }

  // Handle address input
  const handleAddressChange = (value: string) => {
    setNewOrder({ ...newOrder, address: value })

    if (value.trim()) {
      const suggestions = mockAddresses.filter((addr) => addr.toLowerCase().includes(value.toLowerCase()))
      setAddressSuggestions(suggestions)
      setShowAddressSuggestions(true)
    } else {
      setShowAddressSuggestions(false)
    }

    // Check if user modified auto-filled data
    if (selectedDistributor && value !== selectedDistributor.address) {
      setHasModifiedAutoFilledData(true)
    }
  }

  // Select distributor from suggestions
  const selectDistributor = (distributor: (typeof mockDistributors)[0]) => {
    setSelectedDistributor(distributor)
    setNewOrder({
      ...newOrder,
      distributorName: distributor.name,
      panNo: distributor.panNo,
      address: distributor.address,
      ownerName: distributor.owner,
      phone: distributor.phone,
      email: distributor.email,
    })
    setShowDistributorSuggestions(false)
    setHasModifiedAutoFilledData(false)
  }

  // Handle other field changes
  const handleFieldChange = (field: string, value: string) => {
    setNewOrder({ ...newOrder, [field]: value })

    // Check if user modified auto-filled data
    if (selectedDistributor) {
      const originalValue = selectedDistributor[field as keyof typeof selectedDistributor]
      if (originalValue && value !== originalValue) {
        setHasModifiedAutoFilledData(true)
      }
    }
  }

  // Handle product selection
  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === productId)
      if (existing) {
        return prev.filter((p) => p.id !== productId)
      } else {
        return [...prev, { id: productId, quantity: 1 }]
      }
    })
  }

  const handleProductQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity } : p)))
  }

  // Confirm product selection
  const confirmProductSelection = () => {
    const products = selectedProducts.map((sp) => {
      const product = mockProducts.find((p) => p.id === sp.id)!
      return {
        id: sp.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        quantity: sp.quantity,
      }
    })
    setNewOrder({ ...newOrder, products })
    setIsProductSelectionOpen(false)
  }

  // Calculate total
  const orderTotal = newOrder.products.reduce((sum, product) => sum + product.price * product.quantity, 0) 

  useEffect(() => {
    if (isDesktop) {
      const timer = setTimeout(() => setShowScrollHint(false), 8000)
      return () => clearTimeout(timer)
    } else {
      setShowScrollHint(false)
    }
  }, [isDesktop])

  // Status badges (same as before)
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
      processing: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Package },
      packaged: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Package },
      shipped: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
      failed: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    const IconComponent = config.icon
    return (
      <Badge className={`${config.color} border font-medium px-2 py-1 text-xs flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const statusConfig = {
      paid: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      unpaid: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
    }
    const config = statusConfig[paymentStatus as keyof typeof statusConfig]
    const IconComponent = config.icon
    return (
      <Badge className={`${config.color} border font-medium px-2 py-1 text-xs flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return `रू ${amount.toLocaleString()}`
  }

  const openOrderDetails = (orderId: string) => {
    window.open(`/orders/${orderId}`, "_blank")
  }

  const getTabCount = (tabKey: string) => {
    if (tabKey === "all") {
      return tableData.length
    }
    return tableData.filter((order) => order.status === tabKey).length
  }

  const handleCreateOrder = () => {
    if (hasModifiedAutoFilledData) {
      return // Don't create order if auto-filled data was modified
    }

    // TODO: Implement order creation logic
    console.log("Creating order:", newOrder)
    setIsCreateOrderOpen(false)
    resetOrderForm()
  }

  const resetOrderForm = () => {
    setNewOrder({
      distributorName: "",
      panNo: "",
      address: "",
      ownerName: "",
      phone: "",
      email: "",
      expectedDelivery: "",
      notes: "",
      products: [],
    })
    setSelectedDistributor(null)
    setHasModifiedAutoFilledData(false)
    setSelectedProducts([])
  }

  const categories = [...new Set(mockProducts.map((p) => p.category))]

  return (
    <div className="flex-1 bg-gray-50 w-full min-w-0 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Distributor Orders</h1>
              <p className="text-gray-600 mt-1">Manage and track all orders from your distributor partners</p>
            </div>
            <Dialog open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Order</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Warning Message */}
                  {hasModifiedAutoFilledData && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        You have modified auto-filled distributor information. Please revert changes or create a new
                        distributor entry to proceed.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Distributor Name with Autocomplete */}
                  <div className="relative">
                    <Label htmlFor="distributor-name">Distributor Name *</Label>
                    <Input
                      id="distributor-name"
                      value={newOrder.distributorName}
                      onChange={(e) => handleDistributorNameChange(e.target.value)}
                      placeholder="Type distributor name..."
                      className="mt-1"
                    />
                    {showDistributorSuggestions && distributorSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {distributorSuggestions.map((dist) => (
                          <button
                            key={dist.id}
                            onClick={() => selectDistributor(dist)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{dist.name}</div>
                            <div className="text-sm text-gray-600">
                              {dist.owner} • {dist.phone}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* PAN Number */}
                  <div>
                    <Label htmlFor="pan-no">PAN Number *</Label>
                    <Input
                      id="pan-no"
                      value={newOrder.panNo}
                      onChange={(e) => handleFieldChange("panNo", e.target.value)}
                      placeholder="Enter PAN number"
                      className="mt-1"
                    />
                  </div>

                  {/* Address with Autocomplete */}
                  <div className="relative">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={newOrder.address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      placeholder="Type address..."
                      className="mt-1"
                    />
                    {showAddressSuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 overflow-y-auto">
                        {addressSuggestions.map((addr, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setNewOrder({ ...newOrder, address: addr })
                              setShowAddressSuggestions(false)
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
                          >
                            {addr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Owner Name */}
                  <div>
                    <Label htmlFor="owner-name">Owner Name *</Label>
                    <Input
                      id="owner-name"
                      value={newOrder.ownerName}
                      onChange={(e) => handleFieldChange("ownerName", e.target.value)}
                      placeholder="Enter owner name"
                      className="mt-1"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={newOrder.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        placeholder="+977-98xxxxxxxx"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newOrder.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        placeholder="email@example.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Order List */}
                  <div>
                    <Label>Order List *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsProductSelectionOpen(true)}
                      className="w-full mt-1 h-12 border-dashed border-2 hover:border-orange-300 hover:bg-orange-50"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {newOrder.products.length > 0
                        ? `${newOrder.products.length} products selected`
                        : "Click to select products"}
                    </Button>

                    {/* Selected Products Preview */}
                    {newOrder.products.length > 0 && (
                      <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
                        {newOrder.products.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                          >
                            <div>
                              <span className="font-medium">{product.name}</span>
                              <span className="text-gray-600 ml-2">x{product.quantity}</span>
                            </div>
                            <span className="font-semibold">{formatCurrency(product.price * product.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expected Delivery */}
                  <div>
                    <Label htmlFor="delivery">Expected Delivery *</Label>
                    <Input
                      id="delivery"
                      type="date"
                      value={newOrder.expectedDelivery}
                      onChange={(e) => setNewOrder({ ...newOrder, expectedDelivery: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any special instructions..."
                      value={newOrder.notes}
                      onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Order Total */}
                  {orderTotal > 0 && (
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-lg font-semibold text-orange-800">
                        Total Amount: {formatCurrency(orderTotal)}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateOrderOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateOrder}
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      disabled={
                        hasModifiedAutoFilledData ||
                        !newOrder.distributorName ||
                        !newOrder.panNo ||
                        !newOrder.address ||
                        !newOrder.ownerName ||
                        !newOrder.phone ||
                        !newOrder.expectedDelivery ||
                        newOrder.products.length === 0
                      }
                    >
                      Create Order
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Product Selection Dialog */}
          <Dialog open={isProductSelectionOpen} onOpenChange={setIsProductSelectionOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Select Products</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Product List */}
                <div className="max-h-96 overflow-y-auto border rounded-lg">
                  <div className="grid gap-2 p-4">
                    {filteredProducts.map((product) => {
                      const isSelected = selectedProducts.some((p) => p.id === product.id)
                      const selectedProduct = selectedProducts.find((p) => p.id === product.id)

                      return (
                        <div
                          key={product.id}
                          className={`p-3 border rounded-lg ${isSelected ? "border-orange-300 bg-orange-50" : "border-gray-200"}`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleProductToggle(product.id)}
                              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-600">
                                {product.brand} • {formatCurrency(product.price)}
                              </div>
                              <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-2">
                                <Label className="text-sm">Qty:</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  max={product.stock}
                                  value={selectedProduct?.quantity || 1}
                                  onChange={(e) =>
                                    handleProductQuantityChange(product.id, Number.parseInt(e.target.value) || 1)
                                  }
                                  className="w-20 h-8"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Selected Summary */}
                {selectedProducts.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700">
                      Selected: {selectedProducts.length} products
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setIsProductSelectionOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmProductSelection}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    disabled={selectedProducts.length === 0}
                  >
                    Confirm Selection ({selectedProducts.length})
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 items-end bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 mb-2">
            <div className="w-40">
              <Label className="mb-1" htmlFor="status-select">
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full h-9" id="status-select">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusTabs
                    .filter((t) => t.key !== "all")
                    .map((t) => (
                      <SelectItem key={t.key} value={t.key}>
                        {t.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-32">
              <Label className="mb-1" htmlFor="payment-status-select">
                Payment
              </Label>
              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger className="w-full h-9" id="payment-status-select">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Label className="mb-1" htmlFor="date-from">
                Date From
              </Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom || ""}
                onChange={(e) => setDateFrom(e.target.value || null)}
                className="h-9"
              />
            </div>
            <div className="w-40">
              <Label className="mb-1" htmlFor="date-to">
                Date To
              </Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo || ""}
                onChange={(e) => setDateTo(e.target.value || null)}
                className="h-9"
              />
            </div>
            <div className="flex-1 min-w-[180px]">
              <Label className="mb-1" htmlFor="order-search">
                Search
              </Label>
              <Input
                id="order-search"
                type="text"
                placeholder="Product, Distributor, Order ID, Brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9"
              />
            </div>
            <div>
              <Button
                variant="outline"
                className="h-9 mt-1 bg-transparent"
                onClick={() => {
                  setStatusFilter("all")
                  setPaymentStatusFilter("all")
                  setDateFrom(null)
                  setDateTo(null)
                  setSearch("")
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex overflow-x-auto">
              {statusTabs.map((tab) => {
                const IconComponent = tab.icon
                const count = getTabCount(tab.key)
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
                    variant='destructive'
                      className={`ml-1 ${tab.key === 'all' ? 'hidden': 'block'}  text-[12px] font-extrabold text-white !rounded-full py-[-5px] px-[6px]`}
                    >
                      {count}
                    </Badge>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation Instructions */}
          {showScrollHint && isDesktop && filteredData.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-blue-700">
                  <ArrowLeft className="h-4 w-4" />
                  <ArrowRight className="h-4 w-4" />
                  <ZoomIn className="h-4 w-4" />
                  <ZoomOut className="h-4 w-4" />
                </div>
                <div className="text-sm text-blue-700">
                  <strong>Desktop Navigation:</strong> Use{" "}
                  <kbd className="px-2 py-1 bg-blue-100 rounded text-xs font-mono">Shift + ←</kbd> /{" "}
                  <kbd className="px-2 py-1 bg-blue-100 rounded text-xs font-mono">Shift + →</kbd> to scroll
                  horizontally, or use the control buttons.
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowScrollHint(false)}
                  className="ml-auto text-blue-600 hover:text-blue-700"
                >
                  ×
                </Button>
              </div>
            </div>
          )}

          {/* Orders Table */}
          {groupedFilteredData.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600">
                    {activeTab === "all"
                      ? "No orders have been placed yet"
                      : `No orders with status "${activeTab}" found`}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="shadow-sm border-gray-200 bg-white overflow-hidden relative">

           

              <div ref={scrollContainerRef} className="overflow-x-auto">
                <table ref={tableRef} className="w-full min-w-[1000px] transition-transform duration-200">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-80 border-r border-gray-200">
                        Distributor Info
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-[420px] border-r border-gray-200">
                        Product Details
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-40 border-r border-gray-200">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-32 border-r border-gray-200">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-32 border-r border-gray-200">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-32">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {groupedFilteredData.map((order) => (
                      <tr key={order.orderId} className="hover:bg-gray-50">
                        {/* Distributor Info */}
                        <td className="px-6 py-4 align-top border-r border-gray-200">
                          {order.showDistributorInfo ? (
                            <div>
                              <div className="text-sm font-semibold text-gray-900 mb-1">{order.distributorName}</div>
                              <div className="text-xs text-gray-600 mb-1">
                                <span className="font-medium text-orange-600">Owner:</span> {order.ownerName}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <Phone className="h-3 w-3 text-orange-600" />
                                {order.phone}
                              </div>
                               <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <IdCard className="h-3 w-3 text-orange-600" />
                                {order.panNo}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <Mail className="h-3 w-3 text-orange-600" />
                                {order.email}
                              </div>
                              <div className="flex items-start gap-1 text-xs text-gray-600">
                                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0 text-orange-600" />
                                <span className="leading-tight">{order.address}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-4"></div> // Empty space to maintain row height
                          )}
                        </td>

                        {/* Product Details */}
                        <td className="px-6 py-4 border-r border-gray-200">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.productImage || "/placeholder.svg"}
                              alt={order.productName}
                              className="w-12 h-12 rounded object-cover bg-gray-100 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-orange-600 mb-1">{order.brandName}</div>
                              <div className="text-sm font-medium text-gray-900 leading-tight">{order.productName}</div>
                              <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-700">
                                <span>
                                  Qty: <span className="font-semibold text-orange-600">{order.quantity}</span>
                                </span>
                                <span>
                                  Unit:{" "}
                                  <span className="font-semibold text-orange-600">{formatCurrency(order.unitPrice)}</span>
                                </span>
                                <span>
                                  Total:{" "}
                                  <span className="font-semibold text-orange-600">
                                    {formatCurrency(order.totalPrice)}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Order ID */}
                        <td className="px-6 py-4 border-r border-gray-200">
                          <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                          <div className="text-xs text-gray-600 mt-1">
                           <span className="text-orange-600">CretedAt:</span>  {new Date(order.expectedDelivery).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 border-r border-gray-200">{getStatusBadge(order.status)}</td>

                        {/* Payment Status */}
                        <td className="px-6 py-4 border-r border-gray-200">
                          {getPaymentStatusBadge(order.paymentStatus)}
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">
                          {order.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white text-xs h-8 px-3"
                                onClick={() => {
                                  /* TODO: handle confirm */
                                }}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50 h-8 px-3 text-xs bg-transparent"
                                onClick={() => {
                                  /* TODO: handle reject */
                                }}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => openOrderDetails(order.orderId)}
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-white text-xs h-8 px-3"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                            {/* Pagination Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)}{" "}
                    of {totalItems} orders
                  </div>
                
                  
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="h-8 px-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <ChevronLeft className="h-4 w-4 -ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 px-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`h-8 w-8 p-0 ${
                            currentPage === pageNum
                              ? "bg-orange-500 hover:bg-orange-600 text-white"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 px-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-8 px-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4 -ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
