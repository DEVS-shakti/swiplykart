"use client";

import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { updateUserProfile } from "@/services/userService";

function authErrorMessage(code: string): string {
  switch (code) {
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Current password is incorrect.";
    case "auth/requires-recent-login":
      return "For security, sign out and sign in again, then try once more.";
    case "auth/email-already-in-use":
      return "That email is already used by another account.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "Something went wrong. Try again.";
  }
}

export function DashboardProfileSection() {
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentForEmail, setCurrentForEmail] = useState("");
  const [currentForPassword, setCurrentForPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const hasPasswordProvider = user?.providerData.some((p) => p.providerId === "password") ?? false;

  useEffect(() => {
    if (!user) return;
    setName(user.displayName || "");
    setEmail(user.email || "");
  }, [user]);

  function flash(kind: "success" | "error", text: string) {
    setNotice({ kind, text });
    window.setTimeout(() => setNotice(null), 5000);
  }

  async function onSaveProfile(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    const trimmed = name.trim();
    setSavingProfile(true);
    try {
      await updateProfile(user, { displayName: trimmed || undefined });
      await updateUserProfile(user.uid, { displayName: trimmed || undefined });
      flash("success", "Display name updated.");
    } catch (err) {
      const code = err && typeof err === "object" && "code" in err ? String((err as { code: string }).code) : "";
      flash("error", code ? authErrorMessage(code) : "Could not update profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function onChangeEmail(e: FormEvent) {
    e.preventDefault();
    if (!user?.email) return;
    const next = email.trim().toLowerCase();
    if (next === user.email.toLowerCase()) {
      flash("error", "Enter a new email address.");
      return;
    }
    if (!currentForEmail) {
      flash("error", "Enter your current password to confirm.");
      return;
    }
    setSavingEmail(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentForEmail);
      await reauthenticateWithCredential(user, cred);
      await updateEmail(user, next);
      setCurrentForEmail("");
      flash("success", "Email updated. You may need to verify the new address in your inbox.");
    } catch (err) {
      const code = err && typeof err === "object" && "code" in err ? String((err as { code: string }).code) : "";
      flash("error", code ? authErrorMessage(code) : "Could not update email.");
    } finally {
      setSavingEmail(false);
    }
  }

  async function onChangePassword(e: FormEvent) {
    e.preventDefault();
    if (!user?.email) return;
    if (newPassword.length < 6) {
      flash("error", "New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      flash("error", "New passwords do not match.");
      return;
    }
    if (!currentForPassword) {
      flash("error", "Enter your current password.");
      return;
    }
    setSavingPassword(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentForPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
      setCurrentForPassword("");
      setNewPassword("");
      setConfirmPassword("");
      flash("success", "Password updated.");
    } catch (err) {
      const code = err && typeof err === "object" && "code" in err ? String((err as { code: string }).code) : "";
      flash("error", code ? authErrorMessage(code) : "Could not update password.");
    } finally {
      setSavingPassword(false);
    }
  }

  if (loading) {
    return (
      <section className="rounded-[28px] border border-white/8 bg-surface-container/40 p-6 backdrop-blur-xl">
        <div className="h-32 animate-pulse rounded-2xl bg-white/5" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="rounded-[28px] border border-white/8 bg-surface-container/40 p-6 backdrop-blur-xl">
        <h2 className="font-headline text-lg font-bold text-white">Profile &amp; credentials</h2>
        <p className="mt-2 text-sm text-white/55">
          <Link href="/auth/login" className="font-semibold text-primary underline-offset-2 hover:underline">
            Sign in
          </Link>{" "}
          to update your name, email, or password.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-white/8 bg-surface-container/40 p-6 backdrop-blur-xl md:p-8">
      <h2 className="font-headline text-lg font-bold text-white">Profile &amp; credentials</h2>
      <p className="mt-1 text-sm text-white/45">Signed in as {user.email}</p>

      {notice ? (
        <p
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
            notice.kind === "success"
              ? "border-tertiary/30 bg-tertiary/10 text-tertiary"
              : "border-rose-400/30 bg-rose-500/10 text-rose-200"
          }`}
        >
          {notice.text}
        </p>
      ) : null}

      {!hasPasswordProvider ? (
        <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/55">
          You signed in with Google. To change the email or password for this account, use your Google account settings.
          You can still update your display name below for how you appear in SwiplyKart.
        </p>
      ) : null}

      <form className="mt-6 space-y-4" onSubmit={(e) => void onSaveProfile(e)}>
        <h3 className="text-sm font-semibold text-white/80">Display name</h3>
        <label className="grid gap-2 text-xs text-white/50">
          <span className="flex items-center gap-2">
            <UserRound className="size-3.5 text-white/35" />
            Name
          </span>
          <Input value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Your name" autoComplete="name" />
        </label>
        <Button type="submit" disabled={savingProfile}>
          {savingProfile ? "Saving…" : "Save display name"}
        </Button>
      </form>

      {hasPasswordProvider ? (
        <>
          <form className="mt-10 space-y-4 border-t border-white/8 pt-8" onSubmit={(e) => void onChangeEmail(e)}>
            <h3 className="text-sm font-semibold text-white/80">Email address</h3>
            <label className="grid gap-2 text-xs text-white/50">
              <span className="flex items-center gap-2">
                <Mail className="size-3.5 text-white/35" />
                New email
              </span>
              <Input
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className="grid gap-2 text-xs text-white/50">
              <span className="flex items-center gap-2">
                <LockKeyhole className="size-3.5 text-white/35" />
                Current password (required to change email)
              </span>
              <Input
                type="password"
                value={currentForEmail}
                onChange={(ev) => setCurrentForEmail(ev.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>
            <Button type="submit" variant="secondary" disabled={savingEmail}>
              {savingEmail ? "Updating…" : "Update email"}
            </Button>
          </form>

          <form className="mt-10 space-y-4 border-t border-white/8 pt-8" onSubmit={(e) => void onChangePassword(e)}>
            <h3 className="text-sm font-semibold text-white/80">Password</h3>
            <label className="grid gap-2 text-xs text-white/50">
              <span className="flex items-center gap-2">
                <LockKeyhole className="size-3.5 text-white/35" />
                Current password
              </span>
              <Input
                type="password"
                value={currentForPassword}
                onChange={(ev) => setCurrentForPassword(ev.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>
            <label className="grid gap-2 text-xs text-white/50">
              New password
              <Input
                type="password"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
                autoComplete="new-password"
                placeholder="At least 6 characters"
                minLength={6}
              />
            </label>
            <label className="grid gap-2 text-xs text-white/50">
              Confirm new password
              <Input
                type="password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                autoComplete="new-password"
                placeholder="Repeat new password"
                minLength={6}
              />
            </label>
            <Button type="submit" variant="secondary" disabled={savingPassword}>
              {savingPassword ? "Updating…" : "Update password"}
            </Button>
          </form>
        </>
      ) : null}
    </section>
  );
}
