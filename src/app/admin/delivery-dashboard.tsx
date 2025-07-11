"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Navigation,
  Phone,
  User,
  Calendar,
} from "lucide-react"

export function DeliveryDashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const deliveryStats = {
    activeDeliveries: 67,
    completedToday: 134,
    pendingPickup: 23,
    delayed: 8,
    onTimeRate: 94.2,
  }

  const activeDeliveries = [
    {
      id: "ORD-001",
      customer: "John Smith",
      address: "123 Main St, New York, NY 10001",
      driver: "Mike Johnson",
      driverPhone: "+1 (555) 123-4567",
      status: "in_transit",
      estimatedTime: "15 mins",
      progress: 75,
      items: 3,
      value: 299.97,
      priority: "high",
    },
    {
      id: "ORD-002",
      customer: "Sarah Wilson",
      address: "456 Oak Ave, Brooklyn, NY 11201",
      driver: "David Chen",
      driverPhone: "+1 (555) 234-5678",
      status: "picked_up",
      estimatedTime: "32 mins",
      progress: 45,
      items: 1,
      value: 89.99,
      priority: "normal",
    },
    {
      id: "ORD-003",
      customer: "Robert Brown",
      address: "789 Pine St, Queens, NY 11375",
      driver: "Lisa Garcia",
      driverPhone: "+1 (555) 345-6789",
      status: "preparing",
      estimatedTime: "45 mins",
      progress: 20,
      items: 5,
      value: 567.45,
      priority: "normal",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      address: "321 Elm St, Manhattan, NY 10002",
      driver: "Alex Rodriguez",
      driverPhone: "+1 (555) 456-7890",
      status: "delayed",
      estimatedTime: "60+ mins",
      progress: 30,
      items: 2,
      value: 199.98,
      priority: "high",
    },
  ]

  const completedDeliveries = [
    {
      id: "ORD-098",
      customer: "Michael Johnson",
      completedAt: "2:45 PM",
      driver: "Mike Johnson",
      rating: 5,
      value: 149.99,
    },
    {
      id: "ORD-097",
      customer: "Jennifer Lee",
      completedAt: "2:30 PM",
      driver: "David Chen",
      rating: 4,
      value: 89.99,
    },
    {
      id: "ORD-096",
      customer: "Thomas Wilson",
      completedAt: "2:15 PM",
      driver: "Lisa Garcia",
      rating: 5,
      value: 299.97,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      preparing: { label: "Preparing", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" },
      picked_up: { label: "Picked Up", variant: "default" as const, color: "bg-yellow-100 text-yellow-800" },
      in_transit: { label: "In Transit", variant: "default" as const, color: "bg-green-100 text-green-800" },
      delivered: { label: "Delivered", variant: "default" as const, color: "bg-green-100 text-green-800" },
      delayed: { label: "Delayed", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.preparing
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    return priority === "high" ? (
      <Badge variant="destructive" className="text-xs">
        High Priority
      </Badge>
    ) : (
      <Badge variant="outline" className="text-xs">
        Normal
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Active</p>
                <p className="text-2xl font-bold">{deliveryStats.activeDeliveries}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Completed</p>
                <p className="text-2xl font-bold">{deliveryStats.completedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">{deliveryStats.pendingPickup}</p>
              </div>
              <Package className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Delayed</p>
                <p className="text-2xl font-bold">{deliveryStats.delayed}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">On-Time Rate</p>
                <p className="text-2xl font-bold">{deliveryStats.onTimeRate}%</p>
              </div>
              <Clock className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="completed">Completed Today</TabsTrigger>
          <TabsTrigger value="map">Live Map</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeDeliveries.map((delivery) => (
            <Card key={delivery.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-lg">{delivery.id}</h3>
                          {getPriorityBadge(delivery.priority)}
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                          <User className="h-4 w-4" />
                          <span>{delivery.customer}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{delivery.address}</span>
                        </div>
                      </div>
                      {getStatusBadge(delivery.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Items</p>
                        <p className="font-medium">{delivery.items} items</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Value</p>
                        <p className="font-medium">${delivery.value}</p>
                      </div>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div>
                    <h4 className="font-semibold mb-3">Driver</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.driver}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{delivery.driverPhone}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                        <Navigation className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Progress</h4>
                      <span className="text-sm text-muted-foreground">ETA: {delivery.estimatedTime}</span>
                    </div>
                    <Progress value={delivery.progress} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{delivery.progress}% complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Today's Completed Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{delivery.id}</p>
                        <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${delivery.value}</p>
                      <p className="text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {delivery.completedAt}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${i < delivery.rating ? "bg-yellow-400" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Live Delivery Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Delivery Map</h3>
                <p className="text-muted-foreground mb-6">
                  Real-time tracking of all active deliveries with route optimization and driver locations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Truck className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="font-medium">Live Vehicle Tracking</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Navigation className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="font-medium">Route Optimization</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="font-medium">ETA Predictions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
