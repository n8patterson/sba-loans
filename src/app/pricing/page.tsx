"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import HomeLayout from "@/components/layouts/home-layout";

const plans = [
  {
    name: "Personal",
    price: "$9.99/month",
    description: "For individuals and small teams.",
    features: ["Track house progress", "Email notifications", "Basic support"],
    highlight: false,
  },
  {
    name: "Team",
    price: "$29.99/month",
    description: "For growing businesses.",
    features: ["All Basic features", "Live chat support", "Advanced reports"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    description: "For large organizations.",
    features: ["All Pro features", "Dedicated account manager", "API access"],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto text-center">
      {/* 🔹 Page Title */}
      <h1 className="text-4xl font-bold">Select a Plan</h1>

      {/* 🔹 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative p-6 shadow-lg border transition-transform duration-300 hover:scale-105",
              plan.highlight ? "border-pink-500 ring-2 ring-pink-500" : "border-gray-200"
            )}
          >
            {/* 🔹 "Most Popular" Tag */}
            {plan.highlight && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            {/* 🔹 Card Header */}
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
              <p className="text-gray-600">{plan.description}</p>
            </CardHeader>

            {/* 🔹 Pricing */}
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-gray-600 text-left mx-auto max-w-xs">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>

              {/* 🔹 Select Plan Button */}
              <Link href={`/checkout?plan=${encodeURIComponent(plan.name)}`}>
                <Button
                  className={cn(
                    "mt-6 w-full py-2 font-semibold text-lg transition-all duration-200",
                    plan.highlight ? "bg-pink-600 hover:bg-pink-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  )}
                >
                  Choose Plan
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

PricingPage.getLayout = function(page: any) {
  return <HomeLayout>{page}</HomeLayout>;
};
