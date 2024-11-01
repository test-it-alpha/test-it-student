import AppHeader from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <AppSidebar />
      <main className="w-full flex flex-col items-center justify-start">
        <AppHeader />
        <div className="w-full max-w-6xl p-4">
          <Dashboard />
        </div>
      </main>
    </>
  );
}
