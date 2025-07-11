"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemOverview } from "./system-overview"
import { UserRoleManagement } from "./user-role-management"
import { SystemSettings } from "./system-settings"
import { SecurityAudit } from "./security-audit"
import { PlatformAnalytics } from "./platform-analytics"
import {
  Settings,
  Users,
  Shield,
  BarChart3,
  Database,
  Server,
  Lock,
  Activity,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react"

export function SystemAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock system stats
  const systemStats = {
    totalUsers: 15847,
    activeUsers: 3456,
    systemUptime: "99.9%",
    serverLoad: 23.5,
    databaseSize: "2.4 GB",
    apiCalls: 1247893,
    securityAlerts: 3,
    backupStatus: "healthy",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              System Administration
            </h1>
            <p className="text-gray-400 mt-2">Complete platform control & monitoring</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-medium text-white">Lex Karanja</p>
              <p className="text-sm text-gray-400">System Administrator</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-emerald-600 to-green-600 border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">System Uptime</p>
                  <p className="text-3xl font-bold text-white">{systemStats.systemUptime}</p>
                </div>
                <div className="relative">
                  <Activity className="h-12 w-12 text-emerald-200" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center mt-4 text-emerald-100">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">All systems operational</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Users</p>
                  <p className="text-3xl font-bold text-white">{systemStats.activeUsers.toLocaleString()}</p>
                </div>
                <Users className="h-12 w-12 text-blue-200" />
              </div>
              <div className="flex items-center mt-4 text-blue-100">
                <Globe className="h-4 w-4 mr-1" />
                <span className="text-sm">Total: {systemStats.totalUsers.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Server Load</p>
                  <p className="text-3xl font-bold text-white">{systemStats.serverLoad}%</p>
                </div>
                <Server className="h-12 w-12 text-orange-200" />
              </div>
              <div className="flex items-center mt-4 text-orange-100">
                <Zap className="h-4 w-4 mr-1" />
                <span className="text-sm">Optimal performance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Security Alerts</p>
                  <p className="text-3xl font-bold text-white">{systemStats.securityAlerts}</p>
                </div>
                <div className="relative">
                  <Shield className="h-12 w-12 text-purple-200" />
                  {systemStats.securityAlerts > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">!</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-4 text-purple-100">
                <Lock className="h-4 w-4 mr-1" />
                <span className="text-sm">Requires attention</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:text-white"
            >
              <Database className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SystemOverview />
          </TabsContent>

          <TabsContent value="users">
            <UserRoleManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecurityAudit />
          </TabsContent>

          <TabsContent value="analytics">
            <PlatformAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
