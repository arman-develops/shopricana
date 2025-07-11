"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  AlertTriangle,
  Clock,
  Mail,
  Shield,
  Ban,
} from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // ─── Discrete string‑literal unions keep you safe ──────────────
  type UserStatus = "active" | "inactive" | "banned" | "warned" | "suspended";
  type UserRole   = "customer" | "moderator" | "admin";

  // ─── Main shape ────────────────────────────────────────────────
  interface User {
    id:          number;
    name:        string;
    email:       string;
    joinDate:    string;        // ISO‑8601 preferred, e.g. "2023-06-15"
    lastActive:  string;        // "2 hours ago" or a timestamp—up to you
    status:      UserStatus;
    role:        UserRole;
    orders:      number;
    totalSpent:  number;        // use a money type / BigInt if you need cents safety
    warnings:    number;
    reputation:  number;        // 0–5 stars? clamp in UI
  }

  const users: User[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      joinDate: "2023-06-15",
      lastActive: "2 hours ago",
      status: "active",
      role: "customer",
      orders: 12,
      totalSpent: 1247.89,
      warnings: 0,
      reputation: 4.8,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      joinDate: "2023-08-22",
      lastActive: "1 day ago",
      status: "active",
      role: "customer",
      orders: 8,
      totalSpent: 892.34,
      warnings: 1,
      reputation: 4.5,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joinDate: "2023-04-10",
      lastActive: "3 days ago",
      status: "warned",
      role: "customer",
      orders: 15,
      totalSpent: 2134.56,
      warnings: 2,
      reputation: 3.9,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      joinDate: "2023-09-05",
      lastActive: "5 minutes ago",
      status: "active",
      role: "customer",
      orders: 3,
      totalSpent: 234.67,
      warnings: 0,
      reputation: 5.0,
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert@example.com",
      joinDate: "2023-03-18",
      lastActive: "1 week ago",
      status: "suspended",
      role: "customer",
      orders: 7,
      totalSpent: 567.89,
      warnings: 3,
      reputation: 2.1,
    },
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Active", className: "bg-green-100 text-green-800" },
      warned: { label: "Warned", className: "bg-yellow-100 text-yellow-800" },
      suspended: { label: "Suspended", className: "bg-red-100 text-red-800" },
      banned: { label: "Banned", className: "bg-red-100 text-red-800" },
    }
    const { label, className } = config[status as keyof typeof config] || config.active
    return <Badge className={className}>{label}</Badge>
  }

  const getReputationColor = (reputation: number) => {
    if (reputation >= 4.5) return "text-green-600"
    if (reputation >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700">Total Users</p>
                <p className="text-3xl font-bold text-emerald-800">{users.length}</p>
              </div>
              <Users className="h-12 w-12 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700">Active Users</p>
                <p className="text-3xl font-bold text-green-800">{users.filter((u) => u.status === "active").length}</p>
              </div>
              <Shield className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700">Warned Users</p>
                <p className="text-3xl font-bold text-yellow-800">
                  {users.filter((u) => u.status === "warned").length}
                </p>
              </div>
              <AlertTriangle className="h-12 w-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-100 to-pink-100 border-red-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700">Suspended</p>
                <p className="text-3xl font-bold text-red-800">
                  {users.filter((u) => u.status === "suspended").length}
                </p>
              </div>
              <Ban className="h-12 w-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-emerald-700">
            <Users className="h-5 w-5" />
            <span>User Management</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-emerald-50">
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Reputation</TableHead>
                  <TableHead>Warnings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-emerald-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-emerald-800">{user.name}</p>
                          <div className="flex items-center space-x-1 text-sm text-emerald-600">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-emerald-600">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm">{user.lastActive}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-emerald-800">{user.orders}</p>
                        <p className="text-sm text-emerald-600">${user.totalSpent}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className={`font-medium ${getReputationColor(user.reputation)}`}>
                          {user.reputation.toFixed(1)}
                        </span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${user.warnings > 0 ? "text-red-600" : "text-emerald-600"}`}>
                          {user.warnings}
                        </span>
                        {user.warnings > 0 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch checked={user.status === "active"} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Issue Warning
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-emerald-700">User Details: {selectedUser.name}</CardTitle>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> {selectedUser.email}
                    </p>
                    <p>
                      <strong>Join Date:</strong> {selectedUser.joinDate}
                    </p>
                    <p>
                      <strong>Last Active:</strong> {selectedUser.lastActive}
                    </p>
                    <p>
                      <strong>Status:</strong> {getStatusBadge(selectedUser.status)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">Activity Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Total Orders:</strong> {selectedUser.orders}
                    </p>
                    <p>
                      <strong>Total Spent:</strong> ${selectedUser.totalSpent}
                    </p>
                    <p>
                      <strong>Reputation:</strong> {selectedUser.reputation}/5.0
                    </p>
                    <p>
                      <strong>Warnings:</strong> {selectedUser.warnings}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">Moderation Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Warning Message
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Issue Formal Warning
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 bg-transparent">
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend Account
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">Add Note</h4>
                  <Textarea placeholder="Add a moderation note..." rows={3} />
                  <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">Save Note</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
