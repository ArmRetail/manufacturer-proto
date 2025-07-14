"use client"

import {
  Bell,
  ChevronDown,
  Building2,
  UserCircle,
  LogOut,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader as SheetHeaderUI,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet"
import { useState } from "react"

export function AdminHeader() {
  const [companyDropdown, setCompanyDropdown] = useState(false)

  const notifications = [
    {
      id: 1,
      type: "order",
      icon: Package,
      title: "Order #12345 shipped",
      description: "Your order has been dispatched and is on the way",
      time: "2 hours ago",
      unread: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      type: "distributor",
      icon: UserCircle,
      title: "New distributor registered",
      description: "ABC Distributors has joined your network",
      time: "5 hours ago",
      unread: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      type: "brand",
      icon: CheckCircle,
      title: 'Brand "Acme" added',
      description: "New brand has been successfully added to catalog",
      time: "1 day ago",
      unread: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      type: "alert",
      icon: AlertTriangle,
      title: "Low stock alert",
      description: "5 products are running low on inventory",
      time: "2 days ago",
      unread: false,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: 5,
      type: "order",
      icon: Clock,
      title: "Payment pending",
      description: "Order #12340 payment is still pending",
      time: "3 days ago",
      unread: false,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-6 justify-end ">
   

      {/* Right Side - User Info & Notifications */}
      <div className="flex items-center gap-4">
        {/* Notification Bell with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-orange-200">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-80 sm:w-96">
            <SheetHeaderUI className="border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100 p-6">
              <SheetTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                Notifications
              </SheetTitle>
              <SheetDescription className="text-gray-600">You have {unreadCount} new notifications</SheetDescription>
            </SheetHeaderUI>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      notification.unread ? "bg-orange-25" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${notification.bgColor}`}>
                        <IconComponent className={`w-4 h-4 ${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-800 text-sm">{notification.title}</p>
                          {notification.unread && <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All Notifications
              </button>
            </div>
          </SheetContent>
        </Sheet>

        {/* User Profile Dropdown */}
        <div className="relative">
             {/* Company/Manufacturer Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-200">
          <Building2 className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-800">Acme Manufacturing Ltd.</span>
          <Badge className="bg-orange-100 text-orange-700 text-xs">Exporter</Badge>
        </div>
      </div>

        </div>
      </div>
    </header>
  )
}

export default AdminHeader
