"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Building2, Settings, ArrowLeft, Percent, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface DeliveryLocation {
  id: string
  name: string
  address: string
}

interface RebateTier {
  id: string
  minSales: number
  maxSales: number | null
  percentage: number
}

interface Distributor {
  id: string
  name: string
  email: string
  phone: string
  assignedLocations: string[]
  rebateTiers: RebateTier[]
}

const deliveryLocations: DeliveryLocation[] = [
  { id: "1", name: "Thamel", address: "Thamel, Kathmandu" },
  { id: "2", name: "Patan Durbar Square", address: "Patan Durbar Square, Lalitpur" },
  { id: "3", name: "Bhaktapur Durbar Square", address: "Bhaktapur Durbar Square, Bhaktapur" },
  { id: "4", name: "Lakeside", address: "Lakeside, Pokhara" },
  { id: "5", name: "New Road", address: "New Road, Kathmandu" },
  { id: "6", name: "Asan Bazaar", address: "Asan Bazaar, Kathmandu" },
  { id: "7", name: "Jawalakhel", address: "Jawalakhel, Lalitpur" },
  { id: "8", name: "Baneshwor", address: "Baneshwor, Kathmandu" },
  { id: "9", name: "Putalisadak", address: "Putalisadak, Kathmandu" },
  { id: "10", name: "Maharajgunj", address: "Maharajgunj, Kathmandu" },
  { id: "11", name: "Durbarmarg", address: "Durbarmarg, Kathmandu" },
  { id: "12", name: "Kalanki", address: "Kalanki, Kathmandu" },
  { id: "13", name: "Koteshwor", address: "Koteshwor, Kathmandu" },
  { id: "14", name: "Chabahil", address: "Chabahil, Kathmandu" },
  { id: "15", name: "Balaju", address: "Balaju, Kathmandu" },
  { id: "16", name: "Biratnagar Main Road", address: "Main Road, Biratnagar" },
  { id: "17", name: "Birgunj Parsa Bazaar", address: "Parsa Bazaar, Birgunj" },
  { id: "18", name: "Pokhara Mahendrapul", address: "Mahendrapul, Pokhara" },
  { id: "19", name: "Butwal Traffic Chowk", address: "Traffic Chowk, Butwal" },
  { id: "20", name: "Dharan Clock Tower", address: "Clock Tower, Dharan" },
]

const distributors: Distributor[] = [
  {
    id: "1",
    name: "Himalayan Distribution Co.",
    email: "contact@himalayandist.com",
    phone: "+977-1-4567890",
    assignedLocations: ["1", "2", "3"],
    rebateTiers: [{ id: "1", minSales: 0, maxSales: null, percentage: 2 }],
  },
  {
    id: "2",
    name: "Nepal Supply Chain Ltd.",
    email: "info@nepalsupply.com",
    phone: "+977-1-2345678",
    assignedLocations: ["4", "18"],
    rebateTiers: [
      { id: "1", minSales: 5000000, maxSales: 10000000, percentage: 2 },
      { id: "2", minSales: 10000000, maxSales: 20000000, percentage: 4 },
      { id: "3", minSales: 20000000, maxSales: null, percentage: 6 },
    ],
  },
  {
    id: "3",
    name: "Everest Logistics Network",
    email: "hello@everestlogistics.com",
    phone: "+977-21-567890",
    assignedLocations: ["16", "17", "20"],
    rebateTiers: [{ id: "1", minSales: 0, maxSales: null, percentage: 4 }],
  },
  {
    id: "4",
    name: "Terai Distribution Services",
    email: "support@teraidist.com",
    phone: "+977-51-234567",
    assignedLocations: ["19"],
    rebateTiers: [{ id: "1", minSales: 0, maxSales: null, percentage: 2.5 }],
  },
]

