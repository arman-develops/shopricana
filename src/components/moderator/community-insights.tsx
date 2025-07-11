"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MessageSquare,
  Star,
  TrendingUp,
  TrendingDown,
  Heart,
  Flag,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react"

export function CommunityInsights() {
  const communityStats = {
    totalMembers: 15847,
    activeToday: 3456,
    newMembers: 234,
    engagementRate: 78.5,
    satisfactionScore: 4.6,
    moderationScore: 96.2,
  }

  const contentStats = [
    { type: "Reviews", count: 2847, trend: "up", change: "+12%" },
    { type: "Comments", count: 5632, trend: "up", change: "+8%" },
    { type: "Questions", count: 1234, trend: "down", change: "-3%" },
    { type: "Reports", count: 45, trend: "down", change: "-15%" },
  ]

const topContributors = [
  { name: "Wanjiku Njeri", contributions: 156, rating: 4.9, badge: "Super Reviewer" },
  { name: "Kevin Otieno", contributions: 134, rating: 4.8, badge: "Helpful Member" },
  { name: "Faith Kiprop", contributions: 98, rating: 4.7, badge: "Active Contributor" },
  { name: "Brian Mwangi", contributions: 87, rating: 4.6, badge: "Community Helper" },
];


const recentActivity = [
  { action: "New review posted", user: "James Mwangi", item: "Oraimo Wireless Earbuds", time: "5 min ago", type: "review" },
  { action: "Question answered", user: "Achieng Atieno", item: "Return Policy", time: "12 min ago", type: "help" },
  { action: "Product rated", user: "Brian Kiptoo", item: "Mika Smart Watch", time: "18 min ago", type: "rating" },
  {
    action: "Comment reported",
    user: "Anonymous",
    item: "Offensive language in comment",
    time: "25 min ago",
    type: "report",
  },
];


  const getActivityIcon = (type: string) => {
    switch (type) {
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />
      case "help":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "rating":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "report":
        return <Flag className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Community Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-emerald-800 font-semibold">Community Health</p>
                  <p className="text-emerald-600 text-sm">Overall wellness score</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-700">{communityStats.moderationScore}%</p>
                <Badge className="bg-emerald-200 text-emerald-800 mt-1">Excellent</Badge>
              </div>
            </div>
            <Progress value={communityStats.moderationScore} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-blue-800 font-semibold">Engagement Rate</p>
                  <p className="text-blue-600 text-sm">User participation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-700">{communityStats.engagementRate}%</p>
                <Badge className="bg-blue-200 text-blue-800 mt-1">High</Badge>
              </div>
            </div>
            <Progress value={communityStats.engagementRate} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-purple-800 font-semibold">Satisfaction</p>
                  <p className="text-purple-600 text-sm">Average rating</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-700">{communityStats.satisfactionScore}</p>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(communityStats.satisfactionScore)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Progress value={(communityStats.satisfactionScore / 5) * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Statistics */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-700">
              <MessageSquare className="h-5 w-5" />
              <span>Content Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contentStats.map((stat) => (
              <div key={stat.type} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-800">{stat.type}</p>
                    <p className="text-sm text-emerald-600">{stat.count.toLocaleString()} total</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Contributors */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-700">
              <Award className="h-5 w-5" />
              <span>Top Contributors</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContributors.map((contributor, index) => (
              <div key={contributor.name} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-800">{contributor.name}</p>
                    <Badge className="bg-emerald-200 text-emerald-800 text-xs">{contributor.badge}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-700">{contributor.contributions}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-emerald-600">{contributor.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Community Activity */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-emerald-700">
            <Clock className="h-5 w-5" />
            <span>Recent Community Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-lg">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm text-emerald-800">
                  <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()}
                </p>
                <p className="text-xs text-emerald-600">{activity.item}</p>
              </div>
              <div className="text-xs text-emerald-500">{activity.time}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
