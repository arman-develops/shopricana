"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  Eye,
  Lock,
  Activity,
  Search,
  Download,
  RefreshCw,
  Clock,
  MapPin,
  User,
  CheckCircle,
} from "lucide-react"

export function SecurityAudit() {
  const [searchTerm, setSearchTerm] = useState("")

const securityAlerts = [
  {
    id: 1,
    type: "failed_login",
    severity: "high",
    message: "Multiple failed login attempts detected",
    ip: "192.168.1.100",
    location: "Nairobi, KE",
    timestamp: "2024-01-15 14:30:25",
    status: "investigating",
    user: "admin@zuriestore.co.ke",
  },
  {
    id: 2,
    type: "suspicious_activity",
    severity: "medium",
    message: "Unusual API access pattern detected",
    ip: "10.0.0.45",
    location: "Unknown",
    timestamp: "2024-01-15 13:45:12",
    status: "resolved",
    user: "api_user",
  },
  {
    id: 3,
    type: "privilege_escalation",
    severity: "critical",
    message: "Unauthorized admin access attempt",
    ip: "203.0.113.42",
    location: "Mombasa, KE",
    timestamp: "2024-01-15 12:15:08",
    status: "blocked",
    user: "unknown",
  },
];

const auditLogs = [
  {
    id: 1,
    action: "User Login",
    user: "alex@zuriestore.co.ke",
    ip: "192.168.1.50",
    timestamp: "2024-01-15 15:30:00",
    status: "success",
    details: "Admin dashboard access",
  },
  {
    id: 2,
    action: "Settings Modified",
    user: "alex@zuriestore.co.ke",
    ip: "192.168.1.50",
    timestamp: "2024-01-15 15:25:00",
    status: "success",
    details: "SMS gateway configuration updated (Safaricom)",
  },
  {
    id: 3,
    action: "User Created",
    user: "alex@zuriestore.co.ke",
    ip: "192.168.1.50",
    timestamp: "2024-01-15 14:45:00",
    status: "success",
    details: "New customer care agent account created",
  },
  {
    id: 4,
    action: "Failed Login",
    user: "unknown",
    ip: "203.0.113.42",
    timestamp: "2024-01-15 12:15:00",
    status: "failed",
    details: "Invalid credentials entered from Mombasa",
  },
];

const vulnerabilityScans = [
  {
    id: 1,
    component: "Customer Portal (Web App)",
    lastScan: "2024-01-15 10:00:00",
    status: "clean",
    vulnerabilities: 0,
    severity: "none",
  },
  {
    id: 2,
    component: "Order Management Database",
    lastScan: "2024-01-15 09:30:00",
    status: "warning",
    vulnerabilities: 2,
    severity: "low",
  },
  {
    id: 3,
    component: "M-PESA API Integration",
    lastScan: "2024-01-15 09:00:00",
    status: "clean",
    vulnerabilities: 0,
    severity: "none",
  },
  {
    id: 4,
    component: "File Upload System (User Docs)",
    lastScan: "2024-01-15 08:30:00",
    status: "alert",
    vulnerabilities: 1,
    severity: "medium",
  },
];

  const getSeverityBadge = (severity: string) => {
    const config = {
      critical: { label: "Critical", className: "bg-red-900 text-red-100 border-red-700" },
      high: { label: "High", className: "bg-orange-900 text-orange-100 border-orange-700" },
      medium: { label: "Medium", className: "bg-yellow-900 text-yellow-100 border-yellow-700" },
      low: { label: "Low", className: "bg-blue-900 text-blue-100 border-blue-700" },
      none: { label: "None", className: "bg-green-900 text-green-100 border-green-700" },
    }
    const { label, className } = config[severity as keyof typeof config] || config.low
    return <Badge className={className}>{label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const config = {
      investigating: { label: "Investigating", className: "bg-yellow-900 text-yellow-100 border-yellow-700" },
      resolved: { label: "Resolved", className: "bg-green-900 text-green-100 border-green-700" },
      blocked: { label: "Blocked", className: "bg-red-900 text-red-100 border-red-700" },
      success: { label: "Success", className: "bg-green-900 text-green-100 border-green-700" },
      failed: { label: "Failed", className: "bg-red-900 text-red-100 border-red-700" },
      clean: { label: "Clean", className: "bg-green-900 text-green-100 border-green-700" },
      warning: { label: "Warning", className: "bg-yellow-900 text-yellow-100 border-yellow-700" },
      alert: { label: "Alert", className: "bg-red-900 text-red-100 border-red-700" },
    }
    const { label, className } = config[status as keyof typeof config] || config.investigating
    return <Badge className={className}>{label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-red-900 border-red-700 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Critical Alerts</p>
                <p className="text-3xl font-bold text-white">1</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-900 border-orange-700 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Active Threats</p>
                <p className="text-3xl font-bold text-white">3</p>
              </div>
              <Shield className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-900 border-blue-700 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Blocked IPs</p>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
              <Lock className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-900 border-green-700 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Security Score</p>
                <p className="text-3xl font-bold text-white">94%</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700">
          <TabsTrigger value="alerts" className="text-gray-300 data-[state=active]:text-white">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Security Alerts
          </TabsTrigger>
          <TabsTrigger value="audit" className="text-gray-300 data-[state=active]:text-white">
            <Activity className="h-4 w-4 mr-2" />
            Audit Logs
          </TabsTrigger>
          <TabsTrigger value="scans" className="text-gray-300 data-[state=active]:text-white">
            <Eye className="h-4 w-4 mr-2" />
            Vulnerability Scans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Security Alerts</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-3">
                {securityAlerts.map((alert) => (
                  <Card key={alert.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          <div>
                            <h4 className="font-semibold text-white">{alert.message}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{alert.user}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>
                                  {alert.ip} ({alert.location})
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{alert.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-gray-600 border-gray-500 text-gray-300">
                          <Eye className="h-3 w-3 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline" className="bg-gray-600 border-gray-500 text-gray-300">
                          Block IP
                        </Button>
                        <Button size="sm" variant="outline" className="bg-gray-600 border-gray-500 text-gray-300">
                          Resolve
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Action</TableHead>
                      <TableHead className="text-gray-300">User</TableHead>
                      <TableHead className="text-gray-300">IP Address</TableHead>
                      <TableHead className="text-gray-300">Timestamp</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id} className="border-gray-700 hover:bg-gray-700">
                        <TableCell className="font-medium text-white">{log.action}</TableCell>
                        <TableCell className="text-gray-300">{log.user}</TableCell>
                        <TableCell className="text-gray-300">{log.ip}</TableCell>
                        <TableCell className="text-gray-300">{log.timestamp}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell className="text-gray-300">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scans" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Vulnerability Scans</CardTitle>
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Full Scan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilityScans.map((scan) => (
                  <Card key={scan.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{scan.component}</h4>
                            <p className="text-sm text-gray-400">Last scan: {scan.lastScan}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white font-medium">{scan.vulnerabilities} vulnerabilities</p>
                            {getSeverityBadge(scan.severity)}
                          </div>
                          {getStatusBadge(scan.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
