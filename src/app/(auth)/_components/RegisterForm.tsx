"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, User, Image as ImageIcon, CheckCircle2, Circle } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    sessionStorage.removeItem("booknook_google_auth");
  }, []);

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleGoogleSignIn = async () => {
    sessionStorage.setItem("booknook_google_auth", "true");
    toast.add({
      title: "Connecting to Google...",
      description: "Redirecting to Google sign-in.",
      type: "loading",
      timeout: 4000,
    });

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  const handleEmailSignUp = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    sessionStorage.removeItem("booknook_google_auth");
    setPasswordError("");

    //  Password Validation
    if (!hasMinLength) {
      const msg = "Password must be at least 6 characters long.";
      setPasswordError(msg);
      return;
    }

    if (!hasUppercase) {
      const msg = "Password must contain at least one uppercase letter (A-Z).";
      setPasswordError(msg);
      return;
    }

    if (!hasLowercase) {
      const msg = "Password must contain at least one lowercase letter (a-z).";
      setPasswordError(msg);
      return;
    }

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      photoURL: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.photoURL,
    });

    if (error) {
      toast.add({
        title: "Registration Failed!",
        description: error.message,
        type: "error",
      });
      return;
    }

    if (data) {
      toast.add({
        title: "Account Created Successfully!",
        description: "Welcome to BookNook. Please login to continue.",
        type: "success",
      });

      router.push("/login");
    }
  };

  return (
    <form className={cn("flex flex-col gap-4 sm:gap-5", className)} {...props} onSubmit={handleEmailSignUp}>
      <FieldGroup>
        {/* Title Header */}
        <div className="flex flex-col items-center gap-2 text-center mb-1">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-playfair text-[#762F3D] tracking-tight leading-snug">
            Register an Account
          </h1>
          <p className="text-xs sm:text-sm text-[#6E645A] leading-relaxed max-w-sm">
            Register as a reader to discover, share, and borrow timeless volumes.
          </p>
        </div>

        {/* Social Sign Up Button */}
        <Field>
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            type="button"
            className="w-full h-11 rounded-xl border border-[#E2DDD3] bg-white hover:bg-[#F7F5F0] text-[#4A423B] font-semibold text-sm gap-2.5 transition-all cursor-pointer shadow-2xs hover:border-[#C8BFB2]"
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
            <span>Sign up with Google</span>
          </Button>
        </Field>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-0.5">
          <div className="grow border-t border-[#E6E0D6]" />
          <span className="shrink-0 px-3 text-[10px] font-bold tracking-[0.15em] uppercase text-[#9E9486]">
            Or register with email
          </span>
          <div className="grow border-t border-[#E6E0D6]" />
        </div>

        {/* Name & Email Fields Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Full Name */}
          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-[11px] font-bold text-[#4A423B] uppercase tracking-[0.12em]"
            >
              Full Name
            </FieldLabel>
            <div className="relative mt-0.5">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9486] pointer-events-none" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Eleanor Vance"
                required
                className="pl-10 h-10 rounded-xl border-[#E2DDD3] bg-white text-[#292521] placeholder:text-[#A89F91] text-sm focus-visible:ring-2 focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D] shadow-2xs hover:border-[#C8BFB2] transition-colors"
              />
            </div>
          </Field>

          {/* Email Address */}
          <Field>
            <FieldLabel
              htmlFor="email"
              className="text-[11px] font-bold text-[#4A423B] uppercase tracking-[0.12em]"
            >
              Email Address
            </FieldLabel>
            <div className="relative mt-0.5">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9486] pointer-events-none" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="reader@booknook.com"
                required
                className="pl-10 h-10 rounded-xl border-[#E2DDD3] bg-white text-[#292521] placeholder:text-[#A89F91] text-sm focus-visible:ring-2 focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D] shadow-2xs hover:border-[#C8BFB2] transition-colors"
              />
            </div>
          </Field>
        </div>

        {/* Photo URL Field */}
        <Field>
          <FieldLabel
            htmlFor="photoURL"
            className="text-[11px] font-bold text-[#4A423B] uppercase tracking-[0.12em]"
          >
            Photo URL
          </FieldLabel>
          <div className="relative mt-0.5">
            <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9486] pointer-events-none" />
            <Input
              id="photoURL"
              name="photoURL"
              type="url"
              placeholder="https://i.ibb.co/..."
              required
              className="pl-10 h-10 rounded-xl border-[#E2DDD3] bg-white text-[#292521] placeholder:text-[#A89F91] text-sm focus-visible:ring-2 focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D] shadow-2xs hover:border-[#C8BFB2] transition-colors"
            />
          </div>
        </Field>

        {/* Password Field */}
        <Field>
          <FieldLabel
            htmlFor="password"
            className="text-[11px] font-bold text-[#4A423B] uppercase tracking-[0.12em]"
          >
            Password
          </FieldLabel>
          <div className="relative mt-0.5">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9486] pointer-events-none" />
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              placeholder="••••••••"
              required
              className="pl-10 h-10 rounded-xl border-[#E2DDD3] bg-white text-[#292521] placeholder:text-[#A89F91] text-sm focus-visible:ring-2 focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D] shadow-2xs hover:border-[#C8BFB2] transition-colors"
            />
          </div>
        </Field>

        {/* Password Validation */}
        <div className="p-3 rounded-xl bg-[#F5F2EB]/70 border border-[#E6E0D6] space-y-1.5 text-xs">
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#8C5E50] block">
            Password Requirements
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap transition-colors text-[11px]",
                hasMinLength ? "text-emerald-700 font-semibold" : "text-[#8C8377]"
              )}
            >
              {hasMinLength ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#C4BCB0] shrink-0" />
              )}
              <span>Min 6 characters</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap transition-colors text-[11px]",
                hasUppercase ? "text-emerald-700 font-semibold" : "text-[#8C8377]"
              )}
            >
              {hasUppercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#C4BCB0] shrink-0" />
              )}
              <span>One uppercase</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap transition-colors text-[11px]",
                hasLowercase ? "text-emerald-700 font-semibold" : "text-[#8C8377]"
              )}
            >
              {hasLowercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#C4BCB0] shrink-0" />
              )}
              <span>One lowercase</span>
            </div>
          </div>
        </div>

        {/* Inline Password Validation Error */}
        {passwordError && (
          <p className="text-xs text-red-600 font-semibold flex items-center gap-1.5 px-1 animate-fade-in">
            <span>⚠️</span>
            <span>{passwordError}</span>
          </p>
        )}

        {/* Submit Button */}
        <Field className="pt-1">
          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#762F3D] hover:bg-[#5E222D] text-white font-bold text-sm tracking-wide shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Register</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Sign In Link */}
          <FieldDescription className="text-center text-xs text-[#6E645A] pt-2.5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#762F3D] hover:text-[#5E222D] hover:underline transition-colors"
            >
              Login to account
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
