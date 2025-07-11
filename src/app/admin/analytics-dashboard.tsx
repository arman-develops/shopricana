"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Eye, Star } from "lucide-react"

export function AnalyticsDashboard() {
  const salesData = [
    { month: "Jan", sales: 45000, orders: 234, customers: 189 },
    { month: "Feb", sales: 52000, orders: 267, customers: 201 },
    { month: "Mar", sales: 48000, orders: 245, customers: 195 },
    { month: "Apr", sales: 61000, orders: 312, customers: 234 },
    { month: "May", sales: 55000, orders: 289, customers: 218 },
    { month: "Jun", sales: 67000, orders: 345, customers: 267 },
  ]

  const topProducts = [
    { name: "Wireless Headphones Pro", sales: 234, revenue: 46800, trend: "up" },
    { name: "Smart Fitness Watch", sales: 189, revenue: 56700, trend: "up" },
    { name: "Organic Cotton T-Shirt", sales: 567, revenue: 22680, trend: "down" },
    { name: "Professional Camera Lens", sales: 45, revenue: 40495, trend: "up" },
    { name: "Ergonomic Office Chair", sales: 123, revenue: 67623, trend: "up" },
  ]

  const customerInsights = {
    totalCustomers: 3456,
    newThisMonth: 234,
    returningRate: 68.5,
    averageOrderValue: 187.5,
    topLocation: "New York, NY",
    satisfactionScore: 4.7,
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Revenue</p>
                <p className="text-3xl font-bold">$328K</p>
                <div className="flex items-center mt-2 text-green-100">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+12.5% from last month</span>
                </div>
              </div>
              <DollarSign className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Orders</p>
                <p className="text-3xl font-bold">1,892</p>
                <div className="flex items-center mt-2 text-blue-100">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+8.2% from last month</span>
                </div>
              </div>
              <ShoppingCart className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Active Customers</p>
                <p className="text-3xl font-bold">{customerInsights.totalCustomers.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-purple-100">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+{customerInsights.newThisMonth} new</span>
                </div>
              </div>
              <Users className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Avg Order Value</p>
                <p className="text-3xl font-bold">${customerInsights.averageOrderValue}</p>
                <div className="flex items-center mt-2 text-orange-100">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-sm">-2.1% from last month</span>
                </div>
              </div>
              <Package className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Top Performing Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${product.revenue.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    {product.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs ${product.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {product.trend === "up" ? "↗" : "↘"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Customer Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{customerInsights.returningRate}%</p>
                <p className="text-sm text-muted-foreground">Returning Customers</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{customerInsights.satisfactionScore}</p>
                <p className="text-sm text-muted-foreground">Satisfaction Score</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Customer Retention</span>
                <span className="text-sm text-muted-foreground">{customerInsights.returningRate}%</span>
              </div>
              <Progress value={customerInsights.returningRate} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm text-muted-foreground">{customerInsights.satisfactionScore}/5.0</span>
              </div>
              <Progress value={(customerInsights.satisfactionScore / 5) * 100} className="h-2" />
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">Top Location</span>
              </div>
              <p className="text-lg font-bold text-purple-600">{customerInsights.topLocation}</p>
              <p className="text-sm text-purple-600">Most orders from this location</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Sales Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {salesData.map((data) => (
              <div key={data.month} className="text-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">{data.month}</p>
                <p className="text-xl font-bold mb-1">${(data.sales / 1000).toFixed(0)}K</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-center space-x-1">
                    <ShoppingCart className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-muted-foreground">{data.orders}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-muted-foreground">{data.customers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
