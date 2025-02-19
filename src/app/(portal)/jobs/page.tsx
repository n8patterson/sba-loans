"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BryntumGantt } from "@bryntum/gantt-react";
import { ganttProps } from "@/app/GanttConfig";

// Sample data for construction progress
const jobStages = [
  { name: "Foundation", progress: 100 },
  { name: "Framing", progress: 80 },
  { name: "Plumbing", progress: 60 },
  { name: "Electrical", progress: 40 },
  { name: "Drywall", progress: 20 },
  { name: "Painting", progress: 10 },
  { name: "Finishing", progress: 0 },
];

export default function JobsPage() {
  return (
    <div className="p-6 space-y-6 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Project Progress</h1>
          <p className="text-muted-foreground">Track the status of your home build in real-time.</p>
        </div>
      </div>

      {/* Gantt Chart */}
      <Card className="shadow-lg flex-grow">
        <CardContent className="h-[800px] flex flex-col">
          <BryntumGantt {...ganttProps} />
        </CardContent>
      </Card>

      {/* Job Status Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Project Tasks</CardTitle>
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
              {jobStages.map((job, index) => (
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
    </div>
  );
}
