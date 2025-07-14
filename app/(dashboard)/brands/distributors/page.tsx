"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MapPin, Building2, Settings } from "lucide-react"

interface DeliveryLocation {
  id: string
  name: string
  address: string
}

interface Distributor {
  id: string
  name: string
  email: string
  phone: string
  assignedLocations: string[]
}

const deliveryLocations: DeliveryLocation[] = [
  { id: "1", name: "Kathmandu", address: "Kathmandu Metropolitan City, Bagmati Province" },
  { id: "2", name: "Lalitpur", address: "Lalitpur Metropolitan City, Bagmati Province" },
  { id: "3", name: "Bhaktapur", address: "Bhaktapur Municipality, Bagmati Province" },
  { id: "4", name: "Pokhara", address: "Pokhara Metropolitan City, Gandaki Province" },
  { id: "5", name: "Biratnagar", address: "Biratnagar Metropolitan City, Koshi Province" },
  { id: "6", name: "Birgunj", address: "Birgunj Metropolitan City, Madhesh Province" },
  { id: "7", name: "Dharan", address: "Dharan Sub-Metropolitan City, Koshi Province" },
  { id: "8", name: "Bharatpur", address: "Bharatpur Metropolitan City, Bagmati Province" },
  { id: "9", name: "Janakpur", address: "Janakpur Sub-Metropolitan City, Madhesh Province" },
  { id: "10", name: "Hetauda", address: "Hetauda Sub-Metropolitan City, Bagmati Province" },
  { id: "11", name: "Butwal", address: "Butwal Sub-Metropolitan City, Lumbini Province" },
  { id: "12", name: "Dhangadhi", address: "Dhangadhi Sub-Metropolitan City, Sudurpashchim Province" },
  { id: "13", name: "Mahendranagar", address: "Mahendranagar Municipality, Sudurpashchim Province" },
  { id: "14", name: "Nepalgunj", address: "Nepalgunj Sub-Metropolitan City, Lumbini Province" },
  { id: "15", name: "Ghorahi", address: "Ghorahi Sub-Metropolitan City, Lumbini Province" },
  { id: "16", name: "Tulsipur", address: "Tulsipur Sub-Metropolitan City, Lumbini Province" },
  { id: "17", name: "Rajbiraj", address: "Rajbiraj Municipality, Madhesh Province" },
  { id: "18", name: "Siddharthanagar", address: "Siddharthanagar Municipality, Lumbini Province" },
  { id: "19", name: "Kalaiya", address: "Kalaiya Sub-Metropolitan City, Madhesh Province" },
  { id: "20", name: "Jitpur Simara", address: "Jitpur Simara Sub-Metropolitan City, Madhesh Province" },
  { id: "21", name: "Gorkha", address: "Gorkha Municipality, Gandaki Province" },
  { id: "22", name: "Baglung", address: "Baglung Municipality, Gandaki Province" },
  { id: "23", name: "Tansen", address: "Tansen Municipality, Lumbini Province" },
  { id: "24", name: "Dhulikhel", address: "Dhulikhel Municipality, Bagmati Province" },
  { id: "25", name: "Banepa", address: "Banepa Municipality, Bagmati Province" },
  { id: "26", name: "Itahari", address: "Itahari Sub-Metropolitan City, Koshi Province" },
  { id: "27", name: "Triyuga", address: "Triyuga Municipality, Koshi Province" },
  { id: "28", name: "Damak", address: "Damak Municipality, Koshi Province" },
  { id: "29", name: "Mechinagar", address: "Mechinagar Municipality, Koshi Province" },
  { id: "30", name: "Birtamod", address: "Birtamod Municipality, Koshi Province" },
]

