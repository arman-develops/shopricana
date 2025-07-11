"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  MessageCircle,
  MapPin,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  status: string
  total: number
  items: OrderItem[]
  shippingAddress: string
  trackingNumber?: string
  estimatedDelivery: string
  actualDelivery?: string
}

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      processing: {
        label: "Processing",
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Package,
      },
      shipped: {
        label: "Shipped",
        className: "bg-purple-100 text-purple-800 border-purple-200",
        icon: Truck,
      },
      delivered: {
        label: "Delivered",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      cancelled: {
        label: "Cancelled",
        className: "bg-red-100 text-red-800 border-red-200",
        icon: AlertCircle,
      },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const IconComponent = config.icon

    return (
      <Badge className={`${config.className} flex items-center space-x-1`}>
        <IconComponent className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Order Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-bold">{order.id}</h3>
                {getStatusBadge(order.status)}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Ordered {formatDate(order.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Package className="h-4 w-4" />
                  <span>
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>Total: ${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href={`/orders/${order.id}`}>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
              {order.trackingNumber && (
                <Link href={`/orders/${order.id}/track`}>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Package
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Invoice
              </Button>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="space-y-3">
            <h4 className="font-semibold">Items in this order:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="flex items-center justify-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    +{order.items.length - 3} more item{order.items.length - 3 > 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <h4 className="font-semibold mb-2">Shipping Address</h4>
              <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Delivery Information</h4>
              <div className="space-y-1 text-sm">
                {order.actualDelivery ? (
                  <p className="text-green-600 font-medium">Delivered on {formatDate(order.actualDelivery)}</p>
                ) : (
                  <p className="text-muted-foreground">Estimated delivery: {formatDate(order.estimatedDelivery)}</p>
                )}
                {order.trackingNumber && <p className="text-muted-foreground">Tracking: {order.trackingNumber}</p>}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {order.status === "delivered" && (
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" className="bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Write Review
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Package className="h-4 w-4 mr-2" />
                Return Item
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Package className="h-4 w-4 mr-2" />
                Buy Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
