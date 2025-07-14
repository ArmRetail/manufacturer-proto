"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Download, ChevronDown, FileText, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

// Mock statement data
const statementData = {
  statementId: "ARMRET001H-2024-044",
  period: "01 Jul 2024 - 31 Jul 2024",
  paymentStatus: "paid", // or "unpaid"
  paymentDate: "10 Aug 2024",
  totalSales: 835000,
  platformCommission: 50100, // 6% of sales
  otherDeductions: 0,
  netPayout: 784900, // totalSales - platformCommission - otherDeductions
  totalOrders: 156,
}

export default function StatementDetailPage() {
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

  const handleViewOrderBreakdown = () => {
    // Extract dates from period for URL parameters
    const [startDate, endDate] = statementData.period.split(" - ")
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0]
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0]

    // Redirect to orders page with date range
    window.location.href = `/orders`
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white border-orange-300 text-orange-600 ">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Download CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <div className="text-right font-medium">{formatCurrency(statementData.platformCommission)}</div>
                </div>

                {/* Other Deductions (if any) */}
                {statementData.otherDeductions > 0 && (
                  <div className="grid grid-cols-2 gap-4 py-3 text-sm border-b border-gray-100">
                    <div className="text-gray-700">Other Deductions</div>
                    <div className="text-right font-medium">{formatCurrency(statementData.otherDeductions)}</div>
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

          {/* Statement Detail */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-medium text-gray-700">Statement Detail</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Detailed breakdown of orders included in this statement</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="mb-4">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">View Order Details</h3>
                  <p className="text-gray-600 mb-6">
                    This statement includes {statementData.totalOrders} orders from the period{" "}
                    <span className="font-medium">{statementData.period}</span>
                  </p>
                </div>
                <Button onClick={handleViewOrderBreakdown} className="bg-orange-600 hover:bg-orange-700 text-white px-6">
                  View Order Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
