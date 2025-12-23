"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/create-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setErrorMessage(error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md mx-auto pt-8">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-left block">
          Get Early Access
        </Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="secondary"
            className="w-full sm:w-auto"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending" : "Subscribe"}
          </Button>
        </div>
      </div>

      {/* Status messages */}
      {status === "success" && (
        <p className="text-emerald-300/80 text-xs mt-2">You are in.</p>
      )}
      {status === "error" && (
        <p className="text-rose-400 text-sm mt-2">
          {errorMessage || "Sorry something went wrong. Please try again in a bit."}
        </p>
      )}
    </form>
  );
}
