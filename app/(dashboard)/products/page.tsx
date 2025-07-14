//@ts-nocheck
"use client"
import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Package,
  Search,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Edit,
  Info,
  Lock,
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

// Mock data for products with pricing tiers and full category path
const mockProducts = [
  {
    id: "PROD-001",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-009",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-011",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-021",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-031",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-041",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-051",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-061",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-071",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
    {
    id: "PROD-081",
    name: "Wai Wai Chicken Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-CHK-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 2500,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: 99, price: 23.5 },
      { min: 100, max: null, price: 22.0 },
    ],
  },
  
  {
    id: "PROD-002",
    name: "Wai Wai Vegetable Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-VEG-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Vegetable Noodles",
    minOrderQty: 48,
    status: "active",
    stockLevel: 1800,
    isActive: true,
    pricingTiers: [
      { min: 1, max: 47, price: 25.0 },
      { min: 48, max: null, price: 23.0 },
    ],
  },
  {
    id: "PROD-003",
    name: "Wai Wai Masala Flavor 75g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "WWN-MSL-75G",
    brandName: "Wai Wai Noodles",
    brandId: "BRAND-001",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Masala Noodles",
    minOrderQty: 48,
    status: "pending",
    stockLevel: 0,
    isActive: false,
    pricingTiers: [{ min: 1, max: null, price: 25.0 }],
  },
  {
    id: "PROD-004",
    name: "Chau Chau Chicken Flavor 70g",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
    sku: "CCN-CHK-70G",
    brandName: "Chau Chau Noodles",
    brandId: "BRAND-002",
    category: "Instant Noodles",
    fullCategory: "Food & Beverages > Instant Foods > Noodles > Instant Noodles > Chicken Noodles",
    minOrderQty: 48,
    status: "locked",
    stockLevel: 3200,
    isActive: true,
    lockReason: "Product is under regulatory review and cannot be modified until approval is complete.",
    pricingTiers: [{ min: 1, max: null, price: 23.0 }],
  },
  {
    id: "PROD-005",
    name: "Premium Chips Original 100g",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=80&h=80&fit=crop",
    sku: "PS-CC-ORG-100G",
    brandName: "Premium Snacks",
    brandId: "BRAND-003",
    category: "Snacks",
    fullCategory: "Food & Beverages > Snacks > Chips > Potato Chips > Salted Chips",
    minOrderQty: 24,
    status: "inactive",
    stockLevel: 500,
    isActive: false,
    pricingTiers: [
      { min: 1, max: 23, price: 45.0 },
      { min: 24, max: null, price: 42.0 },
    ],
  },
  {
    id: "PROD-006",
    name: "Spicy Crackers 80g",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=80&h=80&fit=crop",
    sku: "PS-SC-SPY-80G",
    brandName: "Premium Snacks",
    brandId: "BRAND-003",
    category: "Snacks",
    fullCategory: "Food & Beverages > Snacks > Crackers > Savory Crackers > Spicy Crackers",
    minOrderQty: 24,
    status: "violation",
    stockLevel: 0,
    isActive: false,
    violationReason: "Product packaging does not meet food safety standards. Contains unauthorized additives.",
    pricingTiers: [{ min: 1, max: null, price: 35.0 }],
  },
]

// Mock brands for the dropdown
const mockBrands = [
  { id: "BRAND-001", name: "Wai Wai Noodles" },
  { id: "BRAND-002", name: "Chau Chau Noodles" },
  { id: "BRAND-003", name: "Premium Snacks" },
]

// Mock categories for the dropdown
const mockCategories = ["Instant Noodles", "Snacks", "Beverages", "Dairy Products", "Frozen Foods"]

const statusTabs = [
  { key: "active", label: "Active", icon: CheckCircle },
  { key: "pending", label: "Pending", icon: Clock },
  { key: "inactive", label: "Inactive", icon: XCircle },
  { key: "locked", label: "Locked", icon: Lock },
  { key: "violation", label: "Violation", icon: AlertTriangle },
  { key: "deleted", label: "Deleted", icon: Trash2 },
]

