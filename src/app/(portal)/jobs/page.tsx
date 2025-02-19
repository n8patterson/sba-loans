"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GanttChart } from "@/components/global/gantt-chart";

// Sample house data
const housesData = [
  {
    id: "house_1",
    name: "Maple Residence",
    progress: [
      { name: "Foundation", progress: 100, start: "2025-02-01", end: "2025-02-05", dependencies: "" },
      { name: "Framing", progress: 80, start: "2025-02-06", end: "2025-02-10", dependencies: "1" },
      { name: "Plumbing", progress: 60, start: "2025-02-11", end: "2025-02-15", dependencies: "2" },
      { name: "Electrical", progress: 40, start: "2025-02-16", end: "2025-02-20", dependencies: "3" },
      { name: "Drywall", progress: 20, start: "2025-02-21", end: "2025-02-25", dependencies: "4" },
      { name: "Painting", progress: 10, start: "2025-02-26", end: "2025-03-02", dependencies: "5" },
      { name: "Finishing", progress: 0, start: "2025-03-03", end: "2025-03-07", dependencies: "6" },
    ],
  },
  {
    id: "house_2",
    name: "Oakwood Estate",
    progress: [
      { name: "Foundation", progress: 100, start: "2025-03-01", end: "2025-03-05", dependencies: "" },
      { name: "Framing", progress: 90, start: "2025-03-06", end: "2025-03-10", dependencies: "1" },
      { name: "Plumbing", progress: 70, start: "2025-03-11", end: "2025-03-15", dependencies: "2" },
      { name: "Electrical", progress: 50, start: "2025-03-16", end: "2025-03-20", dependencies: "3" },
      { name: "Drywall", progress: 30, start: "2025-03-21", end: "2025-03-25", dependencies: "4" },
      { name: "Painting", progress: 20, start: "2025-03-26", end: "2025-03-30", dependencies: "5" },
      { name: "Finishing", progress: 10, start: "2025-03-31", end: "2025-04-04", dependencies: "6" },
    ],
  },
  {
    id: "house_3",
    name: "Pine Valley Home",
    progress: [
      { name: "Foundation", progress: 100, start: "2025-04-01", end: "2025-04-05", dependencies: "" },
      { name: "Framing", progress: 85, start: "2025-04-06", end: "2025-04-10", dependencies: "1" },
      { name: "Plumbing", progress: 65, start: "2025-04-11", end: "2025-04-15", dependencies: "2" },
      { name: "Electrical", progress: 45, start: "2025-04-16", end: "2025-04-20", dependencies: "3" },
      { name: "Drywall", progress: 25, start: "2025-04-21", end: "2025-04-25", dependencies: "4" },
      { name: "Painting", progress: 15, start: "2025-04-26", end: "2025-04-30", dependencies: "5" },
      { name: "Finishing", progress: 5, start: "2025-05-01", end: "2025-05-05", dependencies: "6" },
    ],
  },
];

export default function JobsPage() {
  const [selectedHouseId, setSelectedHouseId] = useState(housesData[0].id);

  const selectedHouse = housesData.find((house) => house.id === selectedHouseId);

  return (
    <div className="p-6 space-y-6 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center relative z-50">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Project Progress</h1>
          <p className="text-muted-foreground">Track the status of your home build in real-time.</p>
        </div>

        {/* House Selector */}
        <Select value={selectedHouseId} onValueChange={setSelectedHouseId}>
          <SelectTrigger className="w-72 relative z-50 bg-white shadow-md">
            <SelectValue placeholder="Select a House" />
          </SelectTrigger>
          <SelectContent className="absolute z-[100] bg-white shadow-lg mt-1">
            {housesData.map((house) => (
              <SelectItem key={house.id} value={house.id}>
                {house.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Status Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{selectedHouse?.name} - Project Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 text-left">Job Stage</TableHead>
                <TableHead className="w-1/2 text-left">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedHouse?.progress.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>
                    <Progress value={job.progress} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gantt Chart */}
      <Card className="shadow-lg">
        <CardContent>
          <GanttChart houseData={selectedHouse!} />
        </CardContent>
      </Card>
    </div>
  );
}
