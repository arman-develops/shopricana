"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Flag,
  Star,
  MessageSquare,
  ImageIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Eye,
} from "lucide-react"

export function ContentModeration() {
  const [selectedItem, setSelectedItem] = useState(null)

const pendingReviews = [
  {
    id: 1,
    type: "review",
    product: "Oraimo Wireless Earbuds",
    author: "Kevin Otieno",
    rating: 1,
    content: "Terrible product. Sound is weak and it stopped working after a day. Not worth the price.",
    reported: true,
    reportReason: "Suspected fake review",
    timestamp: "2 hours ago",
    priority: "high",
  },
  {
    id: 2,
    type: "review",
    product: "Mika Smart Watch",
    author: "Faith Wanjiru",
    rating: 5,
    content: "I love it! Very accurate, long battery life, and synced well with my phone. Totally recommend.",
    reported: false,
    timestamp: "4 hours ago",
    priority: "normal",
  },
  {
    id: 3,
    type: "comment",
    product: "Organic Cotton Kikoi Shirt",
    author: "Brian Kiprop",
    content: "Do you have this in size XXL? And what’s the return policy like if it doesn’t fit?",
    reported: false,
    timestamp: "6 hours ago",
    priority: "low",
  },
];


const reportedContent = [
  {
    id: 4,
    type: "review",
    product: "Canon DSLR Lens",
    author: "Anonymous User",
    content: "Click this link to get cheap lenses! www.spamlink.ke...",
    reportReason: "Spam/Promotional content",
    reportedBy: "Multiple users",
    timestamp: "1 hour ago",
    priority: "high",
    status: "pending",
  },
  {
    id: 5,
    type: "image",
    product: "Yoga Mat – Nairobi Edition",
    author: "Linet Auma",
    content: "Image flagged for nudity during product demonstration",
    reportReason: "Inappropriate content",
    reportedBy: "Customer",
    timestamp: "3 hours ago",
    priority: "medium",
    status: "investigating",
  },
];


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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "review":
        return <Star className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const handleApprove = (id: number) => {
    console.log("Approved item:", id)
    // Handle approval logic
  }

  const handleReject = (id: number) => {
    console.log("Rejected item:", id)
    // Handle rejection logic
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="reviews">Pending Reviews</TabsTrigger>
          <TabsTrigger value="reported">Reported Content</TabsTrigger>
          <TabsTrigger value="approved">Recently Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-emerald-700">
                <Star className="h-5 w-5" />
                <span>Pending Reviews ({pendingReviews.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingReviews.map((review) => (
                <Card key={review.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(review.type)}
                        <div>
                          <h4 className="font-semibold">{review.product}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{review.author}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{review.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {review.reported && (
                          <Badge className="bg-red-100 text-red-800">
                            <Flag className="h-3 w-3 mr-1" />
                            Reported
                          </Badge>
                        )}
                        {getPriorityBadge(review.priority)}
                      </div>
                    </div>

                    {review.type === "review" && (
                      <div className="flex items-center space-x-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (review.rating as number) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">({review.rating}/5)</span>
                      </div>
                    )}

                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                      <p className="text-sm">{review.content}</p>
                    </div>

                    {review.reported && (
                      <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4">
                        <div className="flex items-center space-x-2 text-red-700">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">Report Reason:</span>
                        </div>
                        <p className="text-sm text-red-600 mt-1">{review.reportReason}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleReject(review.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleApprove(review.id)}
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reported" className="space-y-4">
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700">
                <Flag className="h-5 w-5" />
                <span>Reported Content ({reportedContent.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportedContent.map((item) => (
                <Card key={item.id} className="bg-white shadow-md border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <h4 className="font-semibold">{item.product}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{item.author}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{item.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-red-100 text-red-800">{item.status}</Badge>
                        {getPriorityBadge(item.priority)}
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                      <div className="flex items-center space-x-2 text-red-700 mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">Report Details</span>
                      </div>
                      <p className="text-sm text-red-600 mb-1">
                        <strong>Reason:</strong> {item.reportReason}
                      </p>
                      <p className="text-sm text-red-600">
                        <strong>Reported by:</strong> {item.reportedBy}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                      <p className="text-sm">{item.content}</p>
                    </div>

                    <div className="space-y-3">
                      <Textarea placeholder="Add moderation notes..." className="resize-none" rows={2} />
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            Warn User
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 bg-transparent">
                            <XCircle className="h-4 w-4 mr-2" />
                            Remove Content
                          </Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Dismiss Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Recently Approved Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-700 mb-2">All Caught Up!</h3>
                <p className="text-green-600">No recently approved content to display.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
