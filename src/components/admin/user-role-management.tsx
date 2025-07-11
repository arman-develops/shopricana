"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Crown,
  User,
  Mail,
  Calendar,
  Activity,
  XCircle,
} from "lucide-react"

export function UserRoleManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "Alex Rodriguez",
      email: "alex@ecomstore.com",
      role: "admin",
      status: "active",
      lastLogin: "2 hours ago",
      joinDate: "2023-01-15",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@ecomstore.com",
      role: "moderator",
      status: "active",
      lastLogin: "30 minutes ago",
      joinDate: "2023-03-22",
      permissions: ["content", "support", "users"],
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@ecomstore.com",
      role: "moderator",
      status: "active",
      lastLogin: "1 day ago",
      joinDate: "2023-05-10",
      permissions: ["content", "support"],
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@ecomstore.com",
      role: "user",
      status: "active",
      lastLogin: "5 minutes ago",
      joinDate: "2023-08-03",
      permissions: ["basic"],
    },
    {
      id: 5,
      name: "John Smith",
      email: "john@ecomstore.com",
      role: "user",
      status: "suspended",
      lastLogin: "1 week ago",
      joinDate: "2023-06-18",
      permissions: ["basic"],
    },
  ]

  const roleStats = {
    admin: users.filter((u) => u.role === "admin").length,
    moderator: users.filter((u) => u.role === "moderator").length,
    user: users.filter((u) => u.role === "user").length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }

  const getRoleBadge = (role: string) => {
    const config = {
      admin: { label: "Admin", className: "bg-red-900 text-red-100 border-red-700", icon: Crown },
      moderator: { label: "Moderator", className: "bg-blue-900 text-blue-100 border-blue-700", icon: Shield },
      user: { label: "User", className: "bg-gray-700 text-gray-300 border-gray-600", icon: User },
    }
    const { label, className, icon: Icon } = config[role as keyof typeof config] || config.user
    return (
      <Badge className={`${className} flex items-center space-x-1`}>
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Active", className: "bg-green-900 text-green-100 border-green-700" },
      suspended: { label: "Suspended", className: "bg-red-900 text-red-100 border-red-700" },
      pending: { label: "Pending", className: "bg-yellow-900 text-yellow-100 border-yellow-700" },
    }
    const { label, className } = config[status as keyof typeof config] || config.active
    return <Badge className={className}>{label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-red-900 border-red-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Admins</p>
                <p className="text-2xl font-bold text-white">{roleStats.admin}</p>
              </div>
              <Crown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-900 border-blue-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Moderators</p>
                <p className="text-2xl font-bold text-white">{roleStats.moderator}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 border-gray-600 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Users</p>
                <p className="text-2xl font-bold text-white">{roleStats.user}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-900 border-green-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active</p>
                <p className="text-2xl font-bold text-white">{roleStats.active}</p>
              </div>
              <Activity className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-900 border-orange-700 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Suspended</p>
                <p className="text-2xl font-bold text-white">{roleStats.suspended}</p>
              </div>
              <Trash2 className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card className="bg-gray-800 border-gray-700 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-white">
            <Users className="h-5 w-5 text-cyan-400" />
            <span>User Management</span>
          </CardTitle>
          <div className="space-x-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Shield className="h-4 w-4 mr-2" />
              Add Moderator
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Button variant="outline" className="lg:w-auto bg-gray-700 border-gray-600 text-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Login</TableHead>
                  <TableHead className="text-gray-300">Join Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Activity className="h-3 w-3" />
                        <span className="text-sm">{user.lastLogin}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">{user.joinDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch checked={user.status === "active"} className="data-[state=checked]:bg-green-600" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-blue-400 hover:bg-gray-700">
                              <Shield className="h-4 w-4 mr-2" />
                              Promote to Moderator
                            </DropdownMenuItem>
                            {user.role === "moderator" && (
                              <DropdownMenuItem className="text-orange-400 hover:bg-gray-700">
                                <XCircle className="h-4 w-4 mr-2" />
                                Demote Moderator
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete User
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
    </div>
  )
}
