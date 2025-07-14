"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
  Edit3,
  Save,
  X,
  Download,
  Printer,
  MessageSquare,
  History,
  ChevronDown,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

// Mock order data
const mockOrderDetail = {
  orderId: "MFG-ORD-001",
  status: "pending",
  paymentStatus: "unpaid",
  orderDate: "2024-01-15T10:30:00Z",
  expectedDelivery: "2024-01-25",
  confirmedDate: null,
  shippedDate: null,
  deliveredDate: null,

  // Distributor Information
  distributor: {
    id: "DIST-001",
    name: "Ram Kumar Distributors",
    businessName: "Ram Kumar Distributors Pvt. Ltd.",
    ownerName: "Ram Kumar Sharma",
    phone: "+977-9841234567",
    email: "ram@rkdistributors.com",
    address: "Thamel, Kathmandu 44600, Bagmati Province",
    panNumber: "301234567",
    vatNumber: "600123456",
  },

  // Product Information
  product: {
    brandName: "Wai Wai Noodles",
    productName: "Wai Wai Noodles - Chicken Flavor 75g Pack (Carton of 48)",
    productImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
    sku: "WWN-CHK-75G-48",
    quantity: 100,
    unitPrice: 1200,
    totalPrice: 120000,
    packingDetails: "48 units per carton, 100 cartons total = 4,800 individual packs",
  },

  // Delivery Information
  delivery: {
    address: "Thamel, Kathmandu 44600, Bagmati Province",
    instructions: "Please deliver during business hours (9 AM - 6 PM). Contact before delivery.",
    estimatedDelivery: "2024-01-25",
  },

  // Order Timeline
  timeline: [
    {
      status: "Order Placed",
      date: "2024-01-15T10:30:00Z",
      description: "Order placed by distributor",
      completed: true,
    },
    {
      status: "Pending Review",
      date: null,
      description: "Awaiting manufacturer confirmation",
      completed: false,
      current: true,
    },
    {
      status: "Processing",
      date: null,
      description: "Order confirmed and in production",
      completed: false,
    },
    {
      status: "Packaged",
      date: null,
      description: "Order packaged and ready for shipment",
      completed: false,
    },
    {
      status: "Shipped",
      date: null,
      description: "Order dispatched for delivery",
      completed: false,
    },
    {
      status: "Delivered",
      date: null,
      description: "Order delivered to distributor",
      completed: false,
    },
  ],

  // Internal Notes
  notes: [
    {
      id: "1",
      author: "Chandan Kumar",
      date: "2024-01-15T11:00:00Z",
      content: "Large order from reliable distributor. Priority processing recommended.",
    },
  ],
}

