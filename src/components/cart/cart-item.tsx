"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    category: string
    inStock: boolean
  }
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="rounded-md object-cover" />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
              {!item.inStock && <Badge variant="destructive">Out of Stock</Badge>}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={!item.inStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={!item.inStock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Item Total & Remove */}
          <div className="text-right">
            <div className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive mt-1"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
