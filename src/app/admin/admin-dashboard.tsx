"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryOverview } from "./inventory-overview"
import { ProductManager } from "./product-manager"
import { OrdersManager } from "./orders-manager"
import { DeliveryDashboard } from "./delivery-dashboard"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { Package, ShoppingCart, Truck, BarChart3, Users, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard stats
  const stats = {
    totalProducts: 1247,
    lowStock: 23,
    totalOrders: 892,
    pendingOrders: 45,
    activeDeliveries: 67,
    completedToday: 134,
    revenue: 45678.9,
    customers: 3456,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage your ecommerce empire</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-muted-foreground">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Products</p>
                  <p className="text-3xl font-bold">{stats.totalProducts.toLocaleString()}</p>
                </div>
                <Package className="h-12 w-12 text-blue-200" />
              </div>
              <div className="flex items-center mt-4 text-blue-100">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">{stats.lowStock} low stock items</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                </div>
                <ShoppingCart className="h-12 w-12 text-green-200" />
              </div>
              <div className="flex items-center mt-4 text-green-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">{stats.pendingOrders} pending orders</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Active Deliveries</p>
                  <p className="text-3xl font-bold">{stats.activeDeliveries}</p>
                </div>
                <Truck className="h-12 w-12 text-orange-200" />
              </div>
              <div className="flex items-center mt-4 text-orange-100">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">{stats.completedToday} completed today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Revenue</p>
                  <p className="text-3xl font-bold">${stats.revenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 text-purple-200" />
              </div>
              <div className="flex items-center mt-4 text-purple-100">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{stats.customers.toLocaleString()} customers</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Delivery</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <InventoryOverview />
          </TabsContent>

          <TabsContent value="inventory">
            <ProductManager />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="delivery">
            <DeliveryDashboard />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
