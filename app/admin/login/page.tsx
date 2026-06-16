"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">CBRS Nepal Admin Panel</p>
        </div>

        <form action={action} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="admin_id">Admin ID</Label>
            <Input
              id="admin_id"
              name="admin_id"
              autoComplete="username"
              placeholder="Enter your admin ID"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600" role="alert">
              {state.error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