export default function ManufacturerOrderDetail() {
  const [order] = useState(mockOrderDetail)
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState(order.notes)
  const [showStatusUpdateDialog, setShowStatusUpdateDialog] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState<{ type: "order" | "payment"; value: string } | null>(null)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
      processing: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Package },
      packaged: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Package },
      shipped: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
      rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    const IconComponent = config.icon
    return (
      <Badge className={`${config.color} border font-medium px-3 py-1 text-sm flex items-center gap-2`}>
        <IconComponent className="h-4 w-4" />
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
      <Badge className={`${config.color} border font-medium px-3 py-1 text-sm flex items-center gap-2`}>
        <IconComponent className="h-4 w-4" />
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return `रू ${amount.toLocaleString()}`
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

  const handleConfirmOrder = () => {
    setOrderStatus("processing")
    setShowConfirmDialog(false)
    // TODO: API call to confirm order
  }

  const handleRejectOrder = () => {
    if (rejectionReason.trim()) {
      setOrderStatus("rejected")
      setShowRejectDialog(false)
      setRejectionReason("")
      // TODO: API call to reject order
    }
  }

  const handleStatusSelect = (type: "order" | "payment", value: string) => {
    setStatusUpdate({ type, value })
    setShowStatusUpdateDialog(true)
  }

  const confirmStatusUpdate = () => {
    if (!statusUpdate) return
    if (statusUpdate.type === "order") {
      setOrderStatus(statusUpdate.value)
    } else {
      setPaymentStatus(statusUpdate.value)
    }
    setShowStatusUpdateDialog(false)
    setStatusUpdate(null)
    // TODO: API call to update status
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now().toString(),
        author: "Chandan Kumar",
        date: new Date().toISOString(),
        content: newNote.trim(),
      }
      setNotes([...notes, note])
      setNewNote("")
      setIsEditingNotes(false)
    }
  }

  const goBack = () => {
    router.push('/orders')
  }

  const orderStatusOptions = {
    processing: ["packaged", "shipped", "cancelled"],
    packaged: ["shipped", "cancelled"],
    shipped: ["delivered"],
    rejected: ["pending", "processing"],
  }

  const router = useRouter();
  return (
    <>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6 shadow-sm">
        {/* Breadcrumb */}
        <div className="flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/manufacturer/dashboard"
                  className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/manufacturer/orders"
                  className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
                >
                  Orders
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 font-semibold">{order.orderId}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 w-full min-w-0 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goBack}
                  className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Order {order.orderId}</h1>
                  <p className="text-gray-600 mt-1">
                    Placed on {formatDate(order.orderDate)} by {order.distributor.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            {/* Status and Actions */}
            <Card className="shadow-sm border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Order Status</p>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(orderStatus)}
                          {orderStatus !== "pending" && orderStatus !== "delivered" && orderStatus !== "cancelled" && (
                            <Select onValueChange={(value) => handleStatusSelect("order", value)} value="">
                              <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="Update..." />
                              </SelectTrigger>
                              <SelectContent>
                                {(orderStatusOptions[orderStatus as keyof typeof orderStatusOptions] || []).map(
                                  (status) => (
                                    <SelectItem key={status} value={status}>
                                      Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Payment Status</p>
                        <div className="flex items-center gap-2">
                          {getPaymentStatusBadge(paymentStatus)}
                          <Select onValueChange={(value) => handleStatusSelect("payment", value)} value="">
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue placeholder="Update..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="paid">Mark as Paid</SelectItem>
                              <SelectItem value="unpaid">Mark as Unpaid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Total Amount</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(order.product.totalPrice)}</p>
                      </div>
                    </div>
                  </div>
                  {orderStatus === "pending" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setShowRejectDialog(true)}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Order
                      </Button>
                      <Button
                        onClick={() => setShowConfirmDialog(true)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm Order
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Product Information */}
                <Card className="shadow-sm border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-orange-600" />
                      Product Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={order.product.productImage || "/placeholder.svg"}
                        alt={order.product.productName}
                        className="w-24 h-24 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-orange-600 mb-1">{order.product.brandName}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{order.product.productName}</h3>
                        <div className="text-sm text-gray-600 mb-3">SKU: {order.product.sku}</div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Quantity:</span>
                            <span className="font-semibold text-gray-900 ml-2">{order.product.quantity} cartons</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Unit Price:</span>
                            <span className="font-semibold text-gray-900 ml-2">
                              {formatCurrency(order.product.unitPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Packing Details</p>
                      <p className="text-sm text-gray-700">{order.product.packingDetails}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-orange-600">{formatCurrency(order.product.totalPrice)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Timeline */}
                <Card className="shadow-sm border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-orange-600" />
                      Order Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.timeline.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              step.completed
                                ? "bg-green-100 text-green-600"
                                : step.current
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : step.current ? (
                              <Clock className="h-4 w-4" />
                            ) : (
                              <div className="w-2 h-2 bg-current rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`text-sm font-medium ${
                                step.completed || step.current ? "text-gray-900" : "text-gray-500"
                              }`}
                            >
                              {step.status}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                            {step.date && <p className="text-xs text-gray-500 mt-1">{formatDate(step.date)}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Delivery Information */}
                <Card className="shadow-sm border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-orange-600" />
                      Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Delivery Address</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{order.delivery.address}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Special Instructions</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{order.delivery.instructions}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Distributor Information */}
                <Card className="shadow-sm border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-orange-600" />
                      Distributor Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Business Name</p>
                      <p className="text-sm text-gray-900">{order.distributor.businessName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Owner</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-900">{order.distributor.ownerName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Contact</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-900">{order.distributor.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-900">{order.distributor.email}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-900">{order.distributor.address}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">PAN:</p>
                        <p className="font-medium text-gray-900">{order.distributor.panNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">VAT:</p>
                        <p className="font-medium text-gray-900">{order.distributor.vatNumber}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Internal Notes */}
                {/* <Card className="shadow-sm border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-orange-600" />
                        Internal Notes
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingNotes(true)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Add Note
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-gray-900">{note.author}</p>
                          <p className="text-xs text-gray-500">{formatDate(note.date)}</p>
                        </div>
                        <p className="text-sm text-gray-700">{note.content}</p>
                      </div>
                    ))}
                    {isEditingNotes && (
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Add your note here..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleAddNote}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save Note
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setIsEditingNotes(false)
                              setNewNote("")
                            }}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Order Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-green-600 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Confirm Order
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to confirm order{" "}
              <span className="font-semibold text-gray-900">{order.orderId}</span>? This will move the order to
              processing status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmOrder}
              className="bg-green-500 hover:bg-green-600 text-white font-medium"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Order Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Reject Order
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please provide a reason for rejecting order{" "}
              <span className="font-semibold text-gray-900">{order.orderId}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Rejection Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Please explain why this order is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={4}
              required
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectOrder}
              disabled={!rejectionReason.trim()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Confirmation Dialog */}
      <AlertDialog open={showStatusUpdateDialog} onOpenChange={setShowStatusUpdateDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-orange-600 flex items-center gap-2">
              <ChevronDown className="h-5 w-5" />
              Confirm Status Change
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to update the {statusUpdate?.type} status to{" "}
              <span className="font-semibold text-gray-900">{statusUpdate?.value}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              onClick={() => setShowStatusUpdateDialog(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
