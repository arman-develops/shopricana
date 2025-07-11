"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react"

export function PlatformAnalytics() {
  const platformMetrics = {
    totalRevenue: 2847392,
    totalUsers: 15847,
    totalOrders: 8934,
    conversionRate: 3.2,
    averageOrderValue: 187.5,
    customerLifetimeValue: 892.3,
  }

  const trafficSources = [
    { source: "Organic Search", visitors: 45230, percentage: 42.3, trend: "up", change: "+12%" },
    { source: "Direct", visitors: 28940, percentage: 27.1, trend: "up", change: "+8%" },
    { source: "Social Media", visitors: 18750, percentage: 17.5, trend: "down", change: "-3%" },
    { source: "Email Marketing", visitors: 9840, percentage: 9.2, trend: "up", change: "+15%" },
    { source: "Paid Ads", visitors: 4180, percentage: 3.9, trend: "up", change: "+22%" },
  ]

  const deviceBreakdown = [
    { device: "Desktop", users: 8934, percentage: 56.4, icon: Monitor },
    { device: "Mobile", users: 5892, percentage: 37.2, icon: Smartphone },
    { device: "Tablet", users: 1021, percentage: 6.4, icon: Tablet },
  ]

  const topPages = [
    { page: "/", views: 45230, bounceRate: 23.4, avgTime: "2:34" },
    { page: "/products", views: 28940, bounceRate: 18.7, avgTime: "3:12" },
    { page: "/cart", views: 18750, bounceRate: 45.2, avgTime: "1:45" },
    { page: "/checkout", views: 12340, bounceRate: 12.8, avgTime: "4:23" },
    { page: "/auth/login", views: 9840, bounceRate: 34.5, avgTime: "1:23" },
  ]

  const revenueByCategory = [
    { category: "Electronics", revenue: 1247893, percentage: 43.8, trend: "up" },
    { category: "Clothing", revenue: 892340, percentage: 31.3, trend: "up" },
    { category: "Home & Garden", revenue: 456789, percentage: 16.0, trend: "down" },
    { category: "Sports", revenue: 189234, percentage: 6.6, trend: "up" },
    { category: "Books", revenue: 61136, percentage: 2.1, trend: "stable" },
  ]

  const userEngagement = {
    dailyActiveUsers: 3456,
    weeklyActiveUsers: 12847,
    monthlyActiveUsers: 15847,
    averageSessionDuration: "4:23",
    pagesPerSession: 3.7,
    returnVisitorRate: 68.5,
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-green-900 border-green-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Revenue</p>
                <p className="text-xl font-bold text-white">${(platformMetrics.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-900 border-blue-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Users</p>
                <p className="text-xl font-bold text-white">{(platformMetrics.totalUsers / 1000).toFixed(1)}K</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-900 border-purple-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Orders</p>
                <p className="text-xl font-bold text-white">{(platformMetrics.totalOrders / 1000).toFixed(1)}K</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-900 border-orange-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Conversion</p>
                <p className="text-xl font-bold text-white">{platformMetrics.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyan-900 border-cyan-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">AOV</p>
                <p className="text-xl font-bold text-white">${platformMetrics.averageOrderValue}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-cyan-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-pink-900 border-pink-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">CLV</p>
                <p className="text-xl font-bold text-white">${platformMetrics.customerLifetimeValue}</p>
              </div>
              <Activity className="h-8 w-8 text-pink-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
          <TabsTrigger value="traffic" className="text-gray-300 data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            Traffic
          </TabsTrigger>
          <TabsTrigger value="revenue" className="text-gray-300 data-[state=active]:text-white">
            <DollarSign className="h-4 w-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="engagement" className="text-gray-300 data-[state=active]:text-white">
            <Activity className="h-4 w-4 mr-2" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="devices" className="text-gray-300 data-[state=active]:text-white">
            <Monitor className="h-4 w-4 mr-2" />
            Devices
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{source.source}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{source.visitors.toLocaleString()}</span>
                        <div className="flex items-center space-x-1">
                          {source.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-400" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-400" />
                          )}
                          <span className={`text-xs ${source.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                            {source.change}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Top Pages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPages.map((page) => (
                  <div key={page.page} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{page.page}</p>
                      <p className="text-sm text-gray-400">{page.views.toLocaleString()} views</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Bounce: {page.bounceRate}%</p>
                      <p className="text-sm text-gray-400">Time: {page.avgTime}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">${category.revenue.toLocaleString()}</span>
                      <Badge className="bg-gray-700 text-gray-300">{category.percentage}%</Badge>
                      {category.trend === "up" && <TrendingUp className="h-4 w-4 text-green-400" />}
                      {category.trend === "down" && <TrendingDown className="h-4 w-4 text-red-400" />}
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-white">{userEngagement.dailyActiveUsers.toLocaleString()}</p>
                  <p className="text-gray-400">Daily Active Users</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-white">{userEngagement.averageSessionDuration}</p>
                  <p className="text-gray-400">Avg Session Duration</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-white">{userEngagement.pagesPerSession}</p>
                  <p className="text-gray-400">Pages per Session</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Device Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {deviceBreakdown.map((device) => (
                <div key={device.device} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <device.icon className="h-8 w-8 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">{device.device}</p>
                      <p className="text-sm text-gray-400">{device.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{device.percentage}%</p>
                    <Progress value={device.percentage} className="h-2 w-20" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