const ITEMS_PER_PAGE = 10

export default function ManufacturerProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("active")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState(mockProducts)
  const [copiedSku, setCopiedSku] = useState<string | null>(null)

  // State for dialogs
  const [showStockDialog, setShowStockDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<(typeof mockProducts)[0] | null>(null)
  const [newStockAmount, setNewStockAmount] = useState("")

  const handleToggleActive = (productId: string, isActive: boolean) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, isActive } : product,
      ),
    )
  }

  const handleCopySku = (sku: string) => {
    navigator.clipboard.writeText(sku).then(() => {
      setCopiedSku(sku)
      setTimeout(() => setCopiedSku(null), 2000)
    })
  }

  const filteredProducts = useMemo(() => {
    let filtered = products
    if (activeTab !== "all") {
      filtered = filtered.filter((product) => product.status === activeTab)
    }
    if (selectedBrand !== "all") {
      filtered = filtered.filter((product) => product.brandId === selectedBrand)
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return filtered
  }, [activeTab, selectedBrand, selectedCategory, searchTerm, products])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  useMemo(() => {
    setCurrentPage(1)
  }, [activeTab, selectedBrand, selectedCategory, searchTerm])

  const getTabCount = (tabKey: string) => {
    return products.filter((product) => product.status === tabKey).length
  }

  const handleEditProduct = (productId: string) => {
    window.location.href = "/products/edit"
  }

  const handleDeleteProduct = (product: (typeof mockProducts)[0]) => {
    setSelectedProduct(product)
    setShowDeleteDialog(true)
  }

  const confirmDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id))
      setShowDeleteDialog(false)
      setSelectedProduct(null)
    }
  }

  const handleEditStock = (product: (typeof mockProducts)[0]) => {
    setSelectedProduct(product)
    setNewStockAmount(product.stockLevel.toString())
    setShowStockDialog(true)
  }

  const confirmUpdateStock = () => {
    if (selectedProduct && newStockAmount && Number.parseInt(newStockAmount) >= 0) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, stockLevel: Number.parseInt(newStockAmount) } : p,
        ),
      )
      setShowStockDialog(false)
      setSelectedProduct(null)
      setNewStockAmount("")
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
        >
          {i}
        </Button>,
      )
    }
    return buttons
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedBrand("all")
    setSelectedCategory("all")
  }

  const isProductEditable = (product: (typeof mockProducts)[0]) => {
    return product.status !== "locked" && product.status !== "deleted"
  }
  const startIndex = (currentPage-1)* ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return (
    <>
    <TooltipProvider>
      <div className="bg-gray-50 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
          </div>
          <a href="/products/add">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </a>
        </div>

        <Card className="shadow-sm border-gray-200 bg-white">
          <CardContent className="p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-[2] min-w-[250px]">
                <div className="relative w-full flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full border-gray-300 focus:border-orange-500"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-600">Brand</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="h-9 border-gray-300">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {mockBrands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-600">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-9 border-gray-300">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {mockCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={clearAllFilters} className="h-9 border-gray-300">
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="sticky top-0 z-10 bg-gray-50 pt-2 pb-1 -mx-6 px-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-6 overflow-x-auto">
              {statusTabs.map((tab) => {
                const IconComponent = tab.icon
                const count = getTabCount(tab.key)
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      isActive
                        ? "border-orange-500 text-orange-600 bg-orange-50"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                    <Badge
                      className={`ml-1 ${
                        isActive ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"
                      } text-xs`}
                    >
                      {count}
                    </Badge>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-gray-200 bg-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="px-6 py-4 w-80">Product Info</TableHead>
                      <TableHead className="px-6 py-4">Stock</TableHead>
                      <TableHead className="px-6 py-4">Price</TableHead>
                      <TableHead className="px-6 py-4">Active</TableHead>
                      <TableHead className="px-6 py-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedProducts.map((product) => (
                      <TableRow key={product.id} className="hover:bg-gray-50 border-gray-100">
                        <TableCell className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 rounded object-cover bg-gray-100"
                            />
                            <div className="min-w-0 flex-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h3 className="font-semibold text-gray-900 text-sm cursor-pointer mb-1">
                                    {product.name}
                                  </h3>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <div className="space-y-2 p-1">
                                    <p className="font-bold text-orange-600 text-sm">{product.name}</p>
                                    <div className="space-y-1 text-xs text-gray-600">
                                      <div>
                                        <span className="font-medium text-orange-600">SKU:</span> {product.sku}
                                      </div>
                                      <div>
                                        <span className="font-medium text-orange-600">Min. Order:</span>{" "}
                                        {product.minOrderQty} units
                                      </div>
                                      <div>
                                        <span className="font-medium text-orange-600">Category:</span>{" "}
                                        {product.fullCategory}
                                      </div>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <span className="font-medium">SKU:</span>
                                  <span className="font-mono text-gray-900">{product.sku}</span>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-5 w-5 p-0 text-gray-400 hover:text-orange-600"
                                        onClick={() => handleCopySku(product.sku)}
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{copiedSku === product.sku ? "Copied!" : "Copy SKU"}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <span className="font-medium">Brand:</span>
                                  <span className="text-orange-600 font-medium">{product.brandName}</span>
                                </div>
                              </div>
                            </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.stockLevel.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-600">units</div>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleEditStock(product)}
                                      disabled={!isProductEditable(product)}
                                      className={`h-6 w-6 p-0 ${
                                        isProductEditable(product)
                                          ? "text-gray-400 hover:text-orange-600"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </TooltipTrigger>
                                {!isProductEditable(product) && (
                                  <TooltipContent>
                                    <p>Stock cannot be edited</p>
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="font-medium text-orange-600 border-b border-dashed border-orange-400 cursor-pointer">
                                  Bulk Price
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-1 space-y-1">
                                  <p className="font-bold text-sm mb-2">Pricing Tiers</p>
                                  {product.pricingTiers.map((tier) => (
                                    <div key={tier.min} className="flex justify-between gap-4 text-xs">
                                      <span>
                                        {tier.min} - {tier.max || "∞"} pcs
                                      </span>
                                      <span className="font-semibold">Rs. {tier.price.toFixed(2)}/pc</span>
                                    </div>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <Switch
                              checked={product.isActive}
                              onCheckedChange={(checked) => handleToggleActive(product.id, checked)}
                              disabled={
                                product.status === "pending" ||
                                product.status === "violation" ||
                                product.status === "deleted" ||
                                product.status === "locked"
                              }
                            />
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <Button
                                    size="sm"
                                    onClick={() => handleEditProduct(product.id)}
                                    disabled={!isProductEditable(product)}
                                    className={
                                      isProductEditable(product)
                                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                                        : "bg-gray-300"
                                    }
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              {!isProductEditable(product) && (
                                <TooltipContent>
                                  <p>Product cannot be edited</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    
                  </Table>
                </div>
                {paginatedProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-gray-100 rounded-full">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">
                          {`No products match the "${activeTab}" status or your filters.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {filteredProducts.length > ITEMS_PER_PAGE && (
              <Card className="shadow-sm border-gray-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of{" "}
                      {filteredProducts.length} results
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
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
          </TooltipProvider>
      

      <Dialog open={showStockDialog} onOpenChange={setShowStockDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Edit Stock
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Update stock level for <span className="font-semibold text-gray-900">{selectedProduct?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Current Stock</Label>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedProduct?.stockLevel.toLocaleString()} units
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock-amount" className="text-sm font-medium text-gray-700">
                  New Stock Amount <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="stock-amount"
                  type="number"
                  placeholder="Enter new stock amount"
                  value={newStockAmount}
                  onChange={(e) => setNewStockAmount(e.target.value)}
                  className="border-gray-300 focus:border-orange-500"
                  min="0"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowStockDialog(false)}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmUpdateStock}
              disabled={!newStockAmount || Number.parseInt(newStockAmount) < 0}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
     
    </>
  )
}