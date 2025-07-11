"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Mail, Database, Shield, Bell, Save, Download, Upload } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "EcomStore",
    siteDescription: "Your trusted online shopping destination",
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@ecomstore.com",
    smtpPassword: "••••••••",
    emailFromName: "EcomStore",

    // Security Settings
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    requireTwoFactor: false,
    allowPasswordReset: true,

    // Performance Settings
    cacheEnabled: true,
    cacheTimeout: "3600",
    compressionEnabled: true,
    cdnEnabled: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    slackWebhook: "",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings)
    // Handle save logic
  }

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "system-settings.json"
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card className="bg-gray-800 border-gray-700 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">System Configuration</h2>
              <p className="text-gray-400">Manage platform settings and preferences</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleExportSettings}
                className="bg-gray-700 border-gray-600 text-gray-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button onClick={handleSaveSettings} className="bg-cyan-600 hover:bg-cyan-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 border border-gray-700">
          <TabsTrigger value="general" className="text-gray-300 data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email" className="text-gray-300 data-[state=active]:text-white">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="text-gray-300 data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-gray-300 data-[state=active]:text-white">
            <Database className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-gray-300 data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName" className="text-gray-300">
                    Site Name
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription" className="text-gray-300">
                    Site Description
                  </Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Maintenance Mode</Label>
                    <p className="text-sm text-gray-400">Temporarily disable site access for maintenance</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Allow User Registration</Label>
                    <p className="text-sm text-gray-400">Enable new users to create accounts</p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => handleSettingChange("allowRegistration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Require Email Verification</Label>
                    <p className="text-sm text-gray-400">Users must verify email before account activation</p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost" className="text-gray-300">
                    SMTP Host
                  </Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort" className="text-gray-300">
                    SMTP Port
                  </Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) => handleSettingChange("smtpPort", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername" className="text-gray-300">
                    SMTP Username
                  </Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) => handleSettingChange("smtpUsername", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword" className="text-gray-300">
                    SMTP Password
                  </Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => handleSettingChange("smtpPassword", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailFromName" className="text-gray-300">
                  From Name
                </Label>
                <Input
                  id="emailFromName"
                  value={settings.emailFromName}
                  onChange={(e) => handleSettingChange("emailFromName", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                  Test Connection
                </Button>
                <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-gray-300">
                    Session Timeout (hours)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts" className="text-gray-300">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="maxLoginAttempts"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange("maxLoginAttempts", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength" className="text-gray-300">
                    Min Password Length
                  </Label>
                  <Input
                    id="passwordMinLength"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange("passwordMinLength", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">Force 2FA for all admin accounts</p>
                  </div>
                  <Switch
                    checked={settings.requireTwoFactor}
                    onCheckedChange={(checked) => handleSettingChange("requireTwoFactor", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Allow Password Reset</Label>
                    <p className="text-sm text-gray-400">Enable password reset via email</p>
                  </div>
                  <Switch
                    checked={settings.allowPasswordReset}
                    onCheckedChange={(checked) => handleSettingChange("allowPasswordReset", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Performance Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Enable Caching</Label>
                    <p className="text-sm text-gray-400">Cache frequently accessed data</p>
                  </div>
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => handleSettingChange("cacheEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Enable Compression</Label>
                    <p className="text-sm text-gray-400">Compress responses to reduce bandwidth</p>
                  </div>
                  <Switch
                    checked={settings.compressionEnabled}
                    onCheckedChange={(checked) => handleSettingChange("compressionEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Enable CDN</Label>
                    <p className="text-sm text-gray-400">Use content delivery network for static assets</p>
                  </div>
                  <Switch
                    checked={settings.cdnEnabled}
                    onCheckedChange={(checked) => handleSettingChange("cdnEnabled", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cacheTimeout" className="text-gray-300">
                  Cache Timeout (seconds)
                </Label>
                <Input
                  id="cacheTimeout"
                  value={settings.cacheTimeout}
                  onChange={(e) => handleSettingChange("cacheTimeout", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Send system alerts via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">Push Notifications</Label>
                    <p className="text-sm text-gray-400">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <Label className="text-white">SMS Notifications</Label>
                    <p className="text-sm text-gray-400">Critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slackWebhook" className="text-gray-300">
                  Slack Webhook URL
                </Label>
                <Input
                  id="slackWebhook"
                  value={settings.slackWebhook}
                  onChange={(e) => handleSettingChange("slackWebhook", e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
