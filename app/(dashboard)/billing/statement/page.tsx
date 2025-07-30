"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { useState } from "react"

// Mock statement data
const statementData = {
  statementId: "ARMRET001H-2024-044",
  period: "01 Jul 2024 - 31 Jul 2024",
  paymentStatus: "paid",
  paymentDate: "10 Aug 2024",
  totalSales: 835000,
  platformCommission: 50100, // 6% of sales
  otherDeductions: 0,
  netPayout: 784900, // totalSales - platformCommission - otherDeductions
  totalOrders: 156,
}

// Mock order data with product details
const mockOrders = Array.from({ length: 156 }, (_, i) => ({
  id: `ORD-${String(i + 1).padStart(4, "0")}`,
  date: new Date(2024, 6, Math.floor(Math.random() * 31) + 1).toLocaleDateString("en-GB"),
  retailer: `Himalayan Sunrise Retailers only for you ${i + 1}`,
  panNo: `PAN${String(i + 1).padStart(6, "0")}`,
  productName:
    i % 3 === 0
      ? `Premium Quality Organic Basmati Rice Extra Long Grain Premium Pack`
      : i % 3 === 1
        ? `Smartphone Case`
        : `Wireless Headphones`,
  quantity: Math.floor(Math.random() * 5) + 1,
  amount: Math.floor(Math.random() * 10000) + 1000,
  status: "Delivered",
}))

export default function StatementDetailPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10
  const totalPages = Math.ceil(mockOrders.length / ordersPerPage)

  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const currentOrders = mockOrders.slice(startIndex, endIndex)

  const formatCurrency = (amount: number) => {
    return `NPR ${amount.toLocaleString()}`
  }

  const getPaymentStatusBadge = (status: string) => {
    if (status === "paid") {
      return <Badge className="bg-green-100 text-green-700 border-green-200 font-medium text-xs">Paid</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-700 border-red-200 font-medium text-xs">Unpaid</Badge>
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Simple Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/billing">
                <Button variant="outline" size="sm" className="bg-white border-orange-300 text-orange-600 ">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Statements
                </Button>
              </Link>
            </div>
          </div>

          {/* Statement Overview */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-medium text-gray-700">Statement Overview</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Overview of your billing statement for the specified period</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              {/* Main Amount */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-orange-600 mb-4">{formatCurrency(statementData.netPayout)}</div>
              </div>

              {/* Statement Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <span className="text-gray-600">Statement Number:</span>
                  <div className="font-medium text-gray-900">{statementData.statementId}</div>
                </div>
                <div>
                  <span className="text-gray-600">Statement Period:</span>
                  <div className="font-medium text-gray-900">{statementData.period}</div>
                </div>
                <div>
                  <span className="text-gray-600">Payment Status:</span>
                  <div className="mt-1">{getPaymentStatusBadge(statementData.paymentStatus)}</div>
                </div>
                {statementData.paymentStatus === "paid" && (
                  <div>
                    <span className="text-gray-600">Payout Date:</span>
                    <div className="font-medium text-gray-900">{statementData.paymentDate}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Commission Summary */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-gray-700">Commission Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Table Header */}
                <div className="grid grid-cols-2 gap-4 py-3 text-sm font-medium text-gray-600 border-b border-gray-200">
                  <div>Field</div>
                  <div className="text-right">Value</div>
                </div>

                {/* Total Sales */}
                <div className="grid grid-cols-2 gap-4 py-3 text-sm border-b border-gray-100">
                  <div className="text-gray-700">Total Sales This Period</div>
                  <div className="text-right font-medium">{formatCurrency(statementData.totalSales)}</div>
                </div>

                {/* Platform Commission */}
                <div className="grid grid-cols-2 gap-4 py-3 text-sm border-b border-gray-100">
                  <div className="text-gray-700">Platform Commission (6%)</div>
                  <div className="text-right font-medium text-red-600">
                    -{formatCurrency(statementData.platformCommission)}
                  </div>
                </div>

                {/* Other Deductions (if any) */}
                {statementData.otherDeductions > 0 && (
                  <div className="grid grid-cols-2 gap-4 py-3 text-sm border-b border-gray-100">
                    <div className="text-gray-700">Other Deductions</div>
                    <div className="text-right font-medium text-red-600">
                      -{formatCurrency(statementData.otherDeductions)}
                    </div>
                  </div>
                )}

                {/* Net Payout */}
                <div className="grid grid-cols-2 gap-4 py-4 text-sm font-medium border-t border-gray-300 bg-gray-50">
                  <div className="text-gray-900">Net Payout</div>
                  <div className="text-right text-lg font-bold">{formatCurrency(statementData.netPayout)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-medium text-gray-700">Order Details</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Detailed breakdown of all orders included in this statement</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, mockOrders.length)} of {mockOrders.length} orders
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Order & Date</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Retailer</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Product</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm">
                          <div className="font-medium text-gray-900">Order {order.id}</div>
                          <div className="text-gray-600 text-xs flex flex-row gap-2"> <div className="text-orange-600">Placed: </div> {order.date}</div>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          <div className="font-medium text-gray-900">{order.retailer}</div>
                          <div className="text-gray-600 text-xs flex flex-row gap-2"> <div className="text-orange-600">PAN:</div> {order.panNo}</div>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {order.productName.length > 30 ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-help">
                                  <div className="font-medium text-gray-900">{truncateText(order.productName, 30)}</div>
                                  <div className="text-gray-600 text-xs flex flex-row gap-2"><div className="text-orange-600">Qty:</div> {order.quantity}</div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{order.productName}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <div>
                              <div className="font-medium text-gray-900">{order.productName}</div>
                              <div className="text-gray-600 text-xs flex flex-row gap-2"><div className="text-orange-600">Qty:</div> {order.quantity}</div>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-2 text-sm text-right font-medium">{formatCurrency(order.amount)}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge className="bg-green-100 text-green-700 border-green-200 font-medium text-xs">
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50 " : ""}
                      />
                    </PaginationItem>

                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(1)
                            }}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {/* Current page and surrounding pages */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                      if (pageNumber <= totalPages) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(pageNumber)
                              }}
                              isActive={currentPage === pageNumber}
                              
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      }
                      return null
                    })}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(totalPages)
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50 " : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
