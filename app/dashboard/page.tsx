import { DashboardShell } from "@/components/DashboardShell";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-28 pt-10 md:px-8">
        <DashboardShell />
      </main>
      <Footer />
    </div>
  );
}
