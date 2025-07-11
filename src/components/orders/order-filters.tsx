"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "lucide-react"

interface OrderFiltersProps {
  selectedTimeRange: string
  onTimeRangeChange: (range: string) => void
}

export function OrderFilters({ selectedTimeRange, onTimeRangeChange }: OrderFiltersProps) {
  const timeRanges = [
    { value: "all", label: "All Time" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 3 Months" },
    { value: "year", label: "This Year" },
  ]

  const selectedLabel = timeRanges.find((range) => range.value === selectedTimeRange)?.label || "All Time"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <Calendar className="h-4 w-4 mr-2" />
          {selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {timeRanges.map((range) => (
          <DropdownMenuItem
            key={range.value}
            onClick={() => onTimeRangeChange(range.value)}
            className={selectedTimeRange === range.value ? "bg-accent" : ""}
          >
            {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
