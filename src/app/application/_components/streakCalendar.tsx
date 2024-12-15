"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import moment from "moment"

export default function StreakCalendar() {
  const [markedDates, setMarkedDates] = React.useState<Date[]>([])

  React.useEffect(() => {
    // Example logic to generate streaks
    const generateStreaks = () => {
      const today = moment().startOf('day');
      const streaks = [];
      for (let i = 0; i < 10; i++) {
      streaks.push(today.clone().subtract(i, 'days').toDate());
      }
      return streaks;
    };

    setMarkedDates(generateStreaks());
  }, [])

  return (
    <div className="space-y-4">
      <Calendar
        mode="multiple"
        selected={markedDates}
        className="rounded-md border shadow"
        
        modifiers={{
          marked: markedDates
        }}
        modifiersStyles={{
          marked: { backgroundColor: 'rgb(34 197 94)', borderRadius: '50%' }
        }}
        fromDate={moment().startOf('date').toDate()}
      />
    </div>
  )
}

