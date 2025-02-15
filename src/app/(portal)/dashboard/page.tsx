"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function UserHome() {
  const userName = "Nathan Patterson"; // Replace dynamically
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Welcome Message */}
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome back, <strong>{userName}</strong>!
        </h2>
      </div>

      {/* 🔹 Warranty Card */}
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Warranty</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Your warranty is active until <strong>December 31, 2025</strong>.
          </p>
          <Button className="mt-4 w-full" onClick={() => setOpen(true)}>
            Add Claim
          </Button>
        </CardContent>
      </Card>

      {/* 🔹 Add Claim Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Warranty Claim</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter claim title" />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe the issue..." />
            </div>

            <Button className="w-full">Submit Claim</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
