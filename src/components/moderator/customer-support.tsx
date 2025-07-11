"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Clock, User, Mail, Send, Paperclip, Star, Filter } from "lucide-react"

export function CustomerSupport() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [replyMessage, setReplyMessage] = useState("")

  // ── Literal unions for strong typing ───────────────────────
  type TicketPriority = "low" | "normal" | "medium" | "high";
  type TicketStatus   = "open" | "pending" | "resolved" | "closed";
  type TicketCategory = "shipping" | "product" | "billing" | "account";

  // ── Main interface ─────────────────────────────────────────
  interface SupportTicket {
    id:          string;               // e.g. "TKT-001"
    customer:    string;
    email:       string;
    subject:     string;
    priority:    TicketPriority;
    status:      TicketStatus;
    category:    TicketCategory;
    created:     string;               // e.g. "2 hours ago" — or make this a Date
    lastReply:   string;               // same format as `created`
    messages:    number;               // number of message exchanges
    rating:      number | null;        // optional user rating after resolution
    orderNumber: string | null;        // may be unrelated to a specific order
  }

  const supportTickets: SupportTicket[] = [
    {
      id: "TKT-001",
      customer: "John Smith",
      email: "john@example.com",
      subject: "Order not received",
      priority: "high",
      status: "open",
      category: "shipping",
      created: "2 hours ago",
      lastReply: "1 hour ago",
      messages: 3,
      rating: null,
      orderNumber: "ORD-12345",
    },
    {
      id: "TKT-002",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      subject: "Product defect - Wireless Headphones",
      priority: "medium",
      status: "pending",
      category: "product",
      created: "4 hours ago",
      lastReply: "2 hours ago",
      messages: 5,
      rating: null,
      orderNumber: "ORD-12346",
    },
    {
      id: "TKT-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      subject: "Refund request",
      priority: "normal",
      status: "resolved",
      category: "billing",
      created: "1 day ago",
      lastReply: "6 hours ago",
      messages: 8,
      rating: 5,
      orderNumber: "ORD-12347",
    },
    {
      id: "TKT-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      subject: "Account access issues",
      priority: "low",
      status: "open",
      category: "account",
      created: "2 days ago",
      lastReply: "1 day ago",
      messages: 2,
      rating: null,
      orderNumber: null,
    },
  ]

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: { label: "High", className: "bg-red-100 text-red-800" },
      medium: { label: "Medium", className: "bg-orange-100 text-orange-800" },
      normal: { label: "Normal", className: "bg-blue-100 text-blue-800" },
      low: { label: "Low", className: "bg-gray-100 text-gray-800" },
    }
    const { label, className } = config[priority as keyof typeof config] || config.normal
    return <Badge className={className}>{label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const config = {
      open: { label: "Open", className: "bg-green-100 text-green-800" },
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      resolved: { label: "Resolved", className: "bg-blue-100 text-blue-800" },
      closed: { label: "Closed", className: "bg-gray-100 text-gray-800" },
    }
    const { label, className } = config[status as keyof typeof config] || config.open
    return <Badge className={className}>{label}</Badge>
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "shipping":
        return "🚚"
      case "product":
        return "📦"
      case "billing":
        return "💳"
      case "account":
        return "👤"
      default:
        return "❓"
    }
  }

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      console.log("Sending reply:", replyMessage)
      setReplyMessage("")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tickets List */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-blue-700">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Support Tickets</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{supportTickets.length}</Badge>
            </CardTitle>
            <div className="flex space-x-2">
              <Input placeholder="Search tickets..." className="flex-1" />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {supportTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTicket?.id === ticket.id ? "ring-2 ring-blue-500 bg-blue-50" : "bg-white"
                }`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(ticket.category)}</span>
                      <span className="font-medium text-sm">{ticket.id}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getPriorityBadge(ticket.priority)}
                      {getStatusBadge(ticket.status)}
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-2 mb-2">{ticket.subject}</h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <User className="h-3 w-3" />
                    <span>{ticket.customer}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{ticket.lastReply}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{ticket.messages}</span>
                    </div>
                  </div>
                  {
                    typeof ticket.rating === "number" && (
                      <div className="flex items-center space-x-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < ticket.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    )
                  }
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ticket Details */}
      <div className="lg:col-span-2">
        {selectedTicket ? (
          <div className="space-y-6">
            {/* Ticket Header */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getCategoryIcon(selectedTicket.category)}</span>
                      <h2 className="text-xl font-bold">{selectedTicket.subject}</h2>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Ticket: {selectedTicket.id}</span>
                      <span>Created: {selectedTicket.created}</span>
                      {selectedTicket.orderNumber && <span>Order: {selectedTicket.orderNumber}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(selectedTicket.priority)}
                    {getStatusBadge(selectedTicket.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedTicket.customer}</p>
                      <p className="text-sm text-muted-foreground">Customer</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedTicket.email}</p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedTicket.messages} messages</p>
                      <p className="text-sm text-muted-foreground">Conversation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Conversation History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {/* Customer Message */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-blue-800">{selectedTicket.customer}</span>
                        <span className="text-xs text-blue-600">{selectedTicket.created}</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Hi, I placed an order 5 days ago but haven't received it yet. The tracking shows it was
                        delivered but I never got the package. Can you please help me with this?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support Response */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-emerald-800">Support Team</span>
                        <span className="text-xs text-emerald-600">1 hour ago</span>
                      </div>
                      <p className="text-sm text-emerald-700">
                        Hi John, I'm sorry to hear about this issue. I've checked your order and I can see the tracking
                        shows delivered. Let me contact the shipping carrier to investigate this further. I'll get back
                        to you within 24 hours with an update.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reply Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Send Reply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shipping">Shipping Issue</SelectItem>
                      <SelectItem value="refund">Refund Process</SelectItem>
                      <SelectItem value="product">Product Inquiry</SelectItem>
                      <SelectItem value="custom">Custom Response</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Type your reply..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setReplyMessage("")}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendReply} className="bg-emerald-600 hover:bg-emerald-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-lg border-0 h-96">
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">Select a Ticket</h3>
                <p className="text-muted-foreground">Choose a support ticket from the list to view details</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