export default function BrandDistributorPage() {
  const [distributorSearch, setDistributorSearch] = useState("")
  const [locationSearch, setLocationSearch] = useState("")
  const [distributorAssignments, setDistributorAssignments] = useState<Record<string, string[]>>(
    distributors.reduce(
      (acc, dist) => {
        acc[dist.id] = [...dist.assignedLocations]
        return acc
      },
      {} as Record<string, string[]>,
    ),
  )
  const [rebateSettings, setRebateSettings] = useState<Record<string, RebateTier[]>>(
    distributors.reduce(
      (acc, dist) => {
        acc[dist.id] = [...dist.rebateTiers]
        return acc
      },
      {} as Record<string, RebateTier[]>,
    ),
  )

  const filteredDistributors = distributors.filter(
    (distributor) =>
      distributor.name.toLowerCase().includes(distributorSearch.toLowerCase()) ||
      distributor.email.toLowerCase().includes(distributorSearch.toLowerCase()),
  )

  const filteredLocations = deliveryLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
      location.address.toLowerCase().includes(locationSearch.toLowerCase()),
  )

  const handleLocationToggle = (distributorId: string, locationId: string) => {
    setDistributorAssignments((prev) => {
      const currentAssignments = prev[distributorId] || []
      const isAssigned = currentAssignments.includes(locationId)
      return {
        ...prev,
        [distributorId]: isAssigned
          ? currentAssignments.filter((id) => id !== locationId)
          : [...currentAssignments, locationId],
      }
    })
  }

  const handleSaveAssignments = () => {
    console.log("Saving assignments:", distributorAssignments)
    alert("Assignments saved successfully!")
  }

  const handleSaveRebate = (distributorId: string) => {
    console.log("Saving rebate settings:", rebateSettings[distributorId])
    alert("Rebate settings saved successfully!")
  }

  const handleClearAll = (distributorId: string) => {
    setDistributorAssignments((prev) => ({
      ...prev,
      [distributorId]: [],
    }))
  }

  const handleAddTier = (distributorId: string) => {
    const newTier: RebateTier = {
      id: Date.now().toString(),
      minSales: 0,
      maxSales: null,
      percentage: 0,
    }
    setRebateSettings((prev) => ({
      ...prev,
      [distributorId]: [...(prev[distributorId] || []), newTier],
    }))
  }

  const handleRemoveTier = (distributorId: string, tierId: string) => {
    setRebateSettings((prev) => ({
      ...prev,
      [distributorId]: prev[distributorId]?.filter((tier) => tier.id !== tierId) || [],
    }))
  }

  const handleTierChange = (
    distributorId: string,
    tierId: string,
    field: "minSales" | "maxSales" | "percentage",
    value: number | null,
  ) => {
    setRebateSettings((prev) => ({
      ...prev,
      [distributorId]:
        prev[distributorId]?.map((tier) => (tier.id === tierId ? { ...tier, [field]: value } : tier)) || [],
    }))
  }

  const isLocationAssignedToOther = (locationId: string, currentDistributorId: string) => {
    return distributors.some(
      (dist) => dist.id !== currentDistributorId && distributorAssignments[dist.id]?.includes(locationId),
    )
  }

  const getAssignedDistributorName = (locationId: string, currentDistributorId: string) => {
    const assignedDistributor = distributors.find(
      (dist) => dist.id !== currentDistributorId && distributorAssignments[dist.id]?.includes(locationId),
    )
    return assignedDistributor?.name
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${amount.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Link href="/brands">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Brands
                </Button>
              </Link>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Brand Access Management</h1>
              <p className="text-gray-600">
                Manage delivery locations and rebate settings for your distribution partners
              </p>
            </div>

            {/* Main Search Bar */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search distributors..."
                  value={distributorSearch}
                  onChange={(e) => setDistributorSearch(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Distributors Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">Distributor</TableHead>
                <TableHead className="font-semibold text-gray-900">Contact Information</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Assigned Locations</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDistributors.map((distributor) => (
                <TableRow key={distributor.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold text-gray-900">{distributor.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900">{distributor.email}</div>
                      <div className="text-sm text-gray-600">{distributor.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-800 rounded-full font-semibold text-sm">
                      {distributorAssignments[distributor.id]?.length || 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
                         
                        >
                          <Settings className="h-4 w-4" />
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="min-w-5xl min-h-[90vh] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-orange-600" />
                            Manage {distributor.name}
                          </DialogTitle>
                        </DialogHeader>

                        <Tabs defaultValue="locations" className="w-full">
                          <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-gray-100 rounded-lg">
                            <TabsTrigger
                              value="locations"
                              className="flex items-center gap-2 h-10 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-orange-700 data-[state=active]:border data-[state=active]:border-orange-200 transition-all"
                            >
                              <MapPin className="h-4 w-4" />
                              <span className="font-medium">Delivery Zones</span>
                            </TabsTrigger>
                            <TabsTrigger
                              value="rebates"
                              className="flex items-center gap-2 h-10 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-orange-700 data-[state=active]:border data-[state=active]:border-orange-200 transition-all"
                            >
                              <Percent className="h-4 w-4" />
                              <span className="font-medium">Rebate Settings</span>
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="locations" className="space-y-4 mt-6">
                            {/* Location Search */}
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                placeholder="Search locations or addresses..."
                                value={locationSearch}
                                onChange={(e) => setLocationSearch(e.target.value)}
                                className="pl-10 border-gray-300"
                              />
                            </div>

                            {/* Assignment Summary */}
                            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-orange-600" />
                                <p className="text-sm font-medium text-orange-800">
                                  <strong>{distributorAssignments[distributor.id]?.length || 0}</strong> of{" "}
                                  {deliveryLocations.length} locations assigned
                                </p>
                              </div>
                            </div>

                            {/* Locations Grid */}
                            <ScrollArea className="h-80 w-full border rounded-lg p-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {filteredLocations.map((location) => {
                                  const isCurrentlyAssigned = distributorAssignments[distributor.id]?.includes(
                                    location.id,
                                  )
                                  const isAssignedToOther = isLocationAssignedToOther(location.id, distributor.id)
                                  const assignedDistributorName = getAssignedDistributorName(
                                    location.id,
                                    distributor.id,
                                  )

                                  return (
                                    <div key={location.id} className="space-y-2">
                                      <div
                                        className={`flex items-start space-x-3 p-3 border rounded-lg transition-all hover:shadow-sm ${
                                          isCurrentlyAssigned
                                            ? "border-orange-200 bg-orange-50 shadow-sm"
                                            : isAssignedToOther && !isCurrentlyAssigned
                                              ? "border-red-200 bg-red-50"
                                              : "border-gray-200 bg-white hover:bg-gray-50"
                                        }`}
                                      >
                                        <Checkbox
                                          id={`${distributor.id}-${location.id}`}
                                          checked={isCurrentlyAssigned || false}
                                          disabled={isAssignedToOther && !isCurrentlyAssigned}
                                          onCheckedChange={() => handleLocationToggle(distributor.id, location.id)}
                                          className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600 disabled:opacity-50"
                                        />
                                        <div className="flex-1 min-w-0">
                                          <label
                                            htmlFor={`${distributor.id}-${location.id}`}
                                            className={`text-sm font-medium cursor-pointer block ${
                                              isAssignedToOther && !isCurrentlyAssigned
                                                ? "text-red-700"
                                                : "text-gray-900"
                                            }`}
                                          >
                                            {location.name}
                                          </label>
                                          <p
                                            className={`text-xs mt-1 truncate ${
                                              isAssignedToOther && !isCurrentlyAssigned
                                                ? "text-red-600"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            {location.address}
                                          </p>
                                          {isAssignedToOther && !isCurrentlyAssigned && (
                                            <Badge variant="destructive" className="mt-2 text-xs">
                                              Assigned to {assignedDistributorName}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>

                              {filteredLocations.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                  <p>No locations found</p>
                                </div>
                              )}
                            </ScrollArea>

                            {/* Actions */}
                            <div className="flex justify-between pt-4 border-t">
                              <Button
                                variant="outline"
                                onClick={() => handleClearAll(distributor.id)}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                              >
                                Clear All
                              </Button>
                              <Button
                                onClick={() => {
                                  handleSaveAssignments()
                                  setLocationSearch("")
                                }}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                              >
                                Save Changes
                              </Button>
                            </div>
                          </TabsContent>

                          <TabsContent value="rebates" className="space-y-6 mt-6 h-96 flex flex-col">
                            <Card className="border-orange-200 flex-1 flex flex-col">
                              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg flex-shrink-0">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="flex items-center gap-2">
                                    <Percent className="h-5 w-5 text-orange-600" />
                                    Rebate Configuration
                                  </CardTitle>
                                  <Button
                                    onClick={() => handleAddTier(distributor.id)}
                                    size="sm"
                                    className="gap-2 bg-orange-600 hover:bg-orange-700"
                                  >
                                    <Plus className="h-4 w-4" />
                                    Add Tier
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-6 flex-1 overflow-hidden">
                                <ScrollArea className="max-h-80 overflow-y-scroll">
                                  <div className="space-y-4 pr-4 overflow-hidden">
                                    {rebateSettings[distributor.id]?.map((tier, index) => (
                                      <div key={tier.id} className="p-4 border rounded-lg bg-gray-50">
                                        <div className="flex items-center justify-between mb-3">
                                          <Badge variant="outline" className="text-orange-700 border-orange-200">
                                            Tier {index + 1}
                                          </Badge>
                                          {rebateSettings[distributor.id]?.length > 1 && (
                                            <Button
                                              onClick={() => handleRemoveTier(distributor.id, tier.id)}
                                              size="sm"
                                              variant="outline"
                                              className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                              Remove
                                            </Button>
                                          )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          <div className="space-y-2">
                                            <Label>Min Sales</Label>
                                            <Input
                                              type="number"
                                              placeholder="Minimum sales"
                                              value={tier.minSales || ""}
                                              onChange={(e) =>
                                                handleTierChange(
                                                  distributor.id,
                                                  tier.id,
                                                  "minSales",
                                                  Number.parseInt(e.target.value) || 0,
                                                )
                                              }
                                              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                            <p className="text-xs text-gray-500">
                                              {formatCurrency(tier.minSales || 0)}
                                            </p>
                                          </div>
                                          <div className="space-y-2">
                                            <Label>Max Sales (Optional)</Label>
                                            <Input
                                              type="number"
                                              placeholder="Maximum sales"
                                              value={tier.maxSales || ""}
                                              onChange={(e) =>
                                                handleTierChange(
                                                  distributor.id,
                                                  tier.id,
                                                  "maxSales",
                                                  e.target.value ? Number.parseInt(e.target.value) : null,
                                                )
                                              }
                                              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                            <p className="text-xs text-gray-500">
                                              {tier.maxSales ? formatCurrency(tier.maxSales) : "No limit"}
                                            </p>
                                          </div>
                                          <div className="space-y-2">
                                            <Label>Rebate %</Label>
                                            <Input
                                              type="number"
                                              step="0.1"
                                              min="0"
                                              max="100"
                                              placeholder="Percentage"
                                              value={tier.percentage || ""}
                                              onChange={(e) =>
                                                handleTierChange(
                                                  distributor.id,
                                                  tier.id,
                                                  "percentage",
                                                  Number.parseFloat(e.target.value) || 0,
                                                )
                                              }
                                              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                            <p className="text-xs text-gray-500">{tier.percentage || 0}%</p>
                                          </div>
                                        </div>
                                      </div>
                                    )) || []}

                                    {(!rebateSettings[distributor.id] ||
                                      rebateSettings[distributor.id]?.length === 0) && (
                                      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                        <Percent className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                        <p>No rebate tiers configured</p>
                                        <p className="text-sm">Click "Add Tier" to create your first rebate tier</p>
                                      </div>
                                    )}
                                  </div>
                                </ScrollArea>
                              </CardContent>
                            </Card>

                            {/* Save button outside the card */}
                            <div className="flex justify-end pt-4 border-t bg-white px-6 py-4 rounded-b-lg">
                              <Button
                                onClick={() => handleSaveRebate(distributor.id)}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                              >
                                Save Rebate Settings
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDistributors.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No distributors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
