"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { WarrantyClaim } from "@/components/admin/columns";
import { format, parseISO } from "date-fns";

// Props type
interface ClaimsCalendarProps {
  claims: WarrantyClaim[];
}

export function ClaimsCalendar({ claims }: ClaimsCalendarProps) {
  // Assign random dates to claims (Replace with API later)
  const claimsWithDates = claims.map((claim, index) => ({
    ...claim,
    date: format(new Date().setDate(new Date().getDate() + index * 2), "yyyy-MM-dd"),
  }));

  // Set the first claim's date as the selected date
  const [selectedDate, setSelectedDate] = useState<Date>(parseISO(claimsWithDates[0]?.date || format(new Date(), "yyyy-MM-dd")));

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold">Claim Work Schedule</h3>
      <Calendar mode="single" selected={selectedDate} onSelect={(day) => day && setSelectedDate(day)} className="rounded-md border" />
      <div className="text-center mt-4">
        {claimsWithDates.some((claim) => claim.date === format(selectedDate, "yyyy-MM-dd")) ? (
          <ul className="list-disc space-y-2">
            {claimsWithDates
              .filter((claim) => claim.date === format(selectedDate, "yyyy-MM-dd"))
              .map((claim) => (
                <li key={claim.id} className="text-gray-700">
                  {claim.title} - <span className="font-semibold">{claim.category}</span>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No claims scheduled for this date.</p>
        )}
      </div>
    </div>
  );
}
