"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Building,
  Lock,
  LogOut,
  Trash2,
  Edit,
  MapPin,
  Phone,
  Mail,
  FileText,
  Building2,
  Eye,
  EyeOff,
  Upload,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
} from "lucide-react"

// Mock user data
const mockUserData = {
  fullName: "Ram Kumar Sharma",
  email: "ram.sharma@waiwaifood.com",
  phone: "+977-9841234567",
  role: "Manufacturer",
  profileImage: "/placeholder.svg?height=80&width=80",
  businessName: "Wai Wai Food Industries Pvt. Ltd.",
  panNumber: "301234567",
  vatNumber: "600123456",
  businessType: "Manufacturer",
  registeredAddress: "Industrial District, Hetauda-4, Makwanpur, Nepal",
  operatingRegions: ["Bagmati Province", "Gandaki Province", "Lumbini Province"],
}

// Mock documents data
const mockDocuments = {
  panDocuments: [
    {
      id: "PAN-001",
      name: "PAN Certificate",
      fileName: "pan_certificate.pdf",
      uploadedDate: "2024-01-15",
      status: "verified",
      size: "2.4 MB",
    },
    {
      id: "PAN-002",
      name: "PAN Registration Copy",
      fileName: "pan_registration.pdf",
      uploadedDate: "2024-01-15",
      status: "verified",
      size: "1.8 MB",
    },
  ],
  brandDocuments: [
    {
      id: "BRAND-001",
      name: "Wai Wai Brand License",
      fileName: "wai_wai_license.pdf",
      uploadedDate: "2024-01-10",
      status: "verified",
      size: "3.2 MB",
    },
    {
      id: "BRAND-002",
      name: "Trademark Certificate",
      fileName: "trademark_cert.pdf",
      uploadedDate: "2024-01-10",
      status: "pending",
      size: "2.1 MB",
    },
    {
      id: "BRAND-003",
      name: "Product Authentication",
      fileName: "product_auth.pdf",
      uploadedDate: "2024-01-12",
      status: "rejected",
      size: "1.9 MB",
      rejectionReason: "Document quality is poor, please upload a clearer version",
    },
  ],
}

const provinces = [
  "Koshi Province",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
]

const statusTabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "organization", label: "Organization", icon: Building },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "security", label: "Security", icon: Lock },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showRequestChangeDialog, setShowRequestChangeDialog] = useState(false)
  const [showReplaceDialog, setShowReplaceDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [deletePassword, setDeletePassword] = useState("")
  const [showDeletePassword, setShowDeletePassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Organization change request form state
  const [orgForm, setOrgForm] = useState({
    businessName: mockUserData.businessName,
    panNumber: mockUserData.panNumber,
    vatNumber: mockUserData.vatNumber,
    businessType: mockUserData.businessType,
    registeredAddress: mockUserData.registeredAddress,
    operatingRegions: mockUserData.operatingRegions,
    requestReason: "",
  })

  // Replace document form state
  const [replaceForm, setReplaceForm] = useState({
    file: null as File | null,
    reason: "",
  })

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const handleDeleteAccount = () => {
    if (deletePassword.trim()) {
      console.log("Deleting account with password:", deletePassword)
      setShowDeleteDialog(false)
      setDeletePassword("")
    }
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      console.log("Changing password...")
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }

  const handleRequestChange = () => {
    console.log("Requesting organization change:", orgForm)
    setShowRequestChangeDialog(false)
  }

  const handleReplaceDocument = () => {
    console.log("Replacing document:", selectedDocument?.id, replaceForm)
    setShowReplaceDialog(false)
    setReplaceForm({ file: null, reason: "" })
    setSelectedDocument(null)
  }

  const toggleRegion = (region: string) => {
    setOrgForm((prev) => ({
      ...prev,
      operatingRegions: prev.operatingRegions.includes(region)
        ? prev.operatingRegions.filter((r) => r !== region)
        : [...prev.operatingRegions, region],
    }))
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    }

    const icons = {
      verified: CheckCircle,
      pending: AlertCircle,
      rejected: X,
    }

    const IconComponent = icons[status as keyof typeof icons]

    return (
      <Badge
        className={`${variants[status as keyof typeof variants]} border font-medium px-2 py-1 text-xs flex items-center gap-1`}
      >
        <IconComponent className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex-1 bg-gray-50 w-full min-w-0 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account, organization, and document settings</p>
          </div>

          {/* Custom Status Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex overflow-x-auto">
              {statusTabs.map((tab) => {
                const IconComponent = tab.icon
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-1 ${
                      isActive
                        ? "border-orange-500 text-orange-600 bg-orange-50"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="shadow-sm border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-orange-600" />
                    Account & Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Image */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={mockUserData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{mockUserData.fullName}</h3>
                      <p className="text-sm text-gray-600">Profile Picture</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                      <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <span className="text-gray-900">{mockUserData.fullName}</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Role</Label>
                      <div className="mt-1">
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">{mockUserData.role}</Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <span className="text-gray-900">{mockUserData.email}</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <span className="text-gray-900">{mockUserData.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteDialog(true)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organization Tab */}
            {activeTab === "organization" && (
              <Card className="shadow-sm border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-orange-600" />
                    Organization & Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        Business Name
                      </Label>
                      <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <span className="text-gray-900">{mockUserData.businessName}</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Business Type</Label>
                      <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <span className="text-gray-900">{mockUserData.businessType}</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        PAN Number
                      </Label>
                      <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <span className="text-gray-900">{mockUserData.panNumber}</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        VAT Number
                      </Label>
                      <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <span className="text-gray-900">{mockUserData.vatNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Registered Address
                    </Label>
                    <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <span className="text-gray-900">{mockUserData.registeredAddress}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Operating Regions</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mockUserData.operatingRegions.map((region) => (
                        <Badge
                          key={region}
                          variant="outline"
                          className="border-orange-200 text-orange-700 bg-orange-50"
                        >
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => setShowRequestChangeDialog(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Request Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                {/* PAN Documents */}
                <Card className="shadow-sm border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                      PAN Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDocuments.panDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-orange-50 rounded-lg">
                              <FileText className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{doc.name}</h4>
                              <p className="text-sm text-gray-600">
                                {doc.fileName} • {doc.size}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">Uploaded {formatDate(doc.uploadedDate)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(doc.status)}
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedDocument(doc)
                                setShowReplaceDialog(true)
                              }}
                              className="border-orange-300 text-orange-600 hover:bg-orange-50"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Replace
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Authentication Documents */}
                <Card className="shadow-sm border-gray-200 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-orange-600" />
                      Brand Authentication Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDocuments.brandDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-orange-50 rounded-lg">
                              <Building className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{doc.name}</h4>
                              <p className="text-sm text-gray-600">
                                {doc.fileName} • {doc.size}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">Uploaded {formatDate(doc.uploadedDate)}</span>
                              </div>
                              {doc.status === "rejected" && doc.rejectionReason && (
                                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                                  <p className="text-xs text-red-700">{doc.rejectionReason}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(doc.status)}
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedDocument(doc)
                                setShowReplaceDialog(true)
                              }}
                              className="border-orange-300 text-orange-600 hover:bg-orange-50"
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Replace
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <Card className="shadow-sm border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-orange-600" />
                    Password & Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
                        Current Password
                      </Label>
                      <div className="mt-1 relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                        New Password
                      </Label>
                      <div className="mt-1 relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                        Confirm New Password
                      </Label>
                      <div className="mt-1 relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 pr-10"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handlePasswordChange}
                      disabled={
                        !passwordForm.currentPassword ||
                        !passwordForm.newPassword ||
                        passwordForm.newPassword !== passwordForm.confirmPassword
                      }
                      className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                    >
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. Please enter your password to confirm account deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="delete-password" className="text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <Input
                id="delete-password"
                type={showDeletePassword ? "text" : "password"}
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowDeletePassword(!showDeletePassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showDeletePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={!deletePassword.trim()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Confirm Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Request Change Dialog */}
      <Dialog open={showRequestChangeDialog} onOpenChange={setShowRequestChangeDialog}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Edit className="h-5 w-5 text-orange-600" />
              Request Organization Changes
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Submit a request to update your organization information. Changes will be reviewed by our admin team.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business-name" className="text-sm font-medium text-gray-700">
                  Business Name
                </Label>
                <Input
                  id="business-name"
                  value={orgForm.businessName}
                  onChange={(e) => setOrgForm((prev) => ({ ...prev, businessName: e.target.value }))}
                  className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <Label htmlFor="business-type" className="text-sm font-medium text-gray-700">
                  Business Type
                </Label>
                <Select
                  value={orgForm.businessType}
                  onValueChange={(value) => setOrgForm((prev) => ({ ...prev, businessType: value }))}
                >
                  <SelectTrigger className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="Exporter">Exporter</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pan-number" className="text-sm font-medium text-gray-700">
                  PAN Number
                </Label>
                <Input
                  id="pan-number"
                  value={orgForm.panNumber}
                  onChange={(e) => setOrgForm((prev) => ({ ...prev, panNumber: e.target.value }))}
                  className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <Label htmlFor="vat-number" className="text-sm font-medium text-gray-700">
                  VAT Number
                </Label>
                <Input
                  id="vat-number"
                  value={orgForm.vatNumber}
                  onChange={(e) => setOrgForm((prev) => ({ ...prev, vatNumber: e.target.value }))}
                  className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="registered-address" className="text-sm font-medium text-gray-700">
                Registered Address
              </Label>
              <Textarea
                id="registered-address"
                value={orgForm.registeredAddress}
                onChange={(e) => setOrgForm((prev) => ({ ...prev, registeredAddress: e.target.value }))}
                className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Operating Regions</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {provinces.map((province) => (
                  <label key={province} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orgForm.operatingRegions.includes(province)}
                      onChange={() => toggleRegion(province)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{province}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="request-reason" className="text-sm font-medium text-gray-700">
                Reason for Change <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="request-reason"
                value={orgForm.requestReason}
                onChange={(e) => setOrgForm((prev) => ({ ...prev, requestReason: e.target.value }))}
                className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Please explain why you need to update this information..."
                rows={4}
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRequestChangeDialog(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestChange}
              disabled={!orgForm.requestReason.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Replace Document Dialog */}
      <Dialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-orange-600" />
              Replace Document
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Replace the existing document "{selectedDocument?.name}" with a new version.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="replace-file" className="text-sm font-medium text-gray-700">
                New Document File <span className="text-red-500">*</span>
              </Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                <Input
                  id="replace-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setReplaceForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                  className="hidden"
                />
              </div>
              {replaceForm.file && <p className="text-sm text-gray-600 mt-2">Selected: {replaceForm.file.name}</p>}
            </div>

            <div>
              <Label htmlFor="replace-reason" className="text-sm font-medium text-gray-700">
                Reason for Replacement <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="replace-reason"
                value={replaceForm.reason}
                onChange={(e) => setReplaceForm((prev) => ({ ...prev, reason: e.target.value }))}
                className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Please explain why you're replacing this document..."
                rows={3}
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowReplaceDialog(false)
                setReplaceForm({ file: null, reason: "" })
                setSelectedDocument(null)
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReplaceDocument}
              disabled={!replaceForm.file || !replaceForm.reason.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Replace Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
