"use client"

import { CheckCircle, Circle } from "lucide-react"

interface TimelineItem {
  status: string
  date: string
  description: string
  completed: boolean
}

interface OrderTimelineProps {
  timeline: TimelineItem[]
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <div className="space-y-6">
      {timeline.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            {item.completed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className={`font-semibold ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                {item.status}
              </h4>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
            <p className={`text-sm mt-1 ${item.completed ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
