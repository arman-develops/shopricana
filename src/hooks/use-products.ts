import { useState, useEffect } from "react"
import type { Product } from "@/types/product"

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 15,
    discount: 20,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with this advanced smartwatch featuring GPS and heart rate monitoring.",
    price: 299.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 8,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    stock: 25,
    discount: 25,
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    description: "85mm f/1.4 portrait lens perfect for professional photography with beautiful bokeh.",
    price: 899.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Photography",
    stock: 5,
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
    price: 449.99,
    originalPrice: 599.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Furniture",
    stock: 12,
    discount: 25,
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Lifestyle",
    stock: 30,
  },
  {
    id: "7",
    name: "Gaming Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with tactile switches perfect for gaming.",
    price: 159.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    stock: 18,
    discount: 20,
  },
  {
    id: "8",
    name: "Yoga Mat Premium",
    description: "Non-slip premium yoga mat with extra cushioning for comfortable practice.",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Fitness",
    stock: 22,
  },
]

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { products, loading }
}
