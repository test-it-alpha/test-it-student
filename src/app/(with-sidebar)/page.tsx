import AppHeader from "@/components/AppHeader";
import Dashboard from "@/app/(with-sidebar)/components/Dashboard";

export default function Home() {
  return (
    <>
      <main className="w-full flex flex-col items-center justify-start">
        <AppHeader />
        <div className="w-full max-w-6xl p-4">
          <Dashboard />
        </div>
      </main>
    </>
  );
}
