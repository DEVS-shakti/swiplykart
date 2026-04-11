"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, getFirebaseAnalytics, googleProvider } from "@/firebase/client";
import { createUserProfile } from "@/services/userService";

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
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const display = name.trim();
        if (display) {
          await updateProfile(cred.user, { displayName: display });
        }
        await createUserProfile(cred.user.uid, {
          displayName: display || undefined,
        });
      }

      await getFirebaseAnalytics();
      startTransition(() => router.push("/dashboard"));
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "Authentication failed.";
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
      const message = submissionError instanceof Error ? submissionError.message : "Google sign in failed.";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="theme-panel w-full max-w-md rounded-[32px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:p-10">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dim text-on-primary-fixed">
          <UserRound className="size-5" />
        </div>
        <h1 className="font-headline text-4xl font-extrabold text-foreground">
          {mode === "login" ? "Welcome back" : "Create your vibe"}
        </h1>
        <p className="mt-3 text-soft-foreground">
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

      <div className="my-7 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-faint-foreground">
        <div className="h-px flex-1 bg-outline/50" />
        Or continue with email
        <div className="h-px flex-1 bg-outline/50" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <label className="grid gap-2 text-sm text-soft-foreground">
            Name
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint-foreground" />
              <Input value={name} onChange={(event) => setName(event.target.value)} className="pl-11" placeholder="Alex Chen" />
            </div>
          </label>
        ) : null}

        <label className="grid gap-2 text-sm text-soft-foreground">
          Email
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint-foreground" />
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

        <label className="grid gap-2 text-sm text-soft-foreground">
          Password
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="pl-11"
              placeholder="********"
              required
            />
          </div>
        </label>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <Button type="submit" size="lg" className="mt-4 w-full" disabled={busy}>
          {busy ? "Working..." : mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-soft-foreground">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href={mode === "login" ? "/auth/signup" : "/auth/login"}
          className="font-semibold text-primary transition-colors hover:text-foreground"
        >
          {mode === "login" ? "Create one" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
