import { SystemAdminDashboard } from "@/components/admin/system-admin-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function SystemAdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <SystemAdminDashboard />
    </ProtectedRoute>
  )
}
