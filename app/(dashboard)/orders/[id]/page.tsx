"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
  Edit3,
  Save,
  X,
  FileText,
  History,
  Copy,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

// Mock order data
const mockOrderDetail = {
  orderId: "MFG-ORD-001",
  builderId: "BLD-2024-0156",
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
}

export default function ManufacturerOrderDetail() {
  const [order] = useState(mockOrderDetail)
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showFailedDialog, setShowFailedDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [failureReason, setFailureReason] = useState("")
  const [cancellationReason, setCancellationReason] = useState("")
  const [isEditingQuantity, setIsEditingQuantity] = useState(false)
  const [editedQuantity, setEditedQuantity] = useState(order.product.quantity)
  const [originalQuantity] = useState(order.product.quantity)
  const [quantityEdited, setQuantityEdited] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const router = useRouter()

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
      processing: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Package },
      packaged: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: Package },
      shipped: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: Truck },
      delivered: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
      rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
      failed: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
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
      refunded: { color: "bg-white text-black border-gray-200", icon: RefreshCcw },
    }

    const config = statusConfig[paymentStatus as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: Clock,
    }
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
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }
  const handleStatusUpdate = (newStatus: string) => {
    if (newStatus === "rejected") {
      setShowRejectDialog(true)
    } else if (newStatus === "failed") {
      setShowFailedDialog(true)
    } else if (newStatus === "cancelled") {
      setShowCancelDialog(true)
    } else {
      setOrderStatus(newStatus)
      // TODO: API call to update status
    }
  }

  const handlePaymentStatusUpdate = (newStatus: string) => {
    setPaymentStatus(newStatus)
    // TODO: API call to update payment status
  }

  const handleRejectOrder = () => {
    if (rejectionReason.trim()) {
      setOrderStatus("rejected")
      setShowRejectDialog(false)
      setRejectionReason("")
      // TODO: API call to reject order
    }
  }

  const handleFailOrder = () => {
    if (failureReason.trim()) {
      setOrderStatus("failed")
      setShowFailedDialog(false)
      setFailureReason("")
      // TODO: API call to mark order as failed
    }
  }

  const handleCancelOrder = () => {
    if (cancellationReason.trim()) {
      setOrderStatus("cancelled")
      setShowCancelDialog(false)
      setCancellationReason("")
      // TODO: API call to cancel order
    }
  }

  const handleQuantityEdit = () => {
    if (editedQuantity !== originalQuantity) {
      setQuantityEdited(true)
    }
    setIsEditingQuantity(false)
    // TODO: API call to update quantity
  }

  const handleDeliverySlip = () => {
    // Create the delivery slip HTML content
    const deliverySlipHTML = `
    <!DOCTYPE html>
    <html>
    <head>
 
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .info-section { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .info-block h3 { margin-bottom: 10px; font-size: 16px; }
        .info-block p { margin: 3px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #000; padding: 10px; text-align: left; }
        th { background-color: #f5f5f5; }
        .total { text-align: right; font-size: 18px; font-weight: bold; margin: 20px 0; }
        .signatures { display: flex; justify-content: space-between; margin-top: 50px; }
        .signature-box { text-align: center; width: 45%; }
        .signature-line { border-bottom: 1px solid #000; height: 50px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; padding-top: 15px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>DELIVERY SLIP: #${order.orderId}</h1>
        <p>Wai Wai Manufacturing</p>
        <p>Industrial Area, Kathmandu, Nepal | Phone: +977-1-4567890</p>
      </div>
      
      <div class="info-section">
        <div class="info-block">
          <h3>Deliver To:</h3>
          <p><strong>${order.distributor.businessName}</strong></p>
          <p>${order.distributor.ownerName}</p>
          <p>${order.distributor.address}</p>
          <p>${order.distributor.phone}</p>
          <p>${order.distributor.email}</p>
        </div>
        
        <div class="info-block">
          <h3>Order Details:</h3>
          <p><strong>Builder ID:</strong> ${order.builderId}</p>
          <p><strong>Order Date:</strong> ${formatDate(order.orderDate)}</p>
          <p><strong>VAT Number:</strong> ${order.distributor.vatNumber}</p>
        </div>
      </div>
      
      <h3>Product Details:</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${order.product.productName}</strong><br>
              <small>${order.product.brandName}</small>
            </td>
            <td>${order.product.sku}</td>
            <td>${editedQuantity} cartons</td>
            <td>${formatCurrency(order.product.unitPrice)}</td>
            <td><strong>${formatCurrency(totalPrice)}</strong></td>
          </tr>
              <tr>
            <td>
              <strong>${order.product.productName}</strong><br>
              <small>${order.product.brandName}</small>
            </td>
            <td>${order.product.sku}</td>
            <td>${editedQuantity} cartons</td>
            <td>${formatCurrency(order.product.unitPrice)}</td>
            <td><strong>${formatCurrency(totalPrice)}</strong></td>
          </tr>
          
        </tbody>
      </table>
      
      <div class="total">
        Total Amount: ${formatCurrency(totalPrice)}
      </div>
      
      <div class="signatures">
        <div class="signature-box">
          <h4>Authorized Signature</h4>
          <div class="signature-line"></div>
          <p>Manufacturer Representative</p>
        </div>
        
        <div class="signature-box">
          <h4>Received By</h4>
          <div class="signature-line"></div>
          <p>Distributor Representative</p>
        </div>
      </div>
      
      <div class="footer">
     
        <p><strong>Powered by ArmRetail</strong></p>
      </div>
    </body>
    </html>
  `

    // Create a new window and write the content
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(deliverySlipHTML)
      printWindow.document.close()

      // Wait for the content to load, then print
      printWindow.onload = () => {
        printWindow.print()
        printWindow.close()
      }
    }
  }

  const printDeliverySlip = () => {
    window.print()
  }

  const goBack = () => {
    router.push("/orders")
  }

  const orderStatusOptions = {
    pending: ["processing", "rejected", "cancelled"],
    processing: ["packaged", "failed", "cancelled"],
    packaged: ["shipped", "failed", "cancelled"],
    shipped: ["delivered", "failed"],
    rejected: ["pending", "processing"],
    failed: ["processing", "packaged"],
    cancelled: ["pending", "processing"],
  }

  const paymentStatusOptions = ["paid", "unpaid", "refunded"]

  const totalPrice = editedQuantity * order.product.unitPrice

  return (
    <>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-4 justify-between border-b bg-white px-6 shadow-sm">
        <div className="flex flex-row -ml-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order {order.orderId}</h1>
            <p className="text-sm text-gray-600">Builder ID: {order.builderId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleDeliverySlip}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            <FileText className="h-4 w-4 mr-2" />
            Delivery Slip
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 w-full min-w-0 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div></div>
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
                          <Select onValueChange={handleStatusUpdate} value="">
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
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Payment Status</p>
                        <div className="flex items-center gap-2">
                          {getPaymentStatusBadge(paymentStatus)}
                          <Select onValueChange={handlePaymentStatusUpdate} value="">
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue placeholder="Update..." />
                            </SelectTrigger>
                            <SelectContent>
                              {paymentStatusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Total Amount</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(totalPrice)}</p>
                      </div>
                    </div>
                  </div>
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
                        <div className="text-sm text-gray-600 mb-3">SKU: {order.product.sku}
                             <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-4 w-4 ml-2"
                                                            onClick={() => copyToClipboard(order.orderId, `sku-${order.orderId}`)}
                                                          >
                                                            <span className="sr-only">Copy SKU</span>
                                                            {copiedId === `sku-${order.orderId}` ? (
                                                              <CheckCircle className="h-3 w-3 text-green-500" />
                                                            ) : (
                                                              <Copy className="h-3 w-3" />
                                                            )}
                                                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex flex-row items-center gap-2">
                            <span className="text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2 mt-1">
                              {isEditingQuantity ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    value={editedQuantity}
                                    onChange={(e) => setEditedQuantity(Number.parseInt(e.target.value) || 0)}
                                    className="w-20 h-8 text-sm"
                                    min="1"
                                  />
                                  <Button size="sm" onClick={handleQuantityEdit} className="h-8 px-2">
                                    <Save className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setIsEditingQuantity(false)
                                      setEditedQuantity(order.product.quantity)
                                    }}
                                    className="h-8 px-2"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900">{editedQuantity} cartons</span>
                                  {quantityEdited && (
                                    <Badge variant="secondary" className="text-xs">
                                      Edited
                                    </Badge>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setIsEditingQuantity(true)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
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
                   
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-orange-600">{formatCurrency(totalPrice)}</span>
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
                            ) : (
                              <Clock className="h-4 w-4" />
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
                        <MapPin className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
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
                        <User className="h-4 w-4 text-orange-600" />
                        <p className="text-sm text-gray-900">{order.distributor.ownerName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Contact</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-orange-600" />
                          <p className="text-sm text-gray-900">{order.distributor.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-orange-600" />
                          <p className="text-sm text-gray-900">{order.distributor.email}</p>
                        </div>
                      </div>
                    </div>
                  
                    <Separator />
                    <div>
                      <p className="text-gray-600 text-sm">VAT Number:</p>
                      <p className="font-medium text-orange-600">{order.distributor.vatNumber}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Failed Order Dialog */}
      <Dialog open={showFailedDialog} onOpenChange={setShowFailedDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Mark Order as Failed
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please provide a reason for marking order{" "}
              <span className="font-semibold text-gray-900">{order.orderId}</span> as failed.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Failure Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Please explain why this order failed..."
              value={failureReason}
              onChange={(e) => setFailureReason(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={4}
              required
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFailedDialog(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleFailOrder}
              disabled={!failureReason.trim()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Mark as Failed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Cancel Order
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please provide a reason for cancelling order{" "}
              <span className="font-semibold text-gray-900">{order.orderId}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Cancellation Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Please explain why this order is being cancelled..."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={4}
              required
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCancelOrder}
              disabled={!cancellationReason.trim()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
