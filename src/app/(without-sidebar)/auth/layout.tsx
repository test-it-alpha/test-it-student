import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
