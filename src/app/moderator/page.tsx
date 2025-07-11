import { ModeratorDashboard } from "@/components/moderator/moderator-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ModeratorPage() {
  return (
    <ProtectedRoute requiredRole="moderator">
      <ModeratorDashboard />
    </ProtectedRoute>
  )
}