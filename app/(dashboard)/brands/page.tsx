//@ts-nocheck
"use client"
import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Plus,
  Package,
  Search,
  Eye,
  BarChart3,
  Building2,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  X,
  AlertTriangle,
  Pause,
  Info,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

// Mock data for brands with different statuses
const initialMockBrands = [
  {
    id: "BRAND-001",
    name: "Wai Wai Noodles",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop",
    totalSKUs: 12,
    totalDistributors: 8,
    monthlyRevenue: 125000,
    status: "active",
    submittedDate: "2024-01-10",
    approvedDate: "2024-01-15",
    description: "Premium instant noodles with authentic flavors",
  },
  {
    id: "BRAND-002",
    name: "Chau Chau Noodles",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop",
    totalSKUs: 8,
    totalDistributors: 5,
    monthlyRevenue: 85000,
    status: "active",
    submittedDate: "2024-01-05",
    approvedDate: "2024-01-12",
    description: "Traditional taste noodles for every occasion",
  },
  {
    id: "BRAND-003",
    name: "Premium Snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop",
    totalSKUs: 0,
    totalDistributors: 0,
    monthlyRevenue: 0,
    status: "pending",
    submittedDate: "2024-01-20",
    approvedDate: null,
    description: "High-quality snacks for health-conscious consumers",
  },
  {
    id: "BRAND-004",
    name: "Healthy Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop",
    totalSKUs: 0,
    totalDistributors: 0,
    monthlyRevenue: 0,
    status: "pending",
    submittedDate: "2024-01-18",
    approvedDate: null,
    description: "Natural and organic beverage solutions",
  },
  {
    id: "BRAND-005",
    name: "Local Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop",
    totalSKUs: 0,
    totalDistributors: 0,
    monthlyRevenue: 0,
    status: "rejected",
    submittedDate: "2024-01-12",
    rejectedDate: "2024-01-16",
    rejectionReason:
      "Brand documentation incomplete. Please provide proper trademark certificates and quality certifications. Additionally, the product samples did not meet our quality standards for packaging and labeling requirements.",
    description: "Authentic local spices and seasonings",
  },
  {
    id: "BRAND-006",
    name: "Classic Tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop",
    totalSKUs: 6,
    totalDistributors: 3,
    monthlyRevenue: 0,
    status: "inactive",
    submittedDate: "2023-12-01",
    approvedDate: "2023-12-08",
    inactiveDate: "2024-01-25",
    inactiveReason: "Temporarily paused for rebranding and packaging updates",
    description: "Traditional tea blends with modern packaging",
  },
  {
    id: "BRAND-007",
    name: "Mountain Coffee",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop",
    totalSKUs: 4,
    totalDistributors: 2,
    monthlyRevenue: 0,
    status: "inactive",
    submittedDate: "2023-11-15",
    approvedDate: "2023-11-22",
    inactiveDate: "2024-01-10",
    inactiveReason: "Supply chain issues with coffee bean sourcing",
    description: "Premium mountain-grown coffee beans",
  },
]

const statusTabs = [
  { key: "all", label: "All Brands", icon: Building2 },
  { key: "active", label: "Active", icon: CheckCircle },
  { key: "pending", label: "Pending QC", icon: Clock },
  { key: "inactive", label: "Inactive", icon: Pause },
  { key: "rejected", label: "Rejected", icon: XCircle },
]

export default function ManufacturerBrands() {
  const [brands, setBrands] = useState(initialMockBrands) // Brands data now in state
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false) // New state for edit dialog
  const [showInactiveDialog, setShowInactiveDialog] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<typeof brands[0] | null>(null)
  const [newBrand, setNewBrand] = useState({
    name: "",
    description: "", // Added description to newBrand state
    image: null as File | null,
    imagePreview: "",
    documents: [] as File[],
  })
  const router = useRouter()
  const [showActivateDialog, setShowActivateDialog] = useState(false)

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = activeTab === "all" || brand.status === activeTab
    return matchesSearch && matchesStatus
  })

  const getTabCount = (tabKey: string) => {
    if (tabKey === "all") {
      return brands.length
    }
    return brands.filter((brand) => brand.status === tabKey).length
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewBrand({ ...newBrand, image: file, imagePreview: URL.createObjectURL(file) })
    }
  }

  const handleRemoveImage = () => {
    setNewBrand({ ...newBrand, image: null, imagePreview: "" })
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setNewBrand({ ...newBrand, documents: [...newBrand.documents, ...files] })
  }

  const removeDocument = (index: number) => {
    setNewBrand({
      ...newBrand,
      documents: newBrand.documents.filter((_, i) => i !== index),
    })
  }

  const resetNewBrandForm = () => {
    setNewBrand({ name: "", description: "", image: null, imagePreview: "", documents: [] })
    setSelectedBrand(null)
  }

  const handleSubmitBrand = () => {
    if (newBrand.name.trim() && newBrand.description.trim() && newBrand.image && newBrand.documents.length > 0) {
      // TODO: API call to submit brand for approval
      console.log("Submitting brand:", newBrand)
      const newId = `BRAND-${String(brands.length + 1).padStart(3, "0")}`
      const newBrandData = {
        id: newId,
        name: newBrand.name,
        description: newBrand.description,
        image: newBrand.imagePreview, // Use preview URL as the mock image URL
        totalSKUs: 0,
        totalDistributors: 0,
        monthlyRevenue: 0,
        status: "pending" as "pending",
        submittedDate: new Date().toISOString().split("T")[0],
        approvedDate: null,
      }
      setBrands((prevBrands) => [...prevBrands, newBrandData]) // Add new brand to state
      setShowAddDialog(false)
      resetNewBrandForm()
    }
  }

  const handleEditBrand = (brand: typeof brands[0]) => {
    setSelectedBrand(brand)
    setNewBrand({
      name: brand.name,
      description: brand.description || "",
      image: null, // Reset file input, but show existing preview
      imagePreview: brand.image, // Show existing image
      documents: [], // For mock, assuming documents need to be re-uploaded/re-selected
    })
    setShowEditDialog(true)
  }

  const handleReapplyBrand = () => {
    if (selectedBrand && newBrand.name.trim() && newBrand.description.trim() && newBrand.imagePreview && newBrand.documents.length > 0) {
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === selectedBrand.id
            ? {
                ...brand,
                name: newBrand.name,
                description: newBrand.description,
                image: newBrand.imagePreview,
                status: "pending", // Change status to pending for re-approval
                submittedDate: new Date().toISOString().split("T")[0], // Update submission date
                rejectedDate: undefined, // Clear rejection info
                rejectionReason: undefined,
                approvedDate: null, // Ensure approved date is null
                inactiveDate: undefined,
                inactiveReason: undefined,
              }
            : brand
        )
      )
      console.log("Reapplying brand:", newBrand)
      setShowEditDialog(false)
      resetNewBrandForm()
    }
  }

  const handleView = (brandId: string) => {
    router.push("/brands/distributors")
  }

  const handleViewAnalytics = (brandId: string) => {
    router.push("/analytics")
  }

  const handleToggleStatus = (brand: typeof brands[0]) => {
    if (brand.status === "active") {
      setSelectedBrand(brand)
      setShowInactiveDialog(true)
    } else if (brand.status === "inactive") {
      setSelectedBrand(brand)
      setShowActivateDialog(true)
    }
  }

  const confirmInactiveBrand = () => {
    if (selectedBrand) {
      console.log("Inactivating brand:", selectedBrand.id)
      setBrands((prevBrands) =>
        prevBrands.map((b) =>
          b.id === selectedBrand.id
            ? {
                ...b,
                status: "inactive",
                inactiveDate: new Date().toISOString().split("T")[0],
                inactiveReason: "Manually set to inactive by user.",
              }
            : b
        )
      )
      setShowInactiveDialog(false)
      setSelectedBrand(null)
    }
  }

  const confirmActivateBrand = () => {
    if (selectedBrand) {
      console.log("Activating brand:", selectedBrand.id)
      setBrands((prevBrands) =>
        prevBrands.map((b) =>
          b.id === selectedBrand.id
            ? { ...b, status: "active", inactiveDate: undefined, inactiveReason: undefined }
            : b
        )
      )
      setShowActivateDialog(false)
      setSelectedBrand(null)
    }
  }

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <TooltipProvider>
      <div className="flex-1 bg-gray-50 w-full min-w-0 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
                <p className="text-gray-600 mt-1">Manage your brands and submit new ones for approval</p>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Brand
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-orange-600" />
                      Submit New Brand
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Submit your brand for quality control review. Once approved, you can start adding products.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-name">Brand Name *</Label>
                      <Input
                        id="brand-name"
                        placeholder="Enter brand name"
                        value={newBrand.name}
                        onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    {/* Added Description field */}
                  

                    <div className="space-y-2">
                      <Label>Brand Logo/Image *</Label>
                      {newBrand.imagePreview ? (
                        <div className="relative">
                          <img
                            src={newBrand.imagePreview || "/placeholder.svg"}
                            alt="Brand preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Upload brand logo or image</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="brand-image"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => document.getElementById("brand-image")?.click()}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
<div className="space-y-2">
  <Label>Brand Thumbnail *</Label>
     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Upload brand Thumbnail</p>
                          <input
                            type="file"
                            accept="image/*"
                            // onChange={handleImageUpload}
                            className="hidden"
                            id="brand-image"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => document.getElementById("brand-image")?.click()}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            Choose File
                          </Button>
                        </div>
</div>
                    <div className="space-y-2">
                      <Label>Brand Documents for Authentication *</Label>
                      <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 text-center bg-orange-50/30">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-6 w-6 text-orange-400" />
                          <p className="text-sm text-gray-700 font-medium">Upload Authentication Documents</p>
                          <p className="text-xs text-gray-600">
                            Required: Trademark Certificate, Business Registration, Quality Certifications
                          </p>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            multiple
                            onChange={handleDocumentUpload}
                            className="hidden"
                            id="brand-documents"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => document.getElementById("brand-documents")?.click()}
                            className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Choose Documents
                          </Button>
                        </div>
                      </div>

                      {newBrand.documents.length > 0 && (
                        <div className="space-y-2 mt-3">
                          <Label className="text-sm font-medium text-gray-700">Uploaded Documents:</Label>
                          <div className="space-y-2">
                            {newBrand.documents.map((doc, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-orange-100 rounded">
                                    <Upload className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <span className="text-sm text-gray-700 truncate max-w-[200px]" title={doc.name}>
                                    {doc.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    ({(doc.size / 1024 / 1024).toFixed(1)} MB)
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeDocument(index)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-3">
                        <div className="flex items-start gap-2">
                          <div className="p-1 bg-orange-100 rounded mt-0.5">
                            <Info className="h-3 w-3 text-orange-600" />
                          </div>
                          <div className="text-xs text-orange-700">
                            <div className="font-medium mb-1">Required Documents:</div>
                            <ul className="space-y-0.5">
                              <li>• Trademark Certificate or Registration</li>
                              <li>• Business Registration/License</li>
                              <li>• Quality Certifications (e.g., ISO, HACCP)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddDialog(false)
                        resetNewBrandForm()
                      }}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitBrand}
                      disabled={!newBrand.name.trim() || !newBrand.description.trim() || !newBrand.image || newBrand.documents.length === 0}
                      className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit for Approval
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <Card className="shadow-sm border-gray-200 bg-white">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </CardContent>
            </Card>

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
                        className={`ml-1 ${
                          isActive
                            ? "bg-orange-100 text-orange-700 border-orange-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        } text-xs px-2 py-0.5`}
                      >
                        {count}
                      </Badge>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {filteredBrands.map((brand) => (
                <Card
                  key={brand.id}
                  className="shadow-sm border-gray-200 bg-white hover:shadow-lg transition-all duration-200 overflow-hidden h-[420px] flex flex-col"
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="flex flex-col h-full">
                      {/* Brand Image */}
                      <div className="relative h-40 overflow-hidden flex-shrink-0">
                        <img
                          src={brand.image || "/placeholder.svg"}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        {(brand.status === "active" || brand.status === "inactive") && (
                          <div className="absolute top-3 left-3">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={brand.status === "active"}
                                    onCheckedChange={() => handleToggleStatus(brand)}
                                    className="data-[state=checked]:bg-green-500"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {brand.status === "active" ? "Click to inactive brand" : "Click to activate brand"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                      </div>

                      {/* Brand Content */}
                      <div className="p-2 flex flex-col flex-1">
                        {/* Brand Name & Description */}
                        <div className="mb-3">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{brand.name}</h3>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-gray-50 rounded-lg p-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Package className="h-3 w-3 text-orange-500" />
                              <span className="text-xs font-medium text-gray-600">SKUs</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">{brand.totalSKUs}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="h-3 w-3 text-orange-500" />
                              <span className="text-xs font-medium text-gray-600">Distributors</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">{brand.totalDistributors}</p>
                          </div>
                        </div>

                        {/* Status-specific info - Flexible height */}
                        <div className="flex-1 mb-3">
                          {brand.status === "pending" && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-3 w-3 text-yellow-600" />
                                <span className="text-xs font-medium text-yellow-700">Pending Review</span>
                              </div>
                              <p className="text-xs text-yellow-700">Submitted: {formatDate(brand.submittedDate)}</p>
                              <p className="text-xs text-yellow-600 mt-1">Awaiting quality control review</p>
                            </div>
                          )}

                          {brand.status === "rejected" && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <XCircle className="h-3 w-3 text-red-600" />
                                <span className="text-xs font-medium text-red-700">Rejected</span>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="text-xs text-red-600 line-clamp-2 cursor-help">
                                    {brand.rejectionReason}
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{brand.rejectionReason}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          )}

                          {brand.status === "inactive" && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <Pause className="h-3 w-3 text-gray-600" />
                                <span className="text-xs font-medium text-gray-700">Inactive</span>
                              </div>
                              <p className="text-xs text-gray-600">Since: {formatDate(brand.inactiveDate!)}</p>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="text-xs text-gray-600 line-clamp-2 cursor-help mt-1">
                                    {brand.inactiveReason}
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{brand.inactiveReason}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          )}

                          {brand.status === "active" && brand.approvedDate && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span className="text-xs font-medium text-green-700">Active</span>
                              </div>
                              <p className="text-xs text-green-700">Approved: {formatDate(brand.approvedDate)}</p>
                              <p className="text-xs text-green-600 mt-1">Ready for products</p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons - Always at bottom */}
                        <div className="flex gap-2 mt-auto">
                          {brand.status === "active" ? (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleView(brand.id)}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewAnalytics(brand.id)}
                                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                              >
                                <BarChart3 className="h-3 w-3 mr-1" />
                                Analytics
                              </Button>
                            </>
                          ) : brand.status === "inactive" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleStatus(brand)}
                              className="w-full border-green-300 text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Reactivate Brand
                            </Button>
                          ) : brand.status === "rejected" ? (
                            <Button
                              size="sm"
                              onClick={() => handleEditBrand(brand)} // Edit & Reapply Button
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Edit & Reapply
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled
                              className="w-full border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed"
                            >
                              {brand.status === "pending" ? "Pending Approval" : "Rejected"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBrands.length === 0 && (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No brands found</h3>
                    <p className="text-gray-600">
                      {searchTerm
                        ? "No brands match your search criteria"
                        : activeTab === "all"
                          ? "Submit your first brand to get started"
                          : `No ${activeTab} brands found`}
                    </p>
                  </div>
                  {!searchTerm && (
                    <Button
                      onClick={() => setShowAddDialog(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Brand
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Inactive Brand Warning Dialog */}
      <AlertDialog open={showInactiveDialog} onOpenChange={setShowInactiveDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Inactive Brand Warning
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 space-y-3">
              <div>
                You are about to inactive the brand{" "}
                <span className="font-semibold text-gray-900">"{selectedBrand?.name}"</span>.
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-yellow-800 mb-1">This action will:</div>
                    <ul className="text-yellow-700 space-y-1 text-xs">
                      <li>• Set all products under this brand to "Out of Stock"</li>
                      <li>• Stop all sales and distribution for this brand</li>
                      <li>• Hide the brand from distributor catalogs</li>
                      <li>• Pause all ongoing orders for this brand</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                You can reactivate the brand later, but all products will need to be manually restocked.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmInactiveBrand}
              className="bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              <Pause className="h-4 w-4 mr-2" />
              Inactive Brand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Brand Activation Dialog */}
      <AlertDialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-green-600 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Activate Brand
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 space-y-3">
              <div>
                You are about to activate the brand{" "}
                <span className="font-semibold text-gray-900">"{selectedBrand?.name}"</span>.
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-green-800 mb-1">This action will:</div>
                    <ul className="text-green-700 space-y-1 text-xs">
                      <li>• Make all products under this brand visible again</li>
                      <li>• Resume sales and distribution for this brand</li>
                      <li>• Show the brand in distributor catalogs</li>
                      
                    </ul>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                Note: Individual product stock levels and availability will need to be managed separately in the product
                page.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmActivateBrand}
              className="bg-green-500 hover:bg-green-600 text-white font-medium"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Activate Brand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit & Reapply Brand Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              Edit & Reapply Brand: {selectedBrand?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Make necessary changes and resubmit your brand for quality control review.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-brand-name">Brand Name *</Label>
              <Input
                id="edit-brand-name"
                placeholder="Enter brand name"
                value={newBrand.name} // Using newBrand state for edits
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
         

            <div className="space-y-2">
              <Label>Brand Logo/Image *</Label>
              {newBrand.imagePreview ? (
                <div className="relative">
                  <img
                    src={newBrand.imagePreview || "/placeholder.svg"}
                    alt="Brand preview"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 border border-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload brand logo or image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="edit-brand-image"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => document.getElementById("edit-brand-image")?.click()}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Brand Documents for Authentication *</Label>
              <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 text-center bg-orange-50/30">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 text-orange-400" />
                  <p className="text-sm text-gray-700 font-medium">Upload Authentication Documents</p>
                  <p className="text-xs text-gray-600">
                    Required: Trademark Certificate, Business Registration, Quality Certifications
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="edit-brand-documents"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => document.getElementById("edit-brand-documents")?.click()}
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:text-orange-700/70 bg-transparent"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Choose Documents
                  </Button>
                </div>
              </div>

              {newBrand.documents.length > 0 && (
                <div className="space-y-2 mt-3">
                  <Label className="text-sm font-medium text-gray-700">Uploaded Documents:</Label>
                  <div className="space-y-2">
                    {newBrand.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-100 rounded">
                            <Upload className="h-3 w-3 text-orange-600" />
                          </div>
                          <span className="text-sm text-gray-700 truncate max-w-[200px]" title={doc.name}>
                            {doc.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({(doc.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeDocument(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

             
           
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <XCircle className="h-3 w-3 text-red-600" />
                                <span className="text-xs font-medium text-red-700">Rejected</span>
                              </div>
                             
                                  <p className="text-xs text-red-600  cursor-help">
                                     Brand documentation incomplete. Please provide proper trademark certificates and quality certifications. Additionally, the product samples did not meet our quality standards for packaging and labeling requirements.
                                  </p>
                              
                            </div>
            
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false)
                resetNewBrandForm()
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReapplyBrand}
              disabled={!newBrand.name.trim() || !newBrand.description.trim() || !newBrand.imagePreview || newBrand.documents.length === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reapply for Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}