"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";

// TODO: Implement form components
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  paymentMethod: z.string(),
  nameOnCard: z.string(),
  cardNumber: z.string(),
  expirationMonth: z.string(),
  expirationYear: z.string(),
  securityCode: z.string(),
});

function CheckoutContent() {
  // TODO: Implement form submission
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "Personal"; // Default to "Basic" if no plan is selected

  const isPersonalPlan = Boolean(plan === "Personal");

  // Hook form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "card",
      nameOnCard: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      securityCode: "",
    },
  });

  // TODO: Implement form submission
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //

  const subscribe = async () => {
    try {
      const url_param = new URLSearchParams({ plan: plan });

      const res = await fetch("/api/subscription/subscribe?" + url_param);
      if (res.ok) {
        console.log("Inside res.ok");
        let route = "/api/auth/login?returnTo=/register-business?" + url_param;
        if (isPersonalPlan) {
          console.log("Inside isPersonalPlan");
          route = "/api/auth/login?returnTo=/home/register-personal?" + url_param;
        }
        router.push(route);
      } else {
        if (res.status == 400 || res.status == 404) {
          setMessage("User not found");
        } else {
          setMessage("Error: " + res.statusText);
        }
      }
    } catch (error) {
      setMessage("Error: " + error);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto text-center">
      {/* 🔹 Page Title */}
      <h1 className="text-3xl font-bold">Confirm Subscription</h1>

      {/* 🔹 Payment Form Card */}
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">
            <span className="font-normal">Selected Plan:</span> {plan}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(subscribe)} className="space-y-4">
              {/* Payment Method */}
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment method</FormLabel>
                    <RadioGroup {...field} className="flex items-center gap-4 mt-2">
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card">
                            <div className="h-7 w-40 rounded-full relative">
                              <Image fill src="/credit_cards.png" alt="Credit Cards" className="h-6 inline-block mr-1" />
                            </div>
                          </Label>
                        </div>
                      </FormControl>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">
                            <div className="h-7 w-10 rounded-full relative">
                              <Image fill src="/paypal.png" alt="PayPal" className="h-6 inline-block" />
                            </div>
                          </Label>
                        </div>
                      </FormControl>
                    </RadioGroup>
                  </FormItem>
                )}
              />

              {/* Name on Card */}
              <FormField
                control={form.control}
                name="nameOnCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on card</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Card Number */}
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card number</FormLabel>
                    <FormControl>
                      <Input placeholder="0000 0000 0000 0000" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Expiration Date */}
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="expirationMonth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Expiration month</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="01 - January" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="01">01 - January</SelectItem>
                            <SelectItem value="02">02 - February</SelectItem>
                            <SelectItem value="03">03 - March</SelectItem>
                            <SelectItem value="04">04 - April</SelectItem>
                            <SelectItem value="05">05 - May</SelectItem>
                            <SelectItem value="06">06 - June</SelectItem>
                            <SelectItem value="07">07 - July</SelectItem>
                            <SelectItem value="08">08 - August</SelectItem>
                            <SelectItem value="09">09 - September</SelectItem>
                            <SelectItem value="10">10 - October</SelectItem>
                            <SelectItem value="11">11 - November</SelectItem>
                            <SelectItem value="12">12 - December</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expirationYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="2023" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={i} value={`${2023 + i}`}>
                                {2023 + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Security Code */}
              <FormField
                control={form.control}
                name="securityCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security code</FormLabel>
                    <FormControl>
                      <Input placeholder="000" className="w-24" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <Link href="/pricing">
                  <Button variant="outline">Back</Button>
                </Link>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">Confirm</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// TODO: Remove the following comment
// 🔹 ✅ Wrap in Suspense to prevent hydration issues
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