const distributors: Distributor[] = [
  {
    id: "1",
    name: "Himalayan Distribution Co.",
    email: "contact@himalayandist.com",
    phone: "+977-1-4567890",
    assignedLocations: ["1", "2", "3", "24"],
  },
  {
    id: "2",
    name: "Nepal Supply Chain Ltd.",
    email: "info@nepalsupply.com",
    phone: "+977-1-2345678",
    assignedLocations: ["4", "21", "22"],
  },
  {
    id: "3",
    name: "Everest Logistics Network",
    email: "hello@everestlogistics.com",
    phone: "+977-21-567890",
    assignedLocations: ["5", "6", "26", "27", "28"],
  },
  {
    id: "4",
    name: "Terai Distribution Services",
    email: "support@teraidist.com",
    phone: "+977-51-234567",
    assignedLocations: ["9", "17", "19"],
  },
  {
    id: "5",
    name: "Mountain Express Hub",
    email: "contact@mountainexpress.com",
    phone: "+977-81-345678",
    assignedLocations: ["12", "13", "14", "15", "16"],
  },
  {
    id: "6",
    name: "Valley Transport Solutions",
    email: "info@valleytransport.com",
    phone: "+977-1-8765432",
    assignedLocations: ["8", "10", "25"],
  },
  {
    id: "7",
    name: "Eastern Nepal Logistics",
    email: "support@easternlogistics.com",
    phone: "+977-25-678901",
    assignedLocations: ["7", "29", "30"],
  },
  {
    id: "8",
    name: "Western Freight Network",
    email: "contact@westernfreight.com",
    phone: "+977-71-456789",
    assignedLocations: ["18", "20", "23"],
  },
]

export default function BrandDistributorPage() {
  const [distributorSearch, setDistributorSearch] = useState("")
  const [locationSearch, setLocationSearch] = useState("")
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(null)
  const [distributorAssignments, setDistributorAssignments] = useState<Record<string, string[]>>(
    distributors.reduce(
      (acc, dist) => {
        acc[dist.id] = [...dist.assignedLocations]
        return acc
      },
      {} as Record<string, string[]>,
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

  const handleClearAll = (distributorId: string) => {
    setDistributorAssignments((prev) => ({
      ...prev,
      [distributorId]: [],
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Brand Access Management</h1>
              <p className="text-gray-600">Manage and assign delivery locations to your distribution partners</p>
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
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
                          onClick={() => setSelectedDistributor(distributor.id)}
                        >
                          <Settings className="h-4 w-4" />
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="min-w-4xl max-h-[80vh] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-orange-600" />
                            Assign Locations - {distributor.name}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 overflow-hidden">
                          {/* Location Search */}
                          <div className="relative bg-white">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search locations or addresses..."
                              value={locationSearch}
                              onChange={(e) => setLocationSearch(e.target.value)}
                              className="pl-10 border-gray-300 !bg-white "
                            />
                          </div>

                          {/* Assignment Summary */}
                          <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                            <p className="text-sm text-orange-800">
                              <strong>{distributorAssignments[distributor.id]?.length || 0}</strong> of{" "}
                              {deliveryLocations.length} locations assigned
                            </p>
                          </div>

                          {/* Locations Grid */}
                          <ScrollArea className="h-80 w-full border rounded-md p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {filteredLocations.map((location) => {
                                const isCurrentlyAssigned = distributorAssignments[distributor.id]?.includes(
                                  location.id,
                                )
                                const isAssignedToOther = isLocationAssignedToOther(location.id, distributor.id)
                                const assignedDistributorName = getAssignedDistributorName(location.id, distributor.id)

                                return (
                                  <div key={location.id} className="space-y-2">
                                    <div
                                      className={`flex items-start space-x-3 p-3 border rounded-md transition-colors ${
                                        isAssignedToOther && !isCurrentlyAssigned
                                          ? "border-red-200 bg-red-50"
                                          : "border-gray-200 hover:bg-gray-50"
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
                                            isAssignedToOther && !isCurrentlyAssigned ? "text-red-700" : "text-gray-900"
                                          }`}
                                        >
                                          {location.name}
                                        </label>
                                        <p
                                          className={`text-xs mt-1 truncate ${
                                            isAssignedToOther && !isCurrentlyAssigned ? "text-red-600" : "text-gray-500"
                                          }`}
                                        >
                                          {location.address}
                                        </p>
                                        {isAssignedToOther && !isCurrentlyAssigned && (
                                          <p className="text-xs text-red-600 mt-1 font-medium">
                                            Assigned to {assignedDistributorName}
                                          </p>
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

                          {/* Dialog Actions */}
                          <div className="flex justify-end gap-2 pt-4 border-t">
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
                        </div>
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
