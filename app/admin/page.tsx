import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-28 pt-10 md:px-8">
        <h1 className="font-headline text-4xl font-extrabold text-white">Admin</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/55">
          Manage catalog entries and affiliate links. Writes require your user document to include{" "}
          <code className="text-primary">role: &quot;admin&quot;</code> and matching Firestore rules.
        </p>
        <div className="mt-10">
          <AdminDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
