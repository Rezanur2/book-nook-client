"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    const wasPending = sessionStorage.getItem("booknook_google_auth");

    if (errorParam === "cancelled" || errorParam === "access_denied" || wasPending) {
      sessionStorage.removeItem("booknook_google_auth");
      if (errorParam) {
        window.history.replaceState({}, "", window.location.pathname);
      }
      toast.add({
        title: "Sign In Cancelled",
        description: "Google sign-in was cancelled or interrupted.",
        type: "warning",
      });
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const callbackUrl = params?.get("callbackUrl") || "/";

      sessionStorage.setItem("booknook_google_auth", "true");
      toast.add({
        title: "Connecting to Google...",
        description: "Redirecting to Google sign-in.",
        type: "loading",
      });
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
        errorCallbackURL: "/login?error=cancelled",
      });
    } catch {
      sessionStorage.removeItem("booknook_google_auth");
      toast.add({
        title: "Sign In Failed",
        description: "Unable to connect to Google. Please try again.",
        type: "error",
      });
    }
  };

  const handleEmailLogIn = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.add({
        title: "Login Failed!",
        description: error.message,
        type: "error",
      });
      return;
    }

    if (data) {
      toast.add({
        title: "Welcome Back!",
        description: "You have successfully logged in.",
        type: "success",
      });

      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const callbackUrl = params?.get("callbackUrl") || "/";
      router.push(callbackUrl);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleEmailLogIn}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1.5 text-center mb-1">
          <h1 className="text-3xl sm:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
            Login to your account
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
            Enter your email below to access your BookNook sanctuary
          </p>
        </div>

        <Field>
          <FieldLabel
            htmlFor="email"
            className="text-xs font-bold text-gray-700 uppercase tracking-wider"
          >
            Email Address
          </FieldLabel>
          <div className="relative mt-0.5">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="reader@booknook.com"
              required
              className="pl-10 h-11 rounded-xl border-[#E6E0D6] bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D] shadow-xs"
            />
          </div>
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel
              htmlFor="password"
              className="text-xs font-bold text-gray-700 uppercase tracking-wider"
            >
              Password
            </FieldLabel>
            <a
              href="#"
              className="text-xs font-semibold text-[#B76E59] hover:text-[#762F3D] hover:underline transition-colors"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative mt-0.5">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="pl-10 h-11 rounded-xl border-[#E6E0D6] bg-white text-sm focus-visible:ring-2 focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D] shadow-xs"
            />
          </div>
        </Field>

        <Field className="pt-1">
          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#762F3D] hover:bg-[#5e2530] text-white font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to BookNook</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Field>

        <div className="relative flex items-center justify-center my-1.5">
          <div className="grow border-t border-[#E6E0D6]" />
          <span className="shrink-0 px-3 text-[11px] font-bold tracking-wider uppercase text-gray-400">
            Or continue with
          </span>
          <div className="grow border-t border-[#E6E0D6]" />
        </div>

        <Field>
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            type="button"
            className="w-full h-11 rounded-xl border border-[#E6E0D6] bg-white hover:bg-[#F5F2EA] text-gray-700 font-semibold text-sm gap-2.5 transition-all cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          <FieldDescription className="text-center text-xs text-gray-600 pt-3">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#762F3D] hover:underline"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
