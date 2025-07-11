"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

export function Header() {
  const { items } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = items.reduce((sum:any, item:any) => sum + item.quantity, 0)

  const NavLinks = () => (
    <>
      <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
        Shop
      </Link>
      <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
        Categories
      </Link>
      <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
        About
      </Link>
      <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
        Contact
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl">Shopricana</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-8" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                  <div className="pt-4 border-t">
                    <Input placeholder="Search products..." className="mb-4" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* User Account */}
            <Link href="/auth/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
