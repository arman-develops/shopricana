"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProductEditor } from "./product-editor"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Download, Upload } from "lucide-react"
import Image from "next/image"

export function ProductManager() {
  const [showEditor, setShowEditor] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones Pro Max",
      category: "Electronics",
      price: 299.99,
      stock: 45,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      sku: "WBH-001",
      sales: 234,
    },
    {
      id: 2,
      name: "Organic Cotton Premium T-Shirt",
      category: "Clothing",
      price: 39.99,
      stock: 3,
      status: "low_stock",
      image: "/placeholder.svg?height=60&width=60",
      sku: "OCT-002",
      sales: 567,
    },
    {
      id: 3,
      name: "Smart Home Garden Kit Deluxe",
      category: "Home & Garden",
      price: 149.99,
      stock: 0,
      status: "out_of_stock",
      image: "/placeholder.svg?height=60&width=60",
      sku: "SHG-003",
      sales: 89,
    },
    {
      id: 4,
      name: "Professional Camera Lens 85mm",
      category: "Photography",
      price: 899.99,
      stock: 12,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      sku: "PCL-004",
      sales: 45,
    },
    {
      id: 5,
      name: "Ergonomic Office Chair Executive",
      category: "Furniture",
      price: 549.99,
      stock: 8,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      sku: "EOC-005",
      sales: 123,
    },
  ]

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (status === "low_stock" || stock < 10) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Low Stock
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="bg-green-100 text-green-800">
        In Stock
      </Badge>
    )
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setShowEditor(true)
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setShowEditor(true)
  }

  if (showEditor) {
    return (
      <ProductEditor
        product={editingProduct}
        onClose={() => setShowEditor(false)}
        onSave={() => {
          setShowEditor(false)
          // Handle save logic
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              <p className="text-muted-foreground">Manage your product catalog with ease</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, SKU, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="lg:w-auto bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-16"></TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium line-clamp-2">{product.name}</p>
                        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={product.stock < 10 ? "text-orange-600 font-medium" : ""}>{product.stock}</span>
                        <span className="text-muted-foreground text-sm">units</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{product.sales}</span>
                        <span className="text-muted-foreground text-sm">sold</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
