"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search, Truck, CheckCircle, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { OrderCard } from "@/components/orders/order-card"
import { OrderFilters } from "@/components/orders/order-filters"

// Mock order data
const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.97,
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        price: 99.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "2",
        name: "Smartphone Case",
        price: 24.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "3",
        name: "USB-C Cable",
        price: 19.99,
        quantity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "2024-01-18",
    actualDelivery: "2024-01-17",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 149.98,
    items: [
      {
        id: "4",
        name: "Wireless Mouse",
        price: 49.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "5",
        name: "Keyboard",
        price: 99.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567891",
    estimatedDelivery: "2024-01-25",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-22",
    status: "processing",
    total: 89.99,
    items: [
      {
        id: "6",
        name: "Phone Stand",
        price: 29.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "7",
        name: "Screen Protector",
        price: 14.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "8",
        name: "Car Charger",
        price: 29.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    estimatedDelivery: "2024-01-28",
  },
  {
    id: "ORD-2024-004",
    date: "2024-01-25",
    status: "pending",
    total: 199.99,
    items: [
      {
        id: "9",
        name: "Tablet",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    estimatedDelivery: "2024-02-01",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus

    let matchesTimeRange = true
    if (selectedTimeRange !== "all") {
      const orderDate = new Date(order.date)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))

      switch (selectedTimeRange) {
        case "30days":
          matchesTimeRange = daysDiff <= 30
          break
        case "90days":
          matchesTimeRange = daysDiff <= 90
          break
        case "year":
          matchesTimeRange = daysDiff <= 365
          break
      }
    }

    return matchesSearch && matchesStatus && matchesTimeRange
  })

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    processing: mockOrders.filter((o) => o.status === "processing").length,
    shipped: mockOrders.filter((o) => o.status === "shipped").length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
    totalSpent: mockOrders.reduce((sum, order) => sum + order.total, 0),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your order history</p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="text-center">
              <Package className="h-6 w-6 mx-auto mb-2 text-blue-100" />
              <p className="text-2xl font-bold">{orderStats.total}</p>
              <p className="text-blue-100 text-sm">Total Orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-100" />
              <p className="text-2xl font-bold">{orderStats.pending}</p>
              <p className="text-yellow-100 text-sm">Pending</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="text-center">
              <RefreshCw className="h-6 w-6 mx-auto mb-2 text-orange-100" />
              <p className="text-2xl font-bold">{orderStats.processing}</p>
              <p className="text-orange-100 text-sm">Processing</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-purple-100" />
              <p className="text-2xl font-bold">{orderStats.shipped}</p>
              <p className="text-purple-100 text-sm">Shipped</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-100" />
              <p className="text-2xl font-bold">{orderStats.delivered}</p>
              <p className="text-green-100 text-sm">Delivered</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-4">
            <div className="text-center">
              <Package className="h-6 w-6 mx-auto mb-2 text-emerald-100" />
              <p className="text-2xl font-bold">${orderStats.totalSpent.toFixed(0)}</p>
              <p className="text-emerald-100 text-sm">Total Spent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <TabsList className="grid w-full lg:w-auto grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <OrderFilters selectedTimeRange={selectedTimeRange} onTimeRangeChange={setSelectedTimeRange} />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? "Try adjusting your search terms" : "You haven't placed any orders yet"}
                </p>
                <Link href="/">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        {["pending", "processing", "shipped", "delivered"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {mockOrders
              .filter((order) => order.status === status)
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
