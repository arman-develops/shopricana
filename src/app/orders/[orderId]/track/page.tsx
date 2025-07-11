"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Truck, MapPin, Clock, CheckCircle, Navigation, Phone, RefreshCw } from "lucide-react"
import Link from "next/link"

// Mock tracking data
const mockTrackingData = {
  orderId: "ORD-2024-001",
  trackingNumber: "1Z999AA1234567890",
  carrier: "UPS",
  status: "delivered",
  estimatedDelivery: "2024-01-18",
  actualDelivery: "2024-01-17 3:45 PM",
  currentLocation: "New York, NY",
  events: [
    {
      date: "2024-01-17",
      time: "3:45 PM",
      status: "Delivered",
      location: "New York, NY 10001",
      description: "Package delivered to front door. Signed by: J.DOE",
    },
    {
      date: "2024-01-17",
      time: "8:30 AM",
      status: "Out for Delivery",
      location: "New York, NY",
      description: "Package is out for delivery",
    },
    {
      date: "2024-01-17",
      time: "6:00 AM",
      status: "Arrived at Facility",
      location: "New York, NY",
      description: "Package arrived at delivery facility",
    },
    {
      date: "2024-01-16",
      time: "11:30 PM",
      status: "In Transit",
      location: "Newark, NJ",
      description: "Package is in transit to next facility",
    },
    {
      date: "2024-01-16",
      time: "2:15 PM",
      status: "In Transit",
      location: "Philadelphia, PA",
      description: "Package is in transit",
    },
    {
      date: "2024-01-16",
      time: "9:00 AM",
      status: "Shipped",
      location: "Warehouse - Atlanta, GA",
      description: "Package has been shipped",
    },
    {
      date: "2024-01-15",
      time: "2:15 PM",
      status: "Order Processed",
      location: "Warehouse - Atlanta, GA",
      description: "Order has been processed and prepared for shipment",
    },
  ],
}

type TrackOrderPageProps = {
  params: {
    orderId: string;
  };
};

export default function TrackOrderPage({ params }: TrackOrderPageProps) {
  const [tracking] = useState(mockTrackingData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "out for delivery":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "in transit":
        return <Navigation className="h-5 w-5 text-purple-500" />
      case "shipped":
        return <Package className="h-5 w-5 text-orange-500" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      "out for delivery": "bg-blue-100 text-blue-800 border-blue-200",
      "in transit": "bg-purple-100 text-purple-800 border-purple-200",
      shipped: "bg-orange-100 text-orange-800 border-orange-200",
      "order processed": "bg-gray-100 text-gray-800 border-gray-200",
    }

    const className = statusConfig[status.toLowerCase() as keyof typeof statusConfig] || "bg-gray-100 text-gray-800"

    return <Badge className={className}>{status}</Badge>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/orders/${params.orderId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Order Details
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Track Package</h1>
            <p className="text-muted-foreground">Order {tracking.orderId}</p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" className="bg-transparent">
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Tracking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tracking.events.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{getStatusIcon(event.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{event.status}</h4>
                        <div className="text-sm text-muted-foreground">
                          {event.date} at {event.time}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{event.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Summary */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {getStatusBadge(tracking.status)}
                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{tracking.currentLocation}</span>
                  </div>
                  {tracking.status === "delivered" ? (
                    <p className="text-sm font-medium text-green-600">Delivered on {tracking.actualDelivery}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Estimated delivery: {tracking.estimatedDelivery}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                <p className="font-mono font-medium">{tracking.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Carrier</p>
                <p className="font-medium">{tracking.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Service Type</p>
                <p className="font-medium">Ground</p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Delivery Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Live Tracking Map</h3>
                <p className="text-sm text-muted-foreground mb-4">See real-time location of your package</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="mr-2 h-4 w-4" />
                Contact {tracking.carrier}
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
