"use client";

import { useEffect, useRef, useState } from "react";
import Gantt from "frappe-gantt";

interface GanttChartProps {
  houseData: {
    id: string;
    name: string;

    progress: { id: string; name: string; start: string; end: string; dependencies: string; progress: number }[];
  } | null;
}

export function GanttChart({ houseData }: GanttChartProps) {
  const [isClient, setIsClient] = useState(false);
  const ganttRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gantt, setGantt] = useState<Gantt | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && ganttRef.current && houseData) {
      // Clear previous Gantt instance
      ganttRef.current.innerHTML = "";

      // Initialize new Gantt chart
      const newGantt = new Gantt(ganttRef.current, houseData.progress, {
        view_mode: "Week",
        on_click: (task) => alert(`Clicked on task: ${task.name}`),
      });

      setGantt(newGantt);
    }
  }, [isClient, houseData]);

  return <>{isClient && <div ref={ganttRef} className="w-full overflow-hidden pointer-events-none select-none"></div>}</>;
}
