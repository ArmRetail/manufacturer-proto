//@ts-nocheck
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Box,
  Tag,
  Truck,
  BarChart2,
  Megaphone,
  Settings,
  LifeBuoy,
  ShoppingCart,
  FileText,
  Receipt,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// --- Sidebar Configuration ---
const getSidebarConfig = (pendingOrders, newQuotes) => ({
  mainNav: [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Orders", icon: ShoppingCart, href: "/orders", badge: pendingOrders },
    { label: "Requests", icon: FileText, href: "/requests", badge: newQuotes },
    { label: "Billing Statements", icon: Receipt, href: "/billing" },
  ],
  catalogNav: [
    { label: "Products", icon: Box, href: "/products" },
    { label: "Brands", icon: Tag, href: "/brands" },
    { label: "Distributors", icon: Truck, href: "/distributors" },
  ],
  growthNav: [
    { label: "Analytics", icon: BarChart2, href: "/analytics" },
    { label: "Promotions", icon: Megaphone, href: "/promotions" },
  ],
  footerNav: [
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Help & Support", icon: LifeBuoy, href: "/help" },
  ],
})

// --- Reusable Sidebar Components ---
const SidebarItem = ({ item, pathname }) => {
  const { label, icon: Icon, href, badge } = item
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {badge > 0 && (
        <Badge
          className={cn(
            "ml-auto h-5 min-w-[20px] justify-center rounded-full text-xs",
            isActive ? "bg-white text-orange-700" : "bg-orange-100 text-orange-700",
          )}
        >
          {badge}
        </Badge>
      )}
    </Link>
  )
}

const SidebarSection = ({ title, children }) => (
  <div className="space-y-1">
    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
    {children}
  </div>
)

// --- Main Sidebar Component ---
export function AdminSidebar() {
  const pathname = usePathname()
  const [pendingOrders] = React.useState(12)
  const [newQuotes] = React.useState(5)

  const sidebarConfig = getSidebarConfig(pendingOrders, newQuotes)

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...")
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ARMRetail</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-6">
          <SidebarSection title="Menu">
            <div className="space-y-1">
              {sidebarConfig.mainNav.map((item) => (
                <SidebarItem key={item.label} item={item} pathname={pathname} />
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Catalog">
            <div className="space-y-1">
              {sidebarConfig.catalogNav.map((item) => (
                <SidebarItem key={item.label} item={item} pathname={pathname} />
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Growth">
            <div className="space-y-1">
              {sidebarConfig.growthNav.map((item) => (
                <SidebarItem key={item.label} item={item} pathname={pathname} />
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Support">
            <div className="space-y-1">
              {sidebarConfig.footerNav.map((item) => (
                <SidebarItem key={item.label} item={item} pathname={pathname} />
              ))}
            </div>
          </SidebarSection>
        </nav>
      </div>

      {/* Decorated Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          className="w-full border-red-600 text-red-600 "
          variant='outline'
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </aside>
  )
}

export default AdminSidebar
