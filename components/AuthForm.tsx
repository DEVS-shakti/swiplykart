"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, getFirebaseAnalytics, googleProvider } from "@/lib/firebase";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      await getFirebaseAnalytics();
      startTransition(() => router.push("/dashboard"));
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Authentication failed.";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setError(null);

    try {
      await signInWithPopup(auth, googleProvider);
      await getFirebaseAnalytics();
      startTransition(() => router.push("/dashboard"));
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Google sign in failed.";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/8 bg-surface-container/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-10">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed">
          <UserRound className="size-5" />
        </div>
        <h1 className="font-headline text-4xl font-extrabold text-white">
          {mode === "login" ? "Welcome back" : "Create your vibe"}
        </h1>
        <p className="mt-3 text-white/55">
          {mode === "login"
            ? "Enter your credentials to access your curated space."
            : "Start swiping, saving, and building your visual wishlist."}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Button type="button" variant="secondary" size="lg" className="w-full" onClick={handleGoogle} disabled={busy}>
          <Sparkles className="size-4" />
          Continue with Google
        </Button>
      </div>

      <div className="my-7 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/30">
        <div className="h-px flex-1 bg-white/10" />
        Or continue with email
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <label className="grid gap-2 text-sm text-white/70">
            Name
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
              <Input value={name} onChange={(event) => setName(event.target.value)} className="pl-11" placeholder="Alex Chen" />
            </div>
          </label>
        ) : null}

        <label className="grid gap-2 text-sm text-white/70">
          Email
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="pl-11"
              placeholder="curator@swiplykart.com"
              required
            />
          </div>
        </label>

        <label className="grid gap-2 text-sm text-white/70">
          Password
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="pl-11"
              placeholder="••••••••"
              required
            />
          </div>
        </label>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        <Button type="submit" size="lg" className="mt-4 w-full" disabled={busy}>
          {busy ? "Working..." : mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/45">
        {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
        <Link
          href={mode === "login" ? "/auth/signup" : "/auth/login"}
          className="font-semibold text-primary transition-colors hover:text-white"
        >
          {mode === "login" ? "Create one" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
