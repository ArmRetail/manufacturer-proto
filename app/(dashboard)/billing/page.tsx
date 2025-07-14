"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock statement data
const mockStatements = [
  {
    statementNumber: "ARMRET001H-2024-044",
    period: "01 Jul 2024 - 31 Jul 2024",
    totalSales: 2450000,
    platformCharges: 147000, // 6% of sales
    paymentStatus: "paid",
  },
  {
    statementNumber: "ARMRET001H-2024-024",
    period: "01 Jun 2024 - 30 Jun 2024",
    totalSales: 2890000,
    platformCharges: 173400,
    paymentStatus: "paid",
  },
  {
    statementNumber: "ARMRET002H-2024-022",
    period: "01 May 2024 - 31 May 2024",
    totalSales: 1850000,
    platformCharges: 111000,
    paymentStatus: "unpaid",
  },
  {
    statementNumber: "ARMRET001H-2024-021",
    period: "01 Apr 2024 - 30 Apr 2024",
    totalSales: 3200000,
    platformCharges: 192000,
    paymentStatus: "paid",
  },
  {
    statementNumber: "ARMRET003H-2024-020",
    period: "01 Mar 2024 - 31 Mar 2024",
    totalSales: 920000,
    platformCharges: 55200,
    paymentStatus: "unpaid",
  },
  {
    statementNumber: "ARMRET002H-2024-019",
    period: "01 Feb 2024 - 29 Feb 2024",
    totalSales: 2100000,
    platformCharges: 126000,
    paymentStatus: "paid",
  },
  {
    statementNumber: "ARMRET001H-2024-017",
    period: "01 Jan 2024 - 31 Jan 2024",
    totalSales: 1450000,
    platformCharges: 87000,
    paymentStatus: "unpaid",
  },
]

export default function BillingStatementsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter statements
  const filteredStatements = useMemo(() => {
    let filtered = mockStatements

    if (statusFilter !== "all") {
      filtered = filtered.filter((stmt) => stmt.paymentStatus === statusFilter)
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (stmt) => stmt.statementNumber.toLowerCase().includes(search) || stmt.period.toLowerCase().includes(search),
      )
    }

    return filtered
  }, [statusFilter, searchTerm])

  const formatCurrency = (amount: number) => {
    return `NPR ${amount.toLocaleString()}`
  }

  const getPaymentStatusBadge = (status: string) => {
    if (status === "paid") {
      return <Badge className="bg-green-100 text-green-800 border-green-200 text-xs font-medium">Paid</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200 text-xs font-medium">Unpaid</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing Statements</h1>
            <p className="text-gray-600 mt-1">View platform charges and brand billing statements</p>
          </div>

          {/* Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-orange-800">
                <strong>Dear Brand Partner,</strong> please note that there may be a system delay affecting the
                automated updates of your billing statement. If you notice that your statement is not up to date, kindly
                reach out to our Partner Support Team for assistance.{" "}
                <button className="text-orange-600 underline hover:text-orange-700">Contact PSC</button>
              </div>
            </div>
          </div>

          {/* View Statements */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">View Statements</h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center cursor-help">
                      <span className="text-white text-xs">?</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      View detailed billing statements showing your sales, platform charges (6% commission), and payment
                      status. Click on any statement to see the complete breakdown of fees and transactions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-end mb-6">
                <div className="w-48">
                  <label className="block text-sm text-gray-600 mb-1">Payment Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full h-9">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-64">
                  <label className="block text-sm text-gray-600 mb-1">Statement Number</label>
                  <div className="relative">
                    <Input
                      placeholder="Search statement number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-9 pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setStatusFilter("all")
                    setSearchTerm("")
                  }}
                  className="h-9 bg-white"
                >
                  Reset
                </Button>
              </div>

              {/* Statements Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                        Statement Number
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                        Statement Period
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                        Total Sales
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                        Platform Charges (6%)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                        Payment Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredStatements.map((statement, index) => (
                      <tr key={statement.statementNumber} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-100">
                          {statement.statementNumber}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-100">{statement.period}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900 border-b border-gray-100">
                          {formatCurrency(statement.totalSales)}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-orange-600 border-b border-gray-100">
                          {formatCurrency(statement.platformCharges)}
                        </td>
                        <td className="px-4 py-4 border-b border-gray-100">
                          {getPaymentStatusBadge(statement.paymentStatus)}
                        </td>
                        <td className="px-4 py-4 border-b border-gray-100">
                          <Link
                            href={`/billing/statement`}
                            className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 hover:underline"
                          >
                            View Statement
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredStatements.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No statements found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
