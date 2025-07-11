"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Scale,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Package,
  MessageSquare,
  FileText,
  Calendar,
} from "lucide-react"

export function DisputeResolution() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null)


  // ── Literal‑union helpers ──────────────────────────────
  type DisputeType     = "refund" | "delivery" | "quality" | "billing";
  type DisputeStatus   = "pending" | "investigating" | "resolved" | "escalated";
  type DisputePriority = "low" | "medium" | "high";

  // ── Main interface ─────────────────────────────────────
  interface Dispute {
    id:          string;           // e.g. "DSP‑001"
    type:        DisputeType;
    customer:    string;
    merchant:    string;
    orderNumber: string;
    amount:      number;           // store in lowest currency unit if precision matters
    status:      DisputeStatus;
    priority:    DisputePriority;
    created:     string;           // ISO‑8601 recommended; Date if you prefer
    description: string;
    evidence:    string[];         // file names / URLs
  }

  const disputes: Dispute[] = [
    {
      id: "DSP-001",
      type: "refund",
      customer: "John Smith",
      merchant: "TechStore Pro",
      orderNumber: "ORD-12345",
      amount: 299.99,
      status: "pending",
      priority: "high",
      created: "2024-01-15 14:30:00",
      description: "Product arrived damaged, requesting full refund",
      evidence: ["photo1.jpg", "photo2.jpg"],
    },
    {
      id: "DSP-002",
      type: "delivery",
      customer: "Sarah Wilson",
      merchant: "Fashion Hub",
      orderNumber: "ORD-12346",
      amount: 89.99,
      status: "investigating",
      priority: "medium",
      created: "2024-01-15 12:15:00",
      description: "Package marked as delivered but never received",
      evidence: ["tracking.pdf"],
    },
    {
      id: "DSP-003",
      type: "quality",
      customer: "Mike Johnson",
      merchant: "Home Essentials",
      orderNumber: "ORD-12347",
      amount: 156.78,
      status: "resolved",
      priority: "low",
      created: "2024-01-14 16:45:00",
      description: "Product quality does not match description",
      evidence: ["comparison.jpg"],
    },
    {
      id: "DSP-004",
      type: "billing",
      customer: "Emily Davis",
      merchant: "Sports World",
      orderNumber: "ORD-12348",
      amount: 234.5,
      status: "escalated",
      priority: "high",
      created: "2024-01-14 10:20:00",
      description: "Charged twice for the same order",
      evidence: ["receipt1.pdf", "receipt2.pdf"],
    },
  ]

  const resolutionTemplates = [
    { id: "refund_approved", name: "Refund Approved", type: "refund" },
    { id: "refund_denied", name: "Refund Denied", type: "refund" },
    { id: "partial_refund", name: "Partial Refund", type: "refund" },
    { id: "replacement_offered", name: "Replacement Offered", type: "quality" },
    { id: "delivery_investigation", name: "Delivery Investigation", type: "delivery" },
    { id: "billing_correction", name: "Billing Correction", type: "billing" },
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      investigating: { label: "Investigating", className: "bg-blue-100 text-blue-800" },
      resolved: { label: "Resolved", className: "bg-green-100 text-green-800" },
      escalated: { label: "Escalated", className: "bg-red-100 text-red-800" },
      closed: { label: "Closed", className: "bg-gray-100 text-gray-800" },
    }
    const { label, className } = config[status as keyof typeof config] || config.pending
    return <Badge className={className}>{label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: { label: "High", className: "bg-red-100 text-red-800" },
      medium: { label: "Medium", className: "bg-orange-100 text-orange-800" },
      low: { label: "Low", className: "bg-blue-100 text-blue-800" },
    }
    const { label, className } = config[priority as keyof typeof config] || config.medium
    return <Badge className={className}>{label}</Badge>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "refund":
        return "💰"
      case "delivery":
        return "📦"
      case "quality":
        return "⭐"
      case "billing":
        return "💳"
      default:
        return "❓"
    }
  }

  return (
    <div className="space-y-6">
      {/* Dispute Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700">Pending</p>
                <p className="text-3xl font-bold text-yellow-800">
                  {disputes.filter((d) => d.status === "pending").length}
                </p>
              </div>
              <Clock className="h-12 w-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700">Investigating</p>
                <p className="text-3xl font-bold text-blue-800">
                  {disputes.filter((d) => d.status === "investigating").length}
                </p>
              </div>
              <Scale className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-100 to-pink-100 border-red-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700">Escalated</p>
                <p className="text-3xl font-bold text-red-800">
                  {disputes.filter((d) => d.status === "escalated").length}
                </p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700">Resolved</p>
                <p className="text-3xl font-bold text-green-800">
                  {disputes.filter((d) => d.status === "resolved").length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disputes List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-emerald-700">
                <Scale className="h-5 w-5" />
                <span>Active Disputes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {disputes.map((dispute) => (
                <Card
                  key={dispute.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedDispute?.id === dispute.id ? "ring-2 ring-emerald-500 bg-emerald-50" : "bg-white"
                  }`}
                  onClick={() => setSelectedDispute(dispute)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getTypeIcon(dispute.type)}</span>
                        <span className="font-medium text-sm">{dispute.id}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getPriorityBadge(dispute.priority)}
                        {getStatusBadge(dispute.status)}
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm line-clamp-2 mb-2">{dispute.description}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                      <User className="h-3 w-3" />
                      <span>{dispute.customer}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{dispute.created}</span>
                      </div>
                      <span className="font-medium">${dispute.amount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dispute Details */}
        <div className="lg:col-span-2">
          {selectedDispute ? (
            <div className="space-y-6">
              {/* Dispute Header */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(selectedDispute.type)}</span>
                        <h2 className="text-xl font-bold">{selectedDispute.id}</h2>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Order: {selectedDispute.orderNumber}</span>
                        <span>Amount: ${selectedDispute.amount}</span>
                        <span>Created: {selectedDispute.created}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(selectedDispute.priority)}
                      {getStatusBadge(selectedDispute.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedDispute.customer}</p>
                        <p className="text-sm text-muted-foreground">Customer</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedDispute.merchant}</p>
                        <p className="text-sm text-muted-foreground">Merchant</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dispute Details */}
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="resolution">Resolution</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Dispute Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-emerald-800">{selectedDispute.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="evidence">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Evidence & Documentation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedDispute.evidence.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-emerald-600" />
                              <span className="text-emerald-800">{file}</span>
                            </div>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resolution">
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle>Resolution Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Resolution Template</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                              {resolutionTemplates
                                .filter((t) => t.type === selectedDispute.type)
                                .map((template) => (
                                  <SelectItem key={template.id} value={template.id}>
                                    {template.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Update Status</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="investigating">Investigating</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="escalated">Escalated</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Resolution Notes</label>
                        <Textarea placeholder="Add resolution details and actions taken..." rows={4} />
                      </div>
                      <div className="flex space-x-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve Dispute
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Parties
                        </Button>
                        <Button variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                          <XCircle className="h-4 w-4 mr-2" />
                          Escalate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card className="bg-white shadow-lg border-0 h-96">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Scale className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">Select a Dispute</h3>
                  <p className="text-muted-foreground">
                    Choose a dispute from the list to view details and take action
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
