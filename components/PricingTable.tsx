"use client";

import React, { useState } from "react";
import {
  Disc3,
  ArrowRight,
  AudioWaveform,
  Languages,
  Mic,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import NumberFlow from "@number-flow/react";
import { useUser } from "@/contexts/UserContext";
import { createClient } from "@/utils/supabase/client";

type Tier = "free" | "starter" | "pro";

export default function PricingTable() {
  const supabase = createClient();
  const { user, tier: currentTier, loading: userLoading } = useUser();
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [loadingPlan, setLoadingPlan] = useState<Tier | null>(null);

  const pricing = {
    starter: { monthly: 10, annual: 5 },
    pro: { monthly: 15, annual: 8 },
  };
  const billingText =
    billing === "monthly" ? "billed monthly" : "billed annually";

  // OAuth signup/sign-in handler
  async function handleSignIn() {
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}/auth/callback?next=/home` },
    });
  }

  // Kick off Stripe Checkout
  async function handleCheckout(plan: Exclude<Tier, "free">) {
    try {
      setLoadingPlan(plan);
      const intervalParam = billing === "monthly" ? "month" : "year";
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: plan, interval: intervalParam }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Stripe checkout error response:", err);
        throw new Error(err.error || "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setLoadingPlan(null);
    }
  }

  // Manage existing subscription via Stripe Customer Portal
  const handleManageSubscription = () => {
    const portalUrl = "https://billing.stripe.com/p/login/9AQ9BKfwW0e1c80288";
    window.open(portalUrl, '_blank');
};

  function renderButton(plan: Tier) {
    if (userLoading) {
      return (
        <Button disabled className="w-full">
          Loading…
        </Button>
      );
    }

    const isAuthenticated = !!user;
    const isLoading = loadingPlan === plan;

    // Unauthenticated: all buttons trigger OAuth flow
    if (!isAuthenticated) {
      const label =
        plan === "free"
          ? "Sign Up"
          : `Get ${plan.charAt(0).toUpperCase() + plan.slice(1)}`;

      return (
        <Button
          variant={plan === "free" ? "outline" : undefined}
          className={`w-full ${plan === "free"
            ? "border-zinc-700 text-zinc-100 hover:bg-zinc-800"
            : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          onClick={handleSignIn}
        >
          {label}
          {plan !== "free" && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      );
    }

    // Authenticated users:
    switch (currentTier) {
      case "free":
        if (plan === "free") {
          // FREE user & FREE plan → disabled "Current Plan"
          return (
            <Button disabled className="w-full bg-zinc-600 cursor-not-allowed text-white">
              Current Plan
            </Button>
          );
        }
        // FREE user & STARTER/PRO → checkout
        return (
          <Button
            disabled={isLoading}
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
            onClick={() => handleCheckout(plan as Exclude<Tier, "free">)}
          >
            {isLoading ? "Loading…" : `Get ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        );

      case "starter":
        if (plan === "free") {
          // STARTER user → disable FREE
          return (
            <Button
              disabled
              variant="outline"
              className="w-full border-zinc-700 text-zinc-100 cursor-not-allowed"
            >
              Sign Up
            </Button>
          );
        }
        if (plan === "starter") {
          // STARTER user & STARTER plan → Manage Subscription
          return (
            <Button
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={handleManageSubscription}
            >
              Manage Subscription
            </Button>
          );
        }
        // STARTER user & PRO → upgrade to PRO
        return (
          <Button
            disabled={isLoading}
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
            onClick={() => handleCheckout("pro")}
          >
            {isLoading ? "Loading…" : "Get Pro"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        );

      case "pro":
        if (plan === "pro") {
          // PRO user & PRO plan → Manage Subscription
          return (
            <Button
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={handleManageSubscription}
            >
              Manage Subscription
            </Button>
          );
        }
        // PRO user → disable FREE & STARTER
        const label =
          plan === "free"
            ? "Sign Up"
            : `Get ${plan.charAt(0).toUpperCase() + plan.slice(1)}`;
        return (
          <Button
            disabled
            className="w-full bg-zinc-600 text-white cursor-not-allowed"
          >
            {label}
          </Button>
        );
    }
  }

  return (
    <div className="bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Tabs
          value={billing}
          onValueChange={(val: string) =>
            setBilling(val as "monthly" | "annual")
          }
        >
          <TabsList className="mb-8 flex justify-center w-fit mx-auto">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual" className="relative">
              Annual
              <span className="ml-2 bg-emerald-400/20 text-emerald-300 text-sm font-semibold px-2 py-0.5 rounded-sm">
                6 Months Free
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE Plan */}
          <Card className="bg-zinc-900 text-zinc-100 border-zinc-800 overflow-hidden">
            <div className="bg-zinc-800 p-6">
              <CardTitle className="text-lg tracking-wide font-medium">
                FREE
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-2">
                Perfect to get started and experience the basics for free.
              </CardDescription>
              <h3 className="text-4xl font-medium mt-4 flex items-baseline">
                <NumberFlow
                  value={0}
                  format={{
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  transformTiming={{
                    duration: 500,
                    easing: "ease-out",
                  }}
                  willChange
                  className="tabular-nums"
                />
                <span className="text-sm font-normal ml-1">/month</span>
              </h3>
              <p className="text-sm text-left text-zinc-600 mt-1 opacity-0">
                {billingText}
              </p>
            </div>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3 pt-1">
                <div className="text-lg pb-4">
                  <span className="text-md font-semibold">10</span> free minutes
                </div>
                <div className="flex text-sm items-center gap-3 opacity-70">
                  <AudioWaveform className="h-4 w-5 text-zinc-400" />
                  <span>Sessions up to 5 minutes</span>
                </div>
                <div className="flex text-sm items-center gap-3 opacity-70">
                  <Mic className="h-4 w-5 text-zinc-400" />
                  <span>Limited voices</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Disc3 className="h-4 w-4 text-zinc-400" />
                  <span>Limited background tracks</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Languages className="h-4 w-4 text-zinc-400" />
                  <span>10 Languages</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pb-6">
              {renderButton("free")}
            </CardFooter>
          </Card>

          {/* STARTER Plan */}
          <Card className="bg-white text-zinc-900 border-zinc-200 shadow-lg overflow-hidden">
            <div className="bg-zinc-100 p-6">
              <CardTitle className="text-lg tracking-wide font-medium">
                STARTER
              </CardTitle>
              <CardDescription className="text-zinc-600 mt-2">
                Unlock deeper experiences with added time and flexibility.
              </CardDescription>
              <h3 className="text-4xl font-medium mt-4">
                <NumberFlow
                  value={
                    billing === "monthly"
                      ? pricing.starter.monthly
                      : pricing.starter.annual
                  }
                  format={{
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  transformTiming={{
                    duration: 500,
                    easing: "ease-out",
                  }}
                  willChange
                  className="tabular-nums"
                />
                <span className="text-sm font-normal ml-1">/month</span>
              </h3>
              <p className="text-sm text-left text-zinc-600 mt-1">
                {billingText}
              </p>
            </div>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3 pt-1">
                <div className="text-lg pb-4">
                  <span className="text-md font-semibold">100</span> minutes per month
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <AudioWaveform className="h-4 w-4 text-zinc-600" />
                  <span>Sessions up to 10 minutes</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Mic className="h-4 w-4 text-zinc-600" />
                  <span>More voices</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Disc3 className="h-4 w-4 text-zinc-600" />
                  <span>More background tracks</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Languages className="h-4 w-4 text-zinc-600" />
                  <span>10 Languages</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pb-6">
              {renderButton("starter")}
            </CardFooter>
          </Card>

          {/* PRO Plan */}
          <Card className="bg-white text-zinc-900 border-zinc-200 shadow-lg overflow-hidden">
            <div className="bg-zinc-100 p-6">
              <CardTitle className="text-lg tracking-wide font-medium">
                PRO
              </CardTitle>
              <CardDescription className="text-zinc-600 mt-2">
                Maximize your practice with premium time and quality.
              </CardDescription>
              <h3 className="text-4xl font-medium	mt-4">
                <NumberFlow
                  value={
                    billing === "monthly"
                      ? pricing.pro.monthly
                      : pricing.pro.annual
                  }
                  format={{
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  transformTiming={{
                    duration: 500,
                    easing: "ease-out",
                  }}
                  willChange
                  className="tabular-nums"
                />
                <span className="text-sm font-normal ml-1">/month</span>
              </h3>
              <p className="text-sm text-left text-zinc-600 mt-1">
                {billingText}
              </p>
            </div>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3 pt-1">
                <div className="text-lg pb-4">
                  <span className="text-md font-semibold">300</span> minutes per month
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <AudioWaveform className="h-4 w-4 text-zinc-600" />
                  <span>Sessions up to 20 minutes</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Mic className="h-4 w-4 text-zinc-600" />
                  <span>Premium voices</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Disc3 className="h-4 w-4 text-zinc-600" />
                  <span>Premium background tracks</span>
                </div>
                <div className="flex text-sm	items-center gap-3 opacity-70">
                  <Languages className="h-4 w-4 text-zinc-600" />
                  <span>10 Languages</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pb-6">
              {renderButton("pro")}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
