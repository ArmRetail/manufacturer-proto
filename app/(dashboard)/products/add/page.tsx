//@ts-nocheck

"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Package,
  DollarSign,
  ImageIcon,
  Info,
  Save,
  ChevronRight,
  Star,
  Search,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

// Mock brands for the dropdown
const mockBrands = [
  { id: "BRAND-001", name: "Wai Wai Noodles" },
  { id: "BRAND-002", name: "Chau Chau Noodles" },
  { id: "BRAND-003", name: "Premium Snacks" },
]

// Hierarchical category structure with 5 levels
const categoryTree = {
  "food-beverages": {
    name: "Food & Beverages ",
    children: {
      "instant-foods": {
        name: "Instant Foods",
        children: {
          noodles: {
            name: "Noodles",
            children: {
              "instant-noodles": {
                name: "Instant Noodles",
                children: {
                  "masala-noodles": { name: "Masala Noodles" },
                  "chicken-noodles": { name: "Chicken Noodles" },
                  "vegetable-noodles": { name: "Vegetable Noodles" },
                  "plain-noodles": { name: "Plain Noodles" },
                },
              },
              "cup-noodles": {
                name: "Cup Noodles",
                children: {
                  "spicy-cup": { name: "Spicy Cup Noodles" },
                  "mild-cup": { name: "Mild Cup Noodles" },
                  "premium-cup": { name: "Premium Cup Noodles" },
                },
              },
            },
          },
          "ready-meals": {
            name: "Ready Meals",
            children: {
              "rice-meals": {
                name: "Rice Meals",
                children: {
                  biryani: { name: "Instant Biryani" },
                  pulao: { name: "Instant Pulao" },
                  "fried-rice": { name: "Instant Fried Rice" },
                },
              },
            },
          },
        },
      },
      snacks: {
        name: "Snacks",
        children: {
          chips: {
            name: "Chips",
            children: {
              "potato-chips": {
                name: "Potato Chips",
                children: {
                  salted: { name: "Salted Chips" },
                  masala: { name: "Masala Chips" },
                  barbecue: { name: "Barbecue Chips" },
                },
              },
            },
          },
        },
      },
    },
  },
  "personal-care": {
    name: "Personal Care",
    children: {
      "oral-care": {
        name: "Oral Care",
        children: {
          toothpaste: {
            name: "Toothpaste",
            children: {
              fluoride: {
                name: "Fluoride Toothpaste",
                children: {
                  whitening: { name: "Whitening Toothpaste" },
                  sensitive: { name: "Sensitive Teeth" },
                  "complete-care": { name: "Complete Care" },
                },
              },
            },
          },
        },
      },
      "hair-care": {
        name: "Hair Care",
        children: {
          shampoo: {
            name: "Shampoo",
            children: {
              "anti-dandruff": {
                name: "Anti-Dandruff",
                children: {
                  "dry-hair": { name: "For Dry Hair" },
                  "oily-hair": { name: "For Oily Hair" },
                  "normal-hair": { name: "For Normal Hair" },
                },
              },
            },
          },
        },
      },
    },
  },
  "home-care": {
    name: "Home Care",
    children: {
      cleaning: {
        name: "Cleaning Products",
        children: {
          detergents: {
            name: "Detergents",
            children: {
              powder: {
                name: "Powder Detergent",
                children: {
                  "front-load": { name: "Front Load" },
                  "top-load": { name: "Top Load" },
                  "hand-wash": { name: "Hand Wash" },
                },
              },
            },
          },
        },
      },
    },
  },
}

// Unit options
const unitOptions = ["piece", "kg", "g", "lt", "ml", "pack", "box", "bottle", "can", "bag"]

interface PricingTier {
  id: string
  minQuantity: number
  maxQuantity: number | null
  pricePerUnit: number
}

interface FeatureHighlight {
  id: string
  title: string
}

interface CategoryPath {
  level: number
  key: string
  name: string
}

