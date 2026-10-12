import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, Loader2, Shield } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [showSocials, setShowSocials] = useState(false);
  const [handles, setHandles] = useState({ instagram: "", tiktok: "", twitter: "", snapchat: "" });
  const [savingSocials, setSavingSocials] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
      }
      setShowSocials(true);
    } catch (err) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await base44.auth.resendOtp(email);
      toast({
        title: "Code sent",
        description: "Check your email for the new code.",
      });
    } catch (err) {
      setError(err.message || "Failed to resend code");
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", "/app");
  };

  const handleFinishSocials = async () => {
    setSavingSocials(true);
    try {
      const social_handles = Object.fromEntries(
        Object.entries(handles).map(([k, v]) => [k, v.replace("@", "").trim()]).filter(([, v]) => v)
      );
      if (Object.keys(social_handles).length > 0) {
        await base44.auth.updateMe({ social_handles });
      }
    } catch {
      // proceed even if save fails
    } finally {
      setSavingSocials(false);
      window.location.href = "/app";
    }
  };

  if (showOtp) {
    return (
      <AuthLayout
        icon={Mail}
        title="Verify your email"
        subtitle={`We sent a code to ${email}`}
      >
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={6}
            value={otpCode}
            onChange={setOtpCode}
            autoFocus
            autoComplete="one-time-code"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <button
          onClick={handleVerify}
          disabled={loading || otpCode.length < 6}
          className="w-full h-12 font-medium rounded-md text-white flex items-center justify-center transition-opacity disabled:opacity-70"
          style={{ backgroundColor: "#25cd59" }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Didn't receive the code?{" "}
          <button onClick={handleResend} className="font-medium hover:underline" style={{ color: "#25cd59" }}>
            Resend
          </button>
        </p>
      </AuthLayout>
    );
  }

  if (showSocials) {
    return (
      <AuthLayout
        icon={Shield}
        title="Connect your socials"
        subtitle="Tell Guardify which public profiles to scan"
        footer={
          <button onClick={handleFinishSocials} className="font-medium hover:underline" style={{ color: "#25cd59" }}>
            Skip for now
          </button>
        }
      >
        <p className="text-sm text-muted-foreground mb-5 text-center">
          Add your <b>public</b> handles so the Deep Audit knows where to look. We only scan public posts — never private messages.
        </p>
        <div className="space-y-3 mb-6">
          {[
            { key: "instagram", label: "Instagram" },
            { key: "tiktok", label: "TikTok" },
            { key: "twitter", label: "Twitter / X" },
            { key: "snapchat", label: "Snapchat" },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key}>{label}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  id={key}
                  value={handles[key]}
                  onChange={(e) => setHandles({ ...handles, [key]: e.target.value.replace("@", "") })}
                  className="pl-8 h-12"
                  placeholder="username"
                />
              </div>
            </div>
          ))}
        </div>
        <button className="w-full h-12 font-medium rounded-md text-white flex items-center justify-center transition-opacity disabled:opacity-70" style={{ backgroundColor: "#25cd59" }} onClick={handleFinishSocials} disabled={savingSocials}>
          {savingSocials ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Start scanning"
          )}
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create your account"
      subtitle="Sign up to get started"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium hover:underline" style={{ color: "#25cd59" }}>
            Log in
          </Link>
        </>
      }
    >
      <Button
        variant="outline"
        className="w-full h-12 text-sm font-medium mb-6 border-2 hover:bg-slate-50"
        onClick={handleGoogle}
      >
        <GoogleIcon className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground">or</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 font-medium rounded-md text-white flex items-center justify-center transition-opacity disabled:opacity-70"
          style={{ backgroundColor: "#25cd59" }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
