"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
// Import Table components from shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Tag, Trash2, Package, X } from "lucide-react"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  brand: string
  image: string
  retailPrice: number
  salePrice: number
  stock: number
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wai Wai Chicken Noodles Premium Pack",
    sku: "WWC-001",
    category: "Instant Noodles",
    brand: "Wai Wai",
    image: "/placeholder.svg?height=120&width=120",
    retailPrice: 1250,
    salePrice: 1100,
    stock: 150,
  },
  {
    id: "2",
    name: "Chau Chau Masala Noodles Family Pack",
    sku: "CCM-002",
    category: "Instant Noodles",
    brand: "Chau Chau",
    image: "/placeholder.svg?height=120&width=120",
    retailPrice: 890,
    salePrice: 750,
    stock: 89,
  },
  {
    id: "3",
    name: "Himalayan Rock Salt Natural 1kg",
    sku: "HRS-003",
    category: "Spices & Seasonings",
    brand: "Himalayan",
    image: "/placeholder.svg?height=120&width=120",
    retailPrice: 650,
    salePrice: 580,
    stock: 45,
  },
  {
    id: "4",
    name: "Everest Garam Masala Powder 100g",
    sku: "EGM-004",
    category: "Spices & Seasonings",
    brand: "Everest",
    image: "/placeholder.svg?height=120&width=120",
    retailPrice: 450,
    salePrice: 420,
    stock: 120,
  },
  {
    id: "5",
    name: "Wai Wai Vegetable Noodles Multi Pack",
    sku: "WWV-005",
    category: "Instant Noodles",
    brand: "Wai Wai",
    image: "/placeholder.svg?height=120&width=120",
    retailPrice: 980,
    salePrice: 850,
    stock: 75,
  },
  {
    id: "6",
    name: "Everest Turmeric Powder Premium 200g",
    sku: "ETP-006",
    category: "Spices & Seasonings",
    brand: "Everest",
    image: "/placeholder.svg?height=120&width=120",
    retailPrice: 320,
    salePrice: 290,
    stock: 95,
  },
]

const brands = [
  { value: "all", label: "All Brands" },
  { value: "wai-wai", label: "Wai Wai" },
  { value: "chau-chau", label: "Chau Chau" },
  { value: "himalayan", label: "Himalayan" },
  { value: "everest", label: "Everest" },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "instant-noodles", label: "Instant Noodles" },
  { value: "spices-seasonings", label: "Spices & Seasonings" },
  { value: "beverages", label: "Beverages" },
  { value: "snacks", label: "Snacks" },
]

export default function ManageProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [modalSelectedProducts, setModalSelectedProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router =useRouter();

  // Filter products based on search and filters
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBrand = selectedBrand === "all" || product.brand.toLowerCase().replace(/\s+/g, "-") === selectedBrand
    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory

    return matchesSearch && matchesBrand && matchesCategory
  })

  const handleProductToggle = (product: Product) => {
    setModalSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id)
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const handleConfirmSelection = () => {
    setSelectedProducts(modalSelectedProducts)
    setIsProductModalOpen(false)
    resetModalState()
  }

  const handleCancelSelection = () => {
    setIsProductModalOpen(false)
    resetModalState()
  }

  const resetModalState = () => {
    setModalSelectedProducts([])
    setSearchTerm("")
    setSelectedBrand("all")
    setSelectedCategory("all")
  }

  const openProductModal = () => {
    setModalSelectedProducts(selectedProducts)
    setIsProductModalOpen(true)
  }

  const removeSelectedProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const clearAllProducts = () => {
    setSelectedProducts([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-1">Configure products for your promotion campaign</p>
        </div>

        {/* First Row - Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Tag className="h-4 w-4 text-white" />
              </div>
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Promotion Type</Label>
              <div className="text-lg font-medium text-gray-900">Percentage Discount Off</div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Discount Details</Label>
              <div className="text-sm text-gray-700">
                1, 5, if item quantity reaches: 1, discount, Discount would be: 5% off, quantity.
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Selected Products</Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-orange-600">{selectedProducts.length}</span>
                <span className="text-gray-600">products selected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second Row - Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <Button onClick={openProductModal} className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Package className="h-4 w-4 mr-2" />
                  Select Products ({selectedProducts.length})
                </Button>
                {selectedProducts.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearAllProducts}
                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {selectedProducts.length > 0 && `${selectedProducts.length} products ready for promotion`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IMPROVED Third Row - Product List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Selected Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {selectedProducts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[45%]">Product</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 rounded-md object-cover bg-gray-100"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                          {product.brand}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{product.stock}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSelectedProduct(product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Selected</h3>
                <p className="text-gray-600 mb-6">Start by selecting products for your promotion campaign</p>
                <Button onClick={openProductModal} className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Package className="h-4 w-4 mr-2" />
                  Select Products
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" size="lg" className="px-8 bg-transparent" onClick={()=> router.push('/promotions')}>
            Cancel
          </Button>
          <Button size="lg" className="px-8 bg-orange-500 hover:bg-orange-600 text-white">
            Apply Changes
          </Button>
        </div>
      </div>

      {/* Product Selection Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="min-w-xl flex flex-col h-[90vh] max-h-[700px] p-0">
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle className="text-xl font-semibold text-gray-900">Select Products</DialogTitle>
          </DialogHeader>

          {/* Filter Section */}
          <div className="px-6 py-4 border-b bg-gray-50 shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.value} value={brand.value}>
                      {brand.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              <div className="relative md:col-span-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Scrollable Product Grid */}
          <ScrollArea className="flex-auto overflow-y-scroll">
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => {
                  const isSelected = modalSelectedProducts.some((p) => p.id === product.id)
                  return (
                    <div
                      key={product.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                      }`}
                      onClick={() => handleProductToggle(product)}
                    >
                      <div className="flex gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleProductToggle(product)}
                          className="mt-1 border-orange-300 data-[state=checked]:bg-orange-500"
                        />
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h3>
                          <div className="space-y-1">
                            <div className="text-xs text-orange-600 font-medium">SKU: {product.sku}</div>
                            <div className="text-xs text-gray-600">Brand: {product.brand}</div>
                            <div className="text-xs text-gray-600">Category: {product.category}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Selected: <span className="font-medium text-orange-600">{modalSelectedProducts.length}</span> products
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleCancelSelection}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmSelection} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Confirm Selection
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}