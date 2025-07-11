"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Server,
  Database,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

export function SystemOverview() {
  const systemMetrics = {
    cpu: { usage: 23.5, cores: 8, temperature: 45 },
    memory: { used: 12.4, total: 32, percentage: 38.75 },
    storage: { used: 2.4, total: 10, percentage: 24 },
    network: { inbound: 1.2, outbound: 0.8, latency: 12 },
    database: { size: 2.4, connections: 45, queries: 1247 },
  }

  const services = [
    { name: "Web Server", status: "running", uptime: "99.9%", port: 80 },
    { name: "Database", status: "running", uptime: "99.8%", port: 5432 },
    { name: "Redis Cache", status: "running", uptime: "99.9%", port: 6379 },
    { name: "Email Service", status: "running", uptime: "98.5%", port: 587 },
    { name: "File Storage", status: "warning", uptime: "97.2%", port: 443 },
    { name: "Analytics", status: "running", uptime: "99.1%", port: 8080 },
  ]

  const recentEvents = [
    { type: "info", message: "System backup completed successfully", time: "5 minutes ago" },
    { type: "warning", message: "High memory usage detected on server-02", time: "15 minutes ago" },
    { type: "success", message: "Security patch applied to all servers", time: "1 hour ago" },
    { type: "error", message: "Failed login attempt from suspicious IP", time: "2 hours ago" },
    { type: "info", message: "Database optimization completed", time: "3 hours ago" },
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      running: { label: "Running", className: "bg-green-900 text-green-100 border-green-700" },
      warning: { label: "Warning", className: "bg-yellow-900 text-yellow-100 border-yellow-700" },
      error: { label: "Error", className: "bg-red-900 text-red-100 border-red-700" },
      stopped: { label: "Stopped", className: "bg-gray-700 text-gray-300 border-gray-600" },
    }
    const { label, className } = config[status as keyof typeof config] || config.running
    return <Badge className={className}>{label}</Badge>
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Activity className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-white">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <span>CPU Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{systemMetrics.cpu.usage}%</span>
              <Badge className="bg-cyan-900 text-cyan-100">{systemMetrics.cpu.cores} cores</Badge>
            </div>
            <Progress value={systemMetrics.cpu.usage} className="h-2" />
            <div className="text-sm text-gray-400">Temperature: {systemMetrics.cpu.temperature}°C</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-white">
              <MemoryStick className="h-5 w-5 text-purple-400" />
              <span>Memory</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{systemMetrics.memory.percentage.toFixed(1)}%</span>
              <Badge className="bg-purple-900 text-purple-100">
                {systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB
              </Badge>
            </div>
            <Progress value={systemMetrics.memory.percentage} className="h-2" />
            <div className="text-sm text-gray-400">
              Available: {(systemMetrics.memory.total - systemMetrics.memory.used).toFixed(1)}GB
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-white">
              <HardDrive className="h-5 w-5 text-green-400" />
              <span>Storage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{systemMetrics.storage.percentage}%</span>
              <Badge className="bg-green-900 text-green-100">
                {systemMetrics.storage.used}GB / {systemMetrics.storage.total}GB
              </Badge>
            </div>
            <Progress value={systemMetrics.storage.percentage} className="h-2" />
            <div className="text-sm text-gray-400">
              Free: {(systemMetrics.storage.total - systemMetrics.storage.used).toFixed(1)}GB
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services Status */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-white">
              <Server className="h-5 w-5 text-blue-400" />
              <span>System Services</span>
            </CardTitle>
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-gray-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      service.status === "running"
                        ? "bg-green-400"
                        : service.status === "warning"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-white">{service.name}</p>
                    <p className="text-sm text-gray-400">Port: {service.port}</p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(service.status)}
                  <p className="text-xs text-gray-400 mt-1">Uptime: {service.uptime}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-white">
              <Activity className="h-5 w-5 text-orange-400" />
              <span>Recent Events</span>
            </CardTitle>
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                {getEventIcon(event.type)}
                <div className="flex-1">
                  <p className="text-sm text-white">{event.message}</p>
                  <div className="flex items-center space-x-1 mt-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Network & Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Network className="h-5 w-5 text-indigo-400" />
              <span>Network Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{systemMetrics.network.inbound}</p>
                <p className="text-sm text-gray-400">MB/s In</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{systemMetrics.network.outbound}</p>
                <p className="text-sm text-gray-400">MB/s Out</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{systemMetrics.network.latency}</p>
                <p className="text-sm text-gray-400">ms Latency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Database className="h-5 w-5 text-emerald-400" />
              <span>Database Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{systemMetrics.database.size}</p>
                <p className="text-sm text-gray-400">GB Size</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{systemMetrics.database.connections}</p>
                <p className="text-sm text-gray-400">Connections</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{systemMetrics.database.queries}</p>
                <p className="text-sm text-gray-400">Queries/min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
