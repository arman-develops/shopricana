"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentModeration } from "./content-moderation"
import { CustomerSupport } from "./customer-support"
import { UserManagement } from "./user-management"
import { CommunityInsights } from "./community-insights"
import { DisputeResolution } from "./dispute-resolution"
import {
  Shield,
  MessageSquare,
  Users,
  BarChart3,
  AlertTriangle,
  Star,
  Flag,
  Clock,
  CheckCircle,
  Eye,
} from "lucide-react"

export function ModeratorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for moderator stats
  const stats = {
    pendingReviews: 23,
    reportedContent: 8,
    activeTickets: 45,
    resolvedToday: 67,
    userReports: 12,
    communityScore: 4.6,
    responseTime: "2.3h",
    satisfactionRate: 94.8,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Moderator Hub
            </h1>
            <p className="text-muted-foreground mt-2">Community guardian & customer advocate</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Senior Moderator</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-amber-400 to-orange-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">Pending Reviews</p>
                  <p className="text-3xl font-bold">{stats.pendingReviews}</p>
                </div>
                <div className="relative">
                  <Star className="h-12 w-12 text-amber-200" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">!</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-4 text-amber-100">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Avg review time: 15 mins</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Reported Content</p>
                  <p className="text-3xl font-bold">{stats.reportedContent}</p>
                </div>
                <Flag className="h-12 w-12 text-red-200" />
              </div>
              <div className="flex items-center mt-4 text-red-100">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">3 high priority</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Support Tickets</p>
                  <p className="text-3xl font-bold">{stats.activeTickets}</p>
                </div>
                <MessageSquare className="h-12 w-12 text-blue-200" />
              </div>
              <div className="flex items-center mt-4 text-blue-100">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">{stats.resolvedToday} resolved today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-green-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Satisfaction Rate</p>
                  <p className="text-3xl font-bold">{stats.satisfactionRate}%</p>
                </div>
                <div className="relative">
                  <Users className="h-12 w-12 text-emerald-200" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="h-2 w-2 text-yellow-800" />
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-4 text-emerald-100">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Avg response: {stats.responseTime}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg rounded-xl">
            <TabsTrigger value="overview" className="flex items-center space-x-2 rounded-lg">
              <Eye className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center space-x-2 rounded-lg">
              <Shield className="h-4 w-4" />
              <span>Moderation</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2 rounded-lg">
              <MessageSquare className="h-4 w-4" />
              <span>Support</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2 rounded-lg">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2 rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CommunityInsights />
          </TabsContent>

          <TabsContent value="moderation">
            <ContentModeration />
          </TabsContent>

          <TabsContent value="support">
            <CustomerSupport />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="insights">
            <DisputeResolution />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
