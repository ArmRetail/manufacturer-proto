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
  Edit,
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
    name: "Food & Beverages",
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

// Mock existing product data
const mockProduct = {
  id: "PROD-001",
  name: "Wai Wai Chicken Flavor 75g",
  sku: "WWN-CHK-75G",
  brandId: "BRAND-001",
  unit: "piece",
  description:
    "Delicious chicken flavored instant noodles with authentic taste and quality ingredients. Perfect for quick meals and snacks.",
  shelfLife: "12 months",
  mrp: "30",
  image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
  categoryPath: [
    { level: 0, key: "food-beverages", name: "Food & Beverages" },
    { level: 1, key: "instant-foods", name: "Instant Foods" },
    { level: 2, key: "noodles", name: "Noodles" },
    { level: 3, key: "instant-noodles", name: "Instant Noodles" },
    { level: 4, key: "chicken-noodles", name: "Chicken Noodles" },
  ],
  pricingTiers: [
    { id: "1", minQuantity: 1, maxQuantity: 99, pricePerUnit: 25 },
    { id: "2", minQuantity: 100, maxQuantity: 499, pricePerUnit: 23 },
    { id: "3", minQuantity: 500, maxQuantity: null, pricePerUnit: 21 },
  ],
  featureHighlights: [
    { id: "1", title: "Ingredients" },
    { id: "2", title: "Storage Instructions" },
    { id: "3", title: "Nutritional Information" },
  ],
}

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