interface ProductImage {
  id: string
  file: File
  preview: string
  isPrimary: boolean
}

export default function AddProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    brandId: "",
    unit: "",
    description: "",
    shelfLife: "",
    mrp: "",
  })
  const router = useRouter()
  const [categoryPath, setCategoryPath] = useState<CategoryPath[]>([])
  const [images, setImages] = useState<ProductImage[]>([])
  const [retailerPricingTiers, setRetailerPricingTiers] = useState<PricingTier[]>([
    { id: "r1", minQuantity: 1, maxQuantity: 99, pricePerUnit: 0 },
  ])
  const [wholesalePricingTiers, setWholesalePricingTiers] = useState<PricingTier[]>([
    { id: "w1", minQuantity: 1, maxQuantity: 99, pricePerUnit: 0 },
  ])
  const [featureHighlights, setFeatureHighlights] = useState<FeatureHighlight[]>([{ id: "1", title: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [categorySearchTerm, setCategorySearchTerm] = useState("")
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string[]>([])
  const [currentCategoryLevel, setCurrentCategoryLevel] = useState(0)

  const generateRandomSKU = () => {
    const prefix = productData.brandId
      ? mockBrands
          .find((b) => b.id === productData.brandId)
          ?.name.substring(0, 3)
          .toUpperCase()
      : "PRD"
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    const randomLetters = Math.random().toString(36).substring(2, 5).toUpperCase()
    const generatedSKU = `${prefix}-${randomLetters}-${randomNum}`
    setProductData({ ...productData, sku: generatedSKU })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
        const preview = URL.createObjectURL(file)
        // First image is primary by default, others are not
        const isPrimary = images.length === 0 && newImages.length === 0
        return { id, file, preview, isPrimary }
      })
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const remaining = prev.filter((img) => img.id !== id)
      // If the removed image was primary, make the first remaining image primary
      if (prev.find((img) => img.id === id)?.isPrimary && remaining.length > 0) {
        remaining[0].isPrimary = true
      }
      return remaining
    })
  }

  const setPrimaryImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      })),
    )
  }

  const addRetailerPricingTier = () => {
    const lastTier = retailerPricingTiers[retailerPricingTiers.length - 1]
    const newMinQuantity = lastTier.maxQuantity ? lastTier.maxQuantity + 1 : 100
    const newId = `r${Date.now()}`
    setRetailerPricingTiers((prev) => [
      ...prev,
      {
        id: newId,
        minQuantity: newMinQuantity,
        maxQuantity: null,
        pricePerUnit: 0,
      },
    ])
  }

  const removeRetailerPricingTier = (id: string) => {
    if (retailerPricingTiers.length > 1) {
      setRetailerPricingTiers((prev) => prev.filter((tier) => tier.id !== id))
    }
  }

  const updateRetailerPricingTier = (id: string, field: keyof PricingTier, value: number | null) => {
    setRetailerPricingTiers((prev) =>
      prev.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)),
    )
  }

  const addWholesalePricingTier = () => {
    const lastTier = wholesalePricingTiers[wholesalePricingTiers.length - 1]
    const newMinQuantity = lastTier.maxQuantity ? lastTier.maxQuantity + 1 : 100
    const newId = `w${Date.now()}`
    setWholesalePricingTiers((prev) => [
      ...prev,
      {
        id: newId,
        minQuantity: newMinQuantity,
        maxQuantity: null,
        pricePerUnit: 0,
      },
    ])
  }

  const removeWholesalePricingTier = (id: string) => {
    if (wholesalePricingTiers.length > 1) {
      setWholesalePricingTiers((prev) => prev.filter((tier) => tier.id !== id))
    }
  }

  const updateWholesalePricingTier = (id: string, field: keyof PricingTier, value: number | null) => {
    setWholesalePricingTiers((prev) =>
      prev.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)),
    )
  }

  const addFeatureHighlight = () => {
    const newId = Date.now().toString()
    setFeatureHighlights((prev) => [...prev, { id: newId, title: "" }])
  }

  const removeFeatureHighlight = (id: string) => {
    if (featureHighlights.length > 1) {
      setFeatureHighlights((prev) => prev.filter((highlight) => highlight.id !== id))
    }
  }

  const updateFeatureHighlight = (id: string, field: keyof FeatureHighlight, value: string) => {
    setFeatureHighlights((prev) =>
      prev.map((highlight) => (highlight.id === id ? { ...highlight, [field]: value } : highlight)),
    )
  }

  const getCategoryDisplayValue = () => {
    if (categoryPath.length === 0) return "Select category"
    return categoryPath.map((item) => item.name).join(" > ")
  }

  const isCategoryComplete = () => {
    return categoryPath.length === 5
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // TODO: API call to submit product data including both pricing tiers
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Product submitted successfully!")
  }

  const goBack = () => {
    router.push('/products')
  }

  const isFormValid = () => {
    return (
      productData.name.trim() &&
      productData.sku.trim() &&
      productData.brandId &&
      isCategoryComplete() &&
      productData.unit &&
      productData.mrp &&
      wholesalePricingTiers.every((tier) => tier.pricePerUnit > 0) &&
      retailerPricingTiers.every((tier) => tier.pricePerUnit > 0) &&
      featureHighlights.every((highlight) => highlight.title.trim()) &&
      images.length > 0
    )
  }

  const formatCurrency = (amount: number) => {
    return `रू ${amount.toLocaleString()}`
  }

  const getCategoriesAtLevel = (level: number, searchTerm = "") => {
    let current: any = categoryTree
    for (let i = 0; i < level; i++) {
      if (selectedCategoryPath[i] && current[selectedCategoryPath[i]]) {
        current = current[selectedCategoryPath[i]].children || {}
      }
    }
    const categories = Object.entries(current).map(([key, value]: [string, any]) => ({
      key,
      name: value.name,
      hasChildren: !!value.children,
    }))
    return searchTerm ? categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase())) : categories
  }

  const handleCategoryClick = (categoryKey: string, level: number) => {
    const newPath = [...selectedCategoryPath]
    newPath[level] = categoryKey
    newPath.splice(level + 1)
    setSelectedCategoryPath(newPath)
    setCurrentCategoryLevel(level + 1)
  }

  const getCurrentSelectionDisplay = () => {
    if (selectedCategoryPath.length === 0) return "--"
    let current: any = categoryTree
    const names = []
    for (const pathKey of selectedCategoryPath) {
      if (current[pathKey]) {
        names.push(current[pathKey].name)
        current = current[pathKey].children || {}
      }
    }
    return names.join(" > ")
  }

  const confirmCategorySelection = () => {
    if (selectedCategoryPath.length === 5) {
      setCategoryPath(
        selectedCategoryPath.map((key, index) => {
          let current: any = categoryTree
          for (let i = 0; i <= index; i++) {
            if (current[selectedCategoryPath[i]]) {
              if (i === index) {
                return {
                  level: index,
                  key: key,
                  name: current[selectedCategoryPath[i]].name,
                }
              }
              current = current[selectedCategoryPath[i]].children || {}
            }
          }
          return { level: index, key: key, name: key }
        }),
      )
      setShowCategoryModal(false)
    }
  }

  const getAllCategoryPaths = () => {
    const paths: any[] = []
    const traverse = (node: any, currentPath: any[] = []) => {
      Object.entries(node).forEach(([key, value]: [string, any]) => {
        const newPath = [...currentPath, { key, name: value.name }]
        if (value.children) {
          traverse(value.children, newPath)
        } else if (newPath.length === 5) {
          paths.push(newPath)
        }
      })
    }
    traverse(categoryTree)
    return paths
  }

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text
    const regex = new RegExp(`(${searchTerm})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  const getSearchResults = () => {
    if (!categorySearchTerm.trim()) return []
    const allPaths = getAllCategoryPaths()
    return allPaths
      .filter((path) => path.some((item) => item.name.toLowerCase().includes(categorySearchTerm.toLowerCase())))
      .slice(0, 10)
  }

  return (
    <TooltipProvider>
      <div>
        {/* Header */}
        <div>
          <div className="max-w-7xl mx-auto px-6 py-4">
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
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600 mt-1">Create a new product for your catalog</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Package className="h-6 w-6 text-orange-600" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="product-name" className="text-sm font-semibold text-gray-700">
                        Product Name *
                      </Label>
                      <Input
                        id="product-name"
                        placeholder="Enter product name"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-sku" className="text-sm font-semibold text-gray-700">
                        SKU Code *
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="product-sku"
                          placeholder="Enter SKU code"
                          value={productData.sku}
                          onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-11"
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={generateRandomSKU}
                              className="h-11 px-3 border-gray-300 hover:border-orange-500 hover:bg-orange-50 bg-transparent"
                            >
                              <Package className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="!text-black">
                            <p>Generate random SKU</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-brand" className="text-sm font-semibold text-gray-700">
                        Brand *
                      </Label>
                      <Select
                        value={productData.brandId}
                        onValueChange={(value) => setProductData({ ...productData, brandId: value })}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-11">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockBrands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit" className="text-sm font-semibold text-gray-700">
                        Unit *
                      </Label>
                      <Select
                        value={productData.unit}
                        onValueChange={(value) => setProductData({ ...productData, unit: value })}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-11">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitOptions.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shelf-life" className="text-sm font-semibold text-gray-700">
                        Shelf Life
                      </Label>
                      <Input
                        id="shelf-life"
                        placeholder="e.g., 12 months, 2 years"
                        value={productData.shelfLife}
                        onChange={(e) => setProductData({ ...productData, shelfLife: e.target.value })}
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Category *</Label>
                    <div
                      onClick={() => setShowCategoryModal(true)}
                      className="border border-gray-300 rounded-md p-3 cursor-pointer hover:border-orange-500 focus:border-orange-500 h-11 flex items-center justify-between bg-white"
                    >
                      <span className={categoryPath.length > 0 ? "text-gray-900" : "text-gray-500"}>
                        {getCategoryDisplayValue()}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    {categoryPath.length > 0 && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Package className="h-4 w-4" />
                        Category selected: {categoryPath.length}/5 levels
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-description" className="text-sm font-semibold text-gray-700">
                      Product Description
                    </Label>
                    <Textarea
                      id="product-description"
                      placeholder="Describe your product features, benefits, and specifications..."
                      value={productData.description}
                      onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 min-h-[120px]"
                      rows={5}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Star className="h-6 w-6 text-orange-600" />
                    Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48 w-full pr-4">
                    <div className="space-y-3">
                      {featureHighlights.map((highlight) => (
                        <div key={highlight.id} className="flex items-center gap-2">
                          <Input
                            placeholder="e.g., Made with real vegetables"
                            value={highlight.title}
                            onChange={(e) => updateFeatureHighlight(highlight.id, "title", e.target.value)}
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          />
                          {featureHighlights.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFeatureHighlight(highlight.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFeatureHighlight}
                    className="w-full mt-4 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Highlight
                  </Button>
                </CardContent>
              </Card>

              {/* Product Images */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <ImageIcon className="h-6 w-6 text-orange-600" />
                    Product Images *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center bg-orange-50/50 hover:bg-orange-50 transition-colors">
                    <Upload className="h-10 w-10 text-orange-400 mx-auto mb-3" />
                    <p className="text-md font-medium text-gray-700 mb-2">Upload Product Photos</p>
                    <p className="text-sm text-gray-600 mb-4">You can add multiple images. Select one as primary.</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="product-image-upload"
                      multiple
                    />
                    <Button
                      type="button"
                      onClick={() => document.getElementById("product-image-upload")?.click()}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photos
                    </Button>
                  </div>
                  {images.length > 0 && (
                    <ScrollArea className="mt-4 h-48 pr-3">
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.preview}
                              alt="Product"
                              className={`w-full h-24 object-cover rounded-lg border-2 ${
                                image.isPrimary ? "border-orange-500" : "border-gray-200"
                              }`}
                            />
                            {image.isPrimary && (
                              <div className="absolute top-1 right-1 bg-orange-500 text-white rounded-full p-1">
                                <Star className="h-3 w-3" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-lg">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setPrimaryImage(image.id)}
                                    className="h-7 w-7 p-0 bg-white/80 hover:bg-white"
                                  >
                                    <Star className="h-4 w-4 text-orange-600" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Set as primary</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeImage(image.id)}
                                    className="h-7 w-7 p-0 bg-red-500/80 text-white hover:bg-red-500"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Remove</TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                    Pricing *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                    <Label htmlFor="mrp" className="text-sm font-semibold text-blue-700">
                      Maximum Retail Price (MRP) *
                    </Label>
                    <Input
                      id="mrp"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 150.00"
                      value={productData.mrp}
                      onChange={(e) => setProductData({ ...productData, mrp: e.target.value })}
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 h-11 mt-2"
                      min="0"
                    />
                  </div>

                  <ScrollArea className="h-96 pr-3">
                    {/* Wholesale Pricing Tiers */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Wholesale Pricing Tiers *</h4>
                          <p className="text-xs text-gray-500">Visible to distributors for setting their own prices.</p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Info className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs !text-black">
                            This pricing is visible to distributors. They can use this as a base to set their own pricing
                            structure.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="grid grid-cols-10 gap-2 text-xs font-medium text-gray-500 px-2">
                        <div className="col-span-3">Min Qty</div>
                        <div className="col-span-3">Max Qty</div>
                        <div className="col-span-3">Price/Unit</div>
                      </div>
                      {wholesalePricingTiers.map((tier) => (
                        <div key={tier.id} className="grid grid-cols-10 gap-2 items-center">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={tier.minQuantity}
                            onChange={(e) =>
                              updateWholesalePricingTier(tier.id, "minQuantity", Number.parseInt(e.target.value))
                            }
                            min="1"
                            className="col-span-3"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={tier.maxQuantity || ""}
                            onChange={(e) =>
                              updateWholesalePricingTier(
                                tier.id,
                                "maxQuantity",
                                e.target.value ? Number.parseInt(e.target.value) : null,
                              )
                            }
                            min={tier.minQuantity + 1}
                            className="col-span-3"
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            step="0.01"
                            value={tier.pricePerUnit}
                            onChange={(e) =>
                              updateWholesalePricingTier(tier.id, "pricePerUnit", Number.parseFloat(e.target.value))
                            }
                            min="0"
                            className="col-span-3"
                          />
                          {wholesalePricingTiers.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeWholesalePricingTier(tier.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addWholesalePricingTier}
                        className="w-full border-dashed text-orange-600 border-orange-600 border-1"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Wholesale Tier
                      </Button>
                    </div>

                    <Separator className="my-6" />

                    {/* Brand Pricing Tiers */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">Brand Pricing Tiers *</h4>
                        <p className="text-xs text-gray-500">This is the direct pricing from the brand to customers.</p>
                      </div>
                      <div className="grid grid-cols-10 gap-2 text-xs font-medium text-gray-500 px-2">
                        <div className="col-span-3">Min Qty</div>
                        <div className="col-span-3">Max Qty</div>
                        <div className="col-span-3">Price/Unit</div>
                      </div>
                      {retailerPricingTiers.map((tier) => (
                        <div key={tier.id} className="grid grid-cols-10 gap-2 items-center">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={tier.minQuantity}
                            onChange={(e) =>
                              updateRetailerPricingTier(tier.id, "minQuantity", Number.parseInt(e.target.value))
                            }
                            min="1"
                            className="col-span-3"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={tier.maxQuantity || ""}
                            onChange={(e) =>
                              updateRetailerPricingTier(
                                tier.id,
                                "maxQuantity",
                                e.target.value ? Number.parseInt(e.target.value) : null,
                              )
                            }
                            min={tier.minQuantity + 1}
                            className="col-span-3"
                          />
                          <Input
                            type="number"
                            placeholder="Price"
                            step="0.01"
                            value={tier.pricePerUnit}
                            onChange={(e) =>
                              updateRetailerPricingTier(tier.id, "pricePerUnit", Number.parseFloat(e.target.value))
                            }
                            min="0"
                            className="col-span-3"
                          />
                          {retailerPricingTiers.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeRetailerPricingTier(tier.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addRetailerPricingTier}
                        className="w-full border-dashed text-orange-600 border-orange-600 border-1"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Brand Tier
                      </Button>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Fixed Submit Section */}
            <div className="h-full">
              <div className="sticky top-6 self-start">
                <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-semibold">Ready to Submit?</h3>
                      <p className="text-orange-100 text-sm">
                        Your product will be reviewed before being published.
                      </p>
                      <Separator className="bg-orange-400" />
                      <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid() || isSubmitting}
                        className="w-full bg-white text-orange-600 hover:bg-orange-50 font-semibold py-3 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Product"}
                      </Button>
                      {!isFormValid() && (
                        <p className="text-xs text-orange-200">
                          Please fill all required fields (*) to submit.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[500px] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Category *</h3>
              <div className="mt-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search category"
                  value={categorySearchTerm}
                  onChange={(e) => setCategorySearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {categorySearchTerm.trim() ? (
              <ScrollArea className="flex-1">
                <div className="p-3">
                  {getSearchResults().map((path, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedCategoryPath(path.map((item) => item.key))
                        setCategorySearchTerm("")
                      }}
                      className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100"
                    >
                      <span>
                        {path.map((item, itemIndex) => (
                          <span key={itemIndex}>
                            {highlightSearchTerm(item.name, categorySearchTerm)}
                            {itemIndex < path.length - 1 && " > "}
                          </span>
                        ))}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                  {getSearchResults().length === 0 && (
                    <p className="text-center py-8 text-gray-500">No categories found.</p>
                  )}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 flex overflow-hidden">
                {[0, 1, 2, 3, 4].map(
                  (level) =>
                    selectedCategoryPath.length >= level && (
                      <div key={level} className="w-1/5 border-r flex flex-col">
                        <ScrollArea className="flex-1 p-1">
                          {getCategoriesAtLevel(level).map((category) => (
                            <Tooltip key={category.key} content={category.name}>
                              <TooltipTrigger asChild>
                                <div
                                  onClick={() => handleCategoryClick(category.key, level)}
                                  className={`flex items-center justify-between p-1.5 rounded cursor-pointer text-xs ${
                                    selectedCategoryPath[level] === category.key
                                      ? "bg-orange-50 text-orange-600"
                                      : "hover:bg-gray-100"
                                  }`}
                                  title={category.name}
                                >
                                  <span className="truncate">{category.name}</span>
                                  {category.hasChildren && <ChevronRight className="h-3 w-3" />}
                                </div>
                              </TooltipTrigger>
                            </Tooltip>
                          ))}
                        </ScrollArea>
                      </div>
                    ),
                )}
              </div>
            )}

            <div className="p-3 border-t bg-gray-50 text-xs">
              <strong>Current:</strong> {getCurrentSelectionDisplay()}
            </div>

            <div className="p-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCategoryModal(false)}>
                Cancel
              </Button>
              <Button onClick={confirmCategorySelection} disabled={selectedCategoryPath.length !== 5}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  )
}