"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Download,
  MessageCircle,
  RefreshCw,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { OrderTimeline } from "@/components/orders/order-timeline"

// Mock detailed order data
const mockOrderDetail = {
  id: "ORD-2024-001",
  date: "2024-07-01",
  status: "delivered",
  total: 2599,
  subtotal: 2599,
  tax: 0,
  shipping: 0,
  discount: 0,
  items: [
    {
      id: "1",
      name: "Oraimo FreePods 3",
      description: "Wireless earbuds with deep bass and noise cancellation",
      price: 1299,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      sku: "ORA-FP3-001",
    },
    {
      id: "2",
      name: "Infinix Hot 30 Protective Case",
      description: "Flexible silicone case with reinforced edges",
      price: 500,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      sku: "INF-H30C-002",
    },
    {
      id: "3",
      name: "Baseus USB-C Cable",
      description: "Durable 1m fast-charging Type-C cable",
      price: 400,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      sku: "BAS-USBC-003",
    },
  ],
  shippingAddress: {
    name: "Brian Otieno",
    street: "Kisumu-Kakamega Rd, Milimani",
    city: "Kisumu",
    state: "Kisumu",
    zipCode: "40100",
    country: "Kenya",
  },
  billingAddress: {
    name: "Brian Otieno",
    street: "Kisumu-Kakamega Rd, Milimani",
    city: "Kisumu",
    state: "Kisumu",
    zipCode: "40100",
    country: "Kenya",
  },
  paymentMethod: {
    type: "Mpesa",
    last4: "0723",
    brand: "Safaricom",
  },
  trackingNumber: "KES-TRK-001",
  estimatedDelivery: "2024-07-03",
  actualDelivery: "2024-07-02",
  timeline: [
    {
      status: "Order Placed",
      date: "2024-07-01 10:00 AM",
      description: "Tumepokea order yako. Tunaitayarisha.",
      completed: true,
    },
    {
      status: "Payment Confirmed",
      date: "2024-07-01 10:01 AM",
      description: "Malipo yako kupitia M-Pesa yamefanikiwa.",
      completed: true,
    },
    {
      status: "Order Processing",
      date: "2024-07-01 1:00 PM",
      description: "Bidhaa zako zinatayarishwa kwa usafirishaji.",
      completed: true,
    },
    {
      status: "Shipped",
      date: "2024-07-02 7:30 AM",
      description: "Mizigo yako imesafirishwa kutoka Nairobi.",
      completed: true,
    },
    {
      status: "Out for Delivery",
      date: "2024-07-02 2:00 PM",
      description: "Gari ya kusafirisha iko njiani kuleta mzigo wako.",
      completed: true,
    },
    {
      status: "Delivered",
      date: "2024-07-02 5:15 PM",
      description: "Mzigo wako umefikishwa salama.",
      completed: true,
    },
  ],
}

type OrderDetailPageProps = {
  params: Promise<{
    orderId: string
  }>
}

export default function OrderDetailPage({ params }: OrderDetailPageProps ) {
  const [order] = useState(mockOrderDetail)

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
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Order {order.id}</h1>
            <p className="text-muted-foreground">Placed on {formatDate(order.date)}</p>
          </div>
          <div className="flex items-center space-x-2">{getStatusBadge(order.status)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Order Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline timeline={order.timeline} />
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items in this order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                    <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping & Billing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{order.billingAddress.name}</p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  {order.paymentMethod.brand.toUpperCase()}
                </div>
                <span>•••• •••• •••• {order.paymentMethod.last4}</span>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Information */}
          {order.trackingNumber && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                  <p className="font-mono font-medium">{order.trackingNumber}</p>
                </div>
                <Link href={`/orders/${order.id}/track`}>
                  <Button className="w-full">
                    <Truck className="mr-2 h-4 w-4" />
                    Track Package
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              {order.status === "delivered" && (
                <>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Return Items
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Write Review
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Support Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>1-800-SUPPORT</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>support@ecomstore.com</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
