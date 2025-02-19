"use client";

import { useEffect, useRef, useState } from "react";
import Gantt from "frappe-gantt";

interface GanttChartProps {
  houseData: {
    id: string;
    name: string;

    progress: { name: string; start: string; end: string; dependencies: string; progress: number }[];
  } | null;
}

export function GanttChart({ houseData }: GanttChartProps) {
  const [isClient, setIsClient] = useState(false);
  const ganttRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (ganttRef.current && houseData) {
      // Clear the gantt chart
      ganttRef.current.innerHTML = "";
      const tasks = houseData.progress.map((task, index) => ({
        id: (index + 1).toString(),
        name: task.name,
        start: task.start,
        end: task.end,
        progress: task.progress,
        dependencies: index > 0 ? String(index) : "",
      }));

      new Gantt(ganttRef.current, tasks, {
        view_mode: "Week",
        on_click: (task) => alert(`Clicked on task: ${task.name}`),
      });
    }
  }, [houseData]);

  return <>{isClient && <div ref={ganttRef} className="w-full overflow-hidden pointer-events-none select-none"></div>}</>;
}
