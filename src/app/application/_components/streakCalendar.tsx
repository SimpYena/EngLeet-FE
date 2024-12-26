"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";

export default function StreakCalendar({ dates = [] }: { dates: string[] }) {
  const [parsedDates, setParsedDates] = React.useState<Date[]>([]);
  React.useEffect(() => {
    const p = dates.map((date) => moment(date, "YYYY/MM/DD").toDate());
    setParsedDates(p);
  }, [dates]);

  return (
    <div className="">
      <Calendar
        mode="multiple"
        selected={parsedDates}
        className="rounded-md border shadow"
        modifiers={{
          marked: parsedDates
        }}
        modifiersStyles={{
          marked: { backgroundColor: "rgb(34 197 94)", borderRadius: "50%" }
        }}
        fromDate={moment().startOf("date").toDate()}
      />
    </div>
  );
}
