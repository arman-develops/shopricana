"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />

        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-mono font-bold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-medium">{estimatedDelivery}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="mx-auto h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-semibold">Order Processing</h3>
              <p className="text-sm text-muted-foreground">We're preparing your items</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-semibold text-muted-foreground">Shipping</h3>
              <p className="text-sm text-muted-foreground">Will ship soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Home className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-semibold text-muted-foreground">Delivered</h3>
              <p className="text-sm text-muted-foreground">Estimated {estimatedDelivery}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You will receive an email confirmation shortly with tracking information.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link href="/orders">
              <Button>Track Your Order</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
