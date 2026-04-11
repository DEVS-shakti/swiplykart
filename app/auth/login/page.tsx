import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="absolute inset-0">
        <div className="absolute left-[-8%] top-[-10%] h-80 w-80 rounded-full bg-secondary-container/20 blur-[140px]" />
        <div className="absolute bottom-[-8%] right-[-6%] h-96 w-96 rounded-full bg-primary/12 blur-[160px]" />
      </div>
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10">
        <div className="text-center">
          <div className="font-headline text-sm font-bold uppercase tracking-[0.32em] text-primary">
            SwiplyKart
          </div>
          <p className="mt-4 text-soft-foreground">Where Shopping Meets Your Vibe</p>
        </div>
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
