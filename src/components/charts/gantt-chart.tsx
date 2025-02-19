"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const houseBuildTasks = [
  { id: "1", start: new Date("2024-02-01"), end: new Date("2024-02-07"), name: "Foundation" },
  { id: "2", start: new Date("2024-02-08"), end: new Date("2024-02-21"), name: "Framing" },
  { id: "3", start: new Date("2024-02-22"), end: new Date("2024-03-04"), name: "Plumbing" },
  { id: "4", start: new Date("2024-03-05"), end: new Date("2024-03-14"), name: "Electrical" },
  { id: "5", start: new Date("2024-03-15"), end: new Date("2024-03-25"), name: "Drywall" },
  { id: "6", start: new Date("2024-03-26"), end: new Date("2024-04-10"), name: "Interior Finishes" },
  { id: "7", start: new Date("2024-04-11"), end: new Date("2024-04-20"), name: "Final Inspection" },
];

const progressData = [
  { name: "Foundation", progress: 100 },
  { name: "Framing", progress: 80 },
  { name: "Plumbing", progress: 60 },
  { name: "Electrical", progress: 40 },
  { name: "Drywall", progress: 20 },
  { name: "Interior Finishes", progress: 10 },
  { name: "Final Inspection", progress: 0 },
];

export default function JobsPage() {
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, setTasks] = useState(houseBuildTasks);

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Home Construction Progress</CardTitle>
          <p className="text-sm text-muted-foreground">Track the progress of different phases of your home construction.</p>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      {/* Bar Chart for Progress */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Phase Completion Progress</CardTitle>
          <p className="text-sm text-muted-foreground">View the percentage completion of each phase.</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