export default function ProductEditPage() {
  const router = useRouter()
  const [productData, setProductData] = useState({
    name: mockProduct.name,
    sku: mockProduct.sku,
    brandId: mockProduct.brandId,
    unit: mockProduct.unit,
    description: mockProduct.description,
    shelfLife: mockProduct.shelfLife,
    mrp: mockProduct.mrp,
  })

  const [categoryPath, setCategoryPath] = useState<CategoryPath[]>(mockProduct.categoryPath)
  const [image, setImage] = useState<{ id: string; file: File | null; preview: string }>({
    id: "existing",
    file: null,
    preview: mockProduct.image,
  })
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(mockProduct.pricingTiers)
  const [featureHighlights, setFeatureHighlights] = useState<FeatureHighlight[]>(mockProduct.featureHighlights)
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
    const file = e.target.files?.[0]
    if (file) {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      const preview = URL.createObjectURL(file)
      setImage({ id, file, preview })
    }
  }

  const removeImage = () => {
    setImage({ id: "", file: null, preview: "" })
  }

  const addPricingTier = () => {
    const lastTier = pricingTiers[pricingTiers.length - 1]
    const newMinQuantity = lastTier.maxQuantity ? lastTier.maxQuantity + 1 : 100
    const newId = Date.now().toString()
    setPricingTiers((prev) => [
      ...prev,
      {
        id: newId,
        minQuantity: newMinQuantity,
        maxQuantity: null,
        pricePerUnit: 0,
      },
    ])
  }

  const removePricingTier = (id: string) => {
    if (pricingTiers.length > 1) {
      setPricingTiers((prev) => prev.filter((tier) => tier.id !== id))
    }
  }

  const updatePricingTier = (id: string, field: keyof PricingTier, value: number | null) => {
    setPricingTiers((prev) =>
      prev.map((tier) => {
        if (tier.id === id) {
          return { ...tier, [field]: value }
        }
        return tier
      }),
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
      prev.map((highlight) => {
        if (highlight.id === id) {
          return { ...highlight, [field]: value }
        }
        return highlight
      }),
    )
  }

  // Category tree navigation
  const getCurrentCategoryOptions = () => {
    let current: any = categoryTree

    for (const pathItem of categoryPath) {
      current = current[pathItem.key]?.children || {}
    }

    return Object.entries(current).map(([key, value]: [string, any]) => ({
      key,
      name: value.name,
    }))
  }

  const handleCategorySelect = (selectedKey: string) => {
    const options = getCurrentCategoryOptions()
    const selectedOption = options.find((opt) => opt.key === selectedKey)

    if (selectedOption) {
      const newPath = [
        ...categoryPath,
        {
          level: categoryPath.length,
          key: selectedKey,
          name: selectedOption.name,
        },
      ]
      setCategoryPath(newPath)
    }
  }

  const removeCategoryFromPath = (level: number) => {
    setCategoryPath((prev) => prev.slice(0, level))
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
    // TODO: API call to update product
    console.log("Product Data:", productData)
    console.log("Category Path:", categoryPath)
    console.log("Image:", image)
    console.log("Pricing Tiers:", pricingTiers)
    console.log("Feature Highlights:", featureHighlights)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Redirect or show success message
    alert("Product updated successfully!")
    router.push("/products")
  }

  const goBack = () => {
    router.push("/products")
  }

  const isFormValid = () => {
    return (
      productData.name.trim() &&
      productData.sku.trim() &&
      productData.brandId &&
      isCategoryComplete() &&
      productData.unit &&
      productData.mrp &&
      pricingTiers.every((tier) => tier.pricePerUnit > 0) &&
      featureHighlights.every((highlight) => highlight.title.trim()) &&
      image.preview !== ""
    )
  }

  const formatCurrency = (amount: number) => {
    return `रू ${amount.toLocaleString()}`
  }

  const getCategoriesAtLevel = (level: number, searchTerm = "") => {
    let current: any = categoryTree

    // Navigate to the current level
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

    if (searchTerm) {
      return categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return categories
  }

  const handleCategoryClick = (categoryKey: string, level: number) => {
    const newPath = [...selectedCategoryPath]
    newPath[level] = categoryKey
    // Clear any deeper selections
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
    const paths = []

    const traverse = (node, currentPath = []) => {
      Object.entries(node).forEach(([key, value]) => {
        const newPath = [...currentPath, { key, name: value.name }]

        if (value.children) {
          traverse(value.children, newPath)
        } else {
          // Only add complete 5-level paths
          if (newPath.length === 5) {
            paths.push(newPath)
          }
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
      .slice(0, 10) // Limit to 10 results
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
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-gray-600 mt-1">Update product details and pricing</p>
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
                          <TooltipContent>
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

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Category *</Label>
                    <div
                      onClick={() => setShowCategoryModal(true)}
                      className="border border-gray-300 rounded-md p-3 cursor-pointer hover:border-orange-500 focus:border-orange-500 h-11 flex items-center justify-between bg-white"
                    >
                      <span className={categoryPath.length > 0 ? "text-gray-900" : "text-gray-500"}>
                        {categoryPath.length > 0
                          ? getCategoryDisplayValue()
                          : "Please select category or search with keyword"}
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

              {/* Featured Highlights */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Star className="h-6 w-6 text-orange-600" />
                    Featured Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featureHighlights.map((highlight, index) => (
                    <div key={highlight.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Highlight {index + 1}</h4>
                        {featureHighlights.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFeatureHighlight(highlight.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Title (Bold Header)</Label>
                        <Input
                          placeholder="e.g., Ingredients, Storage, Nutrition, Temperature"
                          value={highlight.title}
                          onChange={(e) => updateFeatureHighlight(highlight.id, "title", e.target.value)}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      {highlight.title && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <span className="font-bold">{highlight.title}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFeatureHighlight}
                    className="w-full border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature Highlight
                  </Button>
                </CardContent>
              </Card>

              {/* Product Images */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <ImageIcon className="h-6 w-6 text-orange-600" />
                    Product Image *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload Area */}
                  {!image.preview ? (
                    <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center bg-orange-50/50 hover:bg-orange-50 transition-colors">
                      <Upload className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">Upload Product Photo</p>
                      <p className="text-sm text-gray-600 mb-4">Add a single image to showcase your product.</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="product-image"
                      />
                      <Button
                        type="button"
                        onClick={() => document.getElementById("product-image")?.click()}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="relative w-40 mx-auto mt-4">
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                        <img
                          src={image.preview || "/placeholder.svg"}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={removeImage}
                        className="absolute top-2 right-2 h-7 w-7 p-0 bg-red-500/90 hover:bg-red-500"
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="mt-2 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="product-image-replace"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("product-image-replace")?.click()}
                          className="text-xs"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Replace Image
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pricing Tiers */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <DollarSign className="h-6 w-6 text-orange-600" />
                      Pricing Tiers *
                    </CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Info className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Set different prices based on quantity ranges. Lower quantities typically have higher per-unit
                          prices.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* MRP Input */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="space-y-2">
                      <Label htmlFor="mrp" className="text-sm font-semibold text-blue-700">
                        Maximum Retail Price (MRP) *
                      </Label>
                      <Input
                        id="mrp"
                        type="number"
                        step="0.01"
                        placeholder="Enter MRP for retailers"
                        value={productData.mrp}
                        onChange={(e) => setProductData({ ...productData, mrp: e.target.value })}
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                        min="0"
                      />
                      {productData.mrp && (
                        <p className="text-sm text-blue-600">
                          MRP: {formatCurrency(Number.parseFloat(productData.mrp))}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pricing Tiers */}
                  {pricingTiers.map((tier, index) => (
                    <div key={tier.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Tier {index + 1}</h4>
                        {pricingTiers.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removePricingTier(tier.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Min Quantity</Label>
                          <Input
                            type="number"
                            value={tier.minQuantity}
                            onChange={(e) => updatePricingTier(tier.id, "minQuantity", Number.parseInt(e.target.value))}
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            min="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Max Quantity</Label>
                          <Input
                            type="number"
                            value={tier.maxQuantity || ""}
                            onChange={(e) =>
                              updatePricingTier(
                                tier.id,
                                "maxQuantity",
                                e.target.value ? Number.parseInt(e.target.value) : null,
                              )
                            }
                            placeholder="No limit"
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            min={tier.minQuantity + 1}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Price per Unit (NPR)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={tier.pricePerUnit}
                            onChange={(e) =>
                              updatePricingTier(tier.id, "pricePerUnit", Number.parseFloat(e.target.value))
                            }
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            min="0"
                          />
                        </div>
                      </div>
                      {tier.pricePerUnit > 0 && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <span className="font-medium">
                              {tier.minQuantity} - {tier.maxQuantity || "∞"} units:
                            </span>{" "}
                            {formatCurrency(tier.pricePerUnit)} per unit
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPricingTier}
                    className="w-full border-dashed border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pricing Tier
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Fixed Submit Section */}
            <div className="h-full min-h-screen flex flex-col space-y-8">
              {/* Fixed Submit Section */}
              <div className="sticky top-6 self-start">
                <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-semibold">Ready to Update?</h3>
                      <p className="text-orange-100 text-sm">
                        Your product changes will be saved and updated in the system.
                      </p>
                      <Separator className="bg-orange-400" />
                      <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid() || isSubmitting}
                        className="w-full bg-white text-orange-600 hover:bg-orange-50 font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600 mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Update Product
                          </>
                        )}
                      </Button>
                      {!isFormValid() && (
                        <p className="text-xs text-orange-200">
                          Please fill in all required fields, complete category selection (5 levels), add feature
                          highlights, and ensure an image is present
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[500px] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Category *</h3>
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search category"
                    value={categorySearchTerm}
                    onChange={(e) => setCategorySearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Search Results or Category Navigation */}
            {categorySearchTerm.trim() ? (
              // Search Results View
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-3">
                    {getSearchResults().map((path, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedCategoryPath(path.map((item) => item.key))
                          setCategorySearchTerm("")
                        }}
                        className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-blue-600">
                          {path.map((item, itemIndex) => (
                            <span key={itemIndex}>
                              {highlightSearchTerm(item.name, categorySearchTerm)}
                              {itemIndex < path.length - 1 && " > "}
                            </span>
                          ))}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      </div>
                    ))}
                    {getSearchResults().length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No categories found for "{categorySearchTerm}"</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              // Regular Category Navigation
              <div className="flex-1 flex overflow-hidden">
                {/* Level 1 */}
                <div className="w-1/5 border-r flex flex-col">
                  <div className="p-1 border-b bg-gray-50">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <Input
                        placeholder="Filter..."
                        className="pl-6 h-7 text-xs border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-1">
                      {getCategoriesAtLevel(0, categorySearchTerm).map((category) => (
                        <Tooltip key={category.key} content={category.name}>
                          <TooltipTrigger asChild>
                            <div
                              onClick={() => handleCategoryClick(category.key, 0)}
                              className={`flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-gray-100 text-xs ${
                                selectedCategoryPath[0] === category.key ? "bg-orange-50 text-orange-600" : ""
                              }`}
                              title={category.name}
                            >
                              <span className="truncate">
                                {category.name.length > 12 ? `${category.name.substring(0, 12)}...` : category.name}
                              </span>
                              {category.hasChildren && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
                            </div>
                          </TooltipTrigger>
                        </Tooltip>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Level 2 */}
                {selectedCategoryPath.length > 0 && (
                  <div className="w-1/5 border-r flex flex-col">
                    <div className="p-1 border-b bg-gray-50">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                        <Input
                          placeholder="Filter..."
                          className="pl-6 h-7 text-xs border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="p-1">
                        {getCategoriesAtLevel(1).map((category) => (
                          <Tooltip key={category.key} content={category.name}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handleCategoryClick(category.key, 1)}
                                className={`flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-gray-100 text-xs ${
                                  selectedCategoryPath[1] === category.key ? "bg-orange-50 text-orange-600" : ""
                                }`}
                                title={category.name}
                              >
                                <span className="truncate">
                                  {category.name.length > 12 ? `${category.name.substring(0, 12)}...` : category.name}
                                </span>
                                {category.hasChildren && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
                              </div>
                            </TooltipTrigger>
                          </Tooltip>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Level 3 */}
                {selectedCategoryPath.length > 1 && (
                  <div className="w-1/5 border-r flex flex-col">
                    <div className="p-1 border-b bg-gray-50">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                        <Input
                          placeholder="Filter..."
                          className="pl-6 h-7 text-xs border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="p-1">
                        {getCategoriesAtLevel(2).map((category) => (
                          <Tooltip key={category.key} content={category.name}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handleCategoryClick(category.key, 2)}
                                className={`flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-gray-100 text-xs ${
                                  selectedCategoryPath[2] === category.key ? "bg-orange-50 text-orange-600" : ""
                                }`}
                                title={category.name}
                              >
                                <span className="truncate">
                                  {category.name.length > 12 ? `${category.name.substring(0, 12)}...` : category.name}
                                </span>
                                {category.hasChildren && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
                              </div>
                            </TooltipTrigger>
                          </Tooltip>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Level 4 */}
                {selectedCategoryPath.length > 2 && (
                  <div className="w-1/5 border-r flex flex-col">
                    <div className="p-1 border-b bg-gray-50">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                        <Input
                          placeholder="Filter..."
                          className="pl-6 h-7 text-xs border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="p-1">
                        {getCategoriesAtLevel(3).map((category) => (
                          <Tooltip key={category.key} content={category.name}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handleCategoryClick(category.key, 3)}
                                className={`flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-gray-100 text-xs ${
                                  selectedCategoryPath[3] === category.key ? "bg-orange-50 text-orange-600" : ""
                                }`}
                                title={category.name}
                              >
                                <span className="truncate">
                                  {category.name.length > 12 ? `${category.name.substring(0, 12)}...` : category.name}
                                </span>
                                {category.hasChildren && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
                              </div>
                            </TooltipTrigger>
                          </Tooltip>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Level 5 */}
                {selectedCategoryPath.length > 3 && (
                  <div className="w-1/5 flex flex-col">
                    <div className="p-1 border-b bg-gray-50">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                        <Input
                          placeholder="Filter..."
                          className="pl-6 h-7 text-xs border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="p-1">
                        {getCategoriesAtLevel(4).map((category) => (
                          <Tooltip key={category.key} content={category.name}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handleCategoryClick(category.key, 4)}
                                className={`flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-gray-100 text-xs ${
                                  selectedCategoryPath[4] === category.key ? "bg-orange-50 text-orange-600" : ""
                                }`}
                                title={category.name}
                              >
                                <span className="truncate">
                                  {category.name.length > 12 ? `${category.name.substring(0, 12)}...` : category.name}
                                </span>
                              </div>
                            </TooltipTrigger>
                          </Tooltip>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            )}

            {/* Current Selection */}
            <div className="p-3 border-t bg-gray-50">
              <div className="text-xs">
                <span className="font-medium">Current selection:</span>
                <span className="ml-1">
                  {getCurrentSelectionDisplay().length > 60
                    ? `${getCurrentSelectionDisplay().substring(0, 60)}...`
                    : getCurrentSelectionDisplay()}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCategoryModal(false)
                  setSelectedCategoryPath([])
                  setCurrentCategoryLevel(0)
                  setCategorySearchTerm("")
                }}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmCategorySelection}
                disabled={selectedCategoryPath.length !== 5}
                className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  )
}
