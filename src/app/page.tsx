import { ProductGrid } from "@/components/shop/product-grid"
import { Hero } from "@/components/shop/hero"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground mt-2">Discover our latest collection</p>
        </div>
        <ProductGrid />
      </main>
    </div>
  )
}