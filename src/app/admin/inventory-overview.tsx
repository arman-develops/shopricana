"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus, Eye, Edit } from "lucide-react"

export function InventoryOverview() {
  const categoryData = [
    { name: "Electronics", stock: 450, total: 500, trend: "up", color: "bg-blue-500" },
    { name: "Clothing", stock: 320, total: 400, trend: "up", color: "bg-green-500" },
    { name: "Home & Garden", stock: 180, total: 250, trend: "down", color: "bg-orange-500" },
    { name: "Sports", stock: 95, total: 150, trend: "up", color: "bg-purple-500" },
    { name: "Books", stock: 75, total: 100, trend: "stable", color: "bg-pink-500" },
  ]

  const lowStockItems = [
    { id: 1, name: "Wireless Headphones Pro", stock: 3, category: "Electronics", price: 199.99 },
    { id: 2, name: "Organic Cotton T-Shirt", stock: 5, category: "Clothing", price: 29.99 },
    { id: 3, name: "Smart Garden Kit", stock: 2, category: "Home & Garden", price: 89.99 },
    { id: 4, name: "Yoga Mat Premium", stock: 4, category: "Sports", price: 79.99 },
  ]

  const recentActivity = [
    { action: "Added", item: "Gaming Keyboard RGB", time: "2 hours ago", user: "Admin" },
    { action: "Updated", item: "Smartphone Case", time: "4 hours ago", user: "Manager" },
    { action: "Deleted", item: "Old Model Headphones", time: "6 hours ago", user: "Admin" },
    { action: "Stock Alert", item: "Wireless Mouse", time: "8 hours ago", user: "System" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Category Stock Levels */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span>Inventory by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.stock}/{category.total}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {category.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {category.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                    <span className="text-sm text-muted-foreground">
                      {Math.round((category.stock / category.total) * 100)}%
                    </span>
                  </div>
                </div>
                <Progress value={(category.stock / category.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.action === "Added"
                          ? "bg-green-500"
                          : activity.action === "Updated"
                            ? "bg-blue-500"
                            : activity.action === "Deleted"
                              ? "bg-red-500"
                              : "bg-orange-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">
                        <span className="text-muted-foreground">{activity.action}</span> {activity.item}
                      </p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span>Low Stock Alert</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="p-3 bg-white rounded-lg border border-red-100">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                  <Badge variant="destructive" className="text-xs">
                    {item.stock} left
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.category}</span>
                  <span className="font-medium">${item.price}</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <Button size="sm" variant="outline" className="h-6 text-xs flex-1 bg-transparent">
                    <Plus className="h-3 w-3 mr-1" />
                    Restock
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 px-2">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 px-2">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Package className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
