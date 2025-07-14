//@ts-nocheck
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CalendarIcon, Shuffle, MapPin, X, Gift, ShoppingCart, Tag } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface Location {
  id: string
  name: string
  type: "province" | "district" | "city"
  parent?: string
}

const nepalLocations: Location[] = [
  // Provinces
  { id: "province-1", name: "Province 1", type: "province" },
  { id: "bagmati", name: "Bagmati Province", type: "province" },
  { id: "gandaki", name: "Gandaki Province", type: "province" },
  { id: "lumbini", name: "Lumbini Province", type: "province" },
  { id: "karnali", name: "Karnali Province", type: "province" },
  { id: "sudurpashchim", name: "Sudurpashchim Province", type: "province" },

  // Major Cities
  { id: "kathmandu", name: "Kathmandu", type: "city", parent: "bagmati" },
  { id: "pokhara", name: "Pokhara", type: "city", parent: "gandaki" },
  { id: "lalitpur", name: "Lalitpur", type: "city", parent: "bagmati" },
  { id: "bhaktapur", name: "Bhaktapur", type: "city", parent: "bagmati" },
  { id: "biratnagar", name: "Biratnagar", type: "city", parent: "province-1" },
  { id: "birgunj", name: "Birgunj", type: "city", parent: "bagmati" },
  { id: "dharan", name: "Dharan", type: "city", parent: "province-1" },
  { id: "hetauda", name: "Hetauda", type: "city", parent: "bagmati" },
]

