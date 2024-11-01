import AppHeader from "@/components/AppHeader";
import React from "react";

const CodeTestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <AppHeader showSidebarTrigger={false} />
      {children}
    </div>
  );
};

export default CodeTestLayout;
