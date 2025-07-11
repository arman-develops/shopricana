"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/hooks/use-cart"
import { CreditCard, Truck, MapPin, User } from "lucide-react"
import { type CheckedState } from "@radix-ui/react-checkbox";
import Link from "next/link"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [sameAsShipping, setSameAsShipping] = useState<CheckedState>(true)

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.08
  const shipping = shippingMethod === "express" ? 15.99 : 0
  const total = subtotal + tax + shipping

  const handlePlaceOrder = () => {
    // Handle order placement
    console.log("Order placed!")
    clearCart()
    // Redirect to success page
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="10001" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Standard Shipping</p>
                        <p className="text-sm text-muted-foreground">5-7 business days</p>
                      </div>
                      <span className="font-medium">Free</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Express Shipping</p>
                        <p className="text-sm text-muted-foreground">2-3 business days</p>
                      </div>
                      <span className="font-medium">$15.99</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="sameAsShipping" checked={sameAsShipping} onCheckedChange={setSameAsShipping} />
                <Label htmlFor="sameAsShipping">Same as shipping address</Label>
              </div>

              {!sameAsShipping && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingFirstName">First Name</Label>
                      <Input id="billingFirstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="billingLastName">Last Name</Label>
                      <Input id="billingLastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input id="billingAddress" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City</Label>
                      <Input id="billingCity" placeholder="New York" />
                    </div>
                    <div>
                      <Label htmlFor="billingZip">ZIP Code</Label>
                      <Input id="billingZip" placeholder="10001" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handlePlaceOrder} className="w-full" size="lg">
                Place Order
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