export default function CreatePromotionForm() {
  const [promotionName, setPromotionName] = useState("Flexi Combo 2025-07-09 18:39:32")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [discountMode, setDiscountMode] = useState("money")
  const [discountType, setDiscountType] = useState("money-discount")
  const [dealCriteria, setDealCriteria] = useState("quantity")
  const [productSetting, setProductSetting] = useState("entire-shop")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [promoCode, setPromoCode] = useState("")
  const [tiers, setTiers] = useState([{ id: 1, quantity: "1", discount: "5" }])
  const [geoTargeting, setGeoTargeting] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([])
  const [locationSearch, setLocationSearch] = useState("")
  const router = useRouter()

  const brands = [
    { value: "all", label: "All Brands" },
    { value: "wai-wai", label: "Wai Wai" },
    { value: "chau-chau", label: "Chau Chau" },
    { value: "himalayan", label: "Himalayan" },
    { value: "everest", label: "Everest" },
  ]

  const discountTypes = [
    {
      id: "money-discount",
      title: "Money/Discount Off",
      icon: DollarSign,
      color: "text-red-600 bg-red-50 border-red-200",
    },
    {
      id: "free-gift",
      title: "Free gift/sample",
      icon: Gift,
      color: "text-pink-600 bg-pink-50 border-pink-200",
    },
    {
      id: "combo-buy",
      title: "Combo Buy",
      icon: ShoppingCart,
      color: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      id: "fixed-price",
      title: "Fixed Price",
      icon: Tag,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
  ]

  const setPresetPeriod = (type: "week" | "month") => {
    const start = new Date()
    const end = new Date()

    if (type === "week") {
      end.setDate(start.getDate() + 7)
    } else {
      end.setMonth(start.getMonth() + 1)
    }

    setStartDate(start)
    setEndDate(end)
  }

  const generatePromoCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPromoCode(result)
  }

  const addTier = () => {
    const newTier = {
      id: tiers.length + 1,
      quantity: "",
      discount: "",
    }
    setTiers([...tiers, newTier])
  }

  const updateTier = (id: number, field: string, value: string) => {
    setTiers(tiers.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)))
  }

  const removeTier = (id: number) => {
    if (tiers.length > 1) {
      setTiers(tiers.filter((tier) => tier.id !== id))
    }
  }

  const handleLocationToggle = (location: Location) => {
    setSelectedLocations((prev) => {
      const isSelected = prev.some((l) => l.id === location.id)
      if (isSelected) {
        return prev.filter((l) => l.id !== location.id)
      } else {
        return [...prev, location]
      }
    })
  }

  const removeLocation = (locationId: string) => {
    setSelectedLocations((prev) => prev.filter((l) => l.id !== locationId))
  }

  const filteredLocations = nepalLocations.filter((location) =>
    location.name.toLowerCase().includes(locationSearch.toLowerCase()),
  )

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "province":
        return "🏛️"
      case "district":
        return "🏘️"
      case "city":
        return "🏙️"
      default:
        return "📍"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Promotion</h1>
          <p className="text-gray-600">Set up your promotional campaign</p>
        </div>

        {/* Basic Promotion Setting */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Basic Promotion Setting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="promotion-name" className="text-sm font-medium text-gray-700 mb-2 block">
                Promotion Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="promotion-name"
                  value={promotionName}
                  onChange={(e) => setPromotionName(e.target.value)}
                  className="pr-16 h-10 border-gray-300"
                  maxLength={100}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {promotionName.length}/100
                </span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Effective Period <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mb-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 h-10 justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "yyyy-MM-dd HH:mm:ss") : "2025-07-09 18:54:32"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 h-10 justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "yyyy-MM-dd HH:mm:ss") : "2025-11-06 18:54:32"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPresetPeriod("week")}
                  className="text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  Set 1 Week
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPresetPeriod("month")}
                  className="text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  Set 1 Month
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discount Setting */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Discount Setting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Smart Value Section */}

            {/* Money/Discount Off Section */}
            <div className="p-4 border border-orange-200 w-1/2 rounded-lg bg-orange-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 border border-red-200">
                  <DollarSign className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Money/Discount Off</div>
                  <div className="text-xs text-gray-500">
                    Provide direct monetary savings or percentage-based discounts
                  </div>
                </div>
              </div>
            </div>

            {/* Discount Type Cards */}
            {/*
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {discountTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      discountType === type.id
                        ? "border-orange-300 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setDiscountType(type.id)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${type.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{type.title}</div>
                  </div>
                )
              })}
            </div>
            */}

            {/* Discount Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="money-value"
                  name="discount-mode"
                  value="money"
                  checked={discountMode === "money"}
                  onChange={(e) => setDiscountMode(e.target.value)}
                  className="text-orange-500 border-orange-300 focus:ring-orange-500"
                />
                <Label htmlFor="money-value" className="text-sm font-medium cursor-pointer">
                  Money Value Off
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="percentage"
                  name="discount-mode"
                  value="percentage"
                  checked={discountMode === "percentage"}
                  onChange={(e) => setDiscountMode(e.target.value)}
                  className="text-orange-500 border-orange-300 focus:ring-orange-500"
                />
                <Label htmlFor="percentage" className="text-sm font-medium cursor-pointer">
                  Percentage Discount Off
                </Label>
              </div>
            </div>

            {/* Discount Overview */}
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="text-sm font-medium text-orange-900 mb-1">Discount Overview:</h4>
              <p className="text-sm text-orange-800">
                Buy {tiers[0]?.quantity || 1} items get {tiers[0]?.discount || 5}
                {discountMode === "percentage" ? "%" : " रू"} off
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Deal Criteria */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Deal Criteria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="quantity-criteria"
                  name="deal-criteria"
                  value="quantity"
                  checked={dealCriteria === "quantity"}
                  onChange={(e) => setDealCriteria(e.target.value)}
                  className="text-orange-500 border-orange-300 focus:ring-orange-500"
                />
                <Label htmlFor="quantity-criteria" className="text-sm font-medium cursor-pointer">
                  Item Quantity Reaches X
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="value-criteria"
                  name="deal-criteria"
                  value="order-value"
                  checked={dealCriteria === "order-value"}
                  onChange={(e) => setDealCriteria(e.target.value)}
                  className="text-orange-500 border-orange-300 focus:ring-orange-500"
                />
                <Label htmlFor="value-criteria" className="text-sm font-medium cursor-pointer">
                  Order Value Reaches X
                </Label>
              </div>
            </div>

            {/* Tiers */}
            <div className="space-y-4">
              {tiers.map((tier, index) => (
                <div key={tier.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">Tier {index + 1}</h4>
                    {tiers.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTier(tier.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600 mb-1 block">If quantity value ≥=</Label>
                      <Input
                        value={tier.quantity}
                        onChange={(e) => updateTier(tier.id, "quantity", e.target.value)}
                        placeholder="1"
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600 mb-1 block">Discount would be</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={tier.discount}
                          onChange={(e) => updateTier(tier.id, "discount", e.target.value)}
                          placeholder="5"
                          className="flex-1 h-9"
                        />
                        <span className="text-sm text-gray-500">
                          {discountMode === "percentage" ? "% off" : "रू off"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addTier}
                className="text-orange-600 border-orange-300 hover:bg-orange-50 bg-transparent"
              >
                Add Tier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Setting */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Product setting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Discount Apply To <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="entire-shop"
                    name="product-setting"
                    value="entire-shop"
                    checked={productSetting === "entire-shop"}
                    onChange={(e) => setProductSetting(e.target.value)}
                    className="text-orange-500 border-orange-300 focus:ring-orange-500"
                  />
                  <Label htmlFor="entire-shop" className="text-sm font-medium cursor-pointer">
                    Entire Shop
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="specific-products"
                    name="product-setting"
                    value="specific-products"
                    checked={productSetting === "specific-products"}
                    onChange={(e) => setProductSetting(e.target.value)}
                    className="text-orange-500 border-orange-300 focus:ring-orange-500"
                  />
                  <Label htmlFor="specific-products" className="text-sm font-medium cursor-pointer">
                    Specific Products (Please select products after submission)
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Brand Selection</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Choose a brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.value} value={brand.value}>
                      {brand.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Targeting */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Geographic Targeting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="geo-targeting"
                checked={geoTargeting}
                onCheckedChange={setGeoTargeting}
                className="text-orange-500 border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label htmlFor="geo-targeting" className="text-sm font-medium cursor-pointer">
                Enable geographic targeting for this promotion
              </Label>
            </div>

            {geoTargeting && (
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Search Locations</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search provinces, districts, or cities..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="pl-10 h-10"
                    />
                  </div>
                </div>

                {/* Selected Locations */}
                {selectedLocations.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Selected Locations ({selectedLocations.length})
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocations.map((location) => (
                        <Badge
                          key={location.id}
                          variant="outline"
                          className="px-3 py-1 bg-orange-50 border-orange-200 text-orange-800"
                        >
                          <span className="mr-2">{getLocationIcon(location.type)}</span>
                          {location.name}
                          <button
                            onClick={() => removeLocation(location.id)}
                            className="ml-2 text-orange-600 hover:text-orange-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Locations */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Available Locations</Label>
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-white">
                    {filteredLocations.map((location) => {
                      const isSelected = selectedLocations.some((l) => l.id === location.id)
                      return (
                        <div
                          key={location.id}
                          className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                            isSelected ? "bg-orange-50 border-orange-200" : ""
                          }`}
                          onClick={() => handleLocationToggle(location)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{getLocationIcon(location.type)}</span>
                              <div>
                                <div className="font-medium text-gray-900">{location.name}</div>
                                <div className="text-xs text-gray-500 capitalize">{location.type}</div>
                              </div>
                            </div>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleLocationToggle(location)}
                              className="text-orange-500 border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promo Code Generation */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Promo Code Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Generate Promo Code (Optional)</Label>
              <div className="flex items-center gap-3">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter custom code or generate one"
                  className="flex-1 h-10"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generatePromoCode}
                  className="text-orange-600 border-orange-300 hover:bg-orange-50 bg-transparent"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Leave empty if no promo code is needed for this promotion</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" size="lg" className="px-8 bg-transparent" onClick={()=> router.push('/promotions')}>
            Cancel
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8" size="lg" onClick={()=> router.push('/promotions/products')}>
            Add Products
          </Button>
        </div>
      </div>
    </div>
  )
}
