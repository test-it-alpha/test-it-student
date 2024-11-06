import React from "react";
import Header from "./_components/Header";
import { ContestContextProvider } from "./context/Contest";
import { UserContestPreferencesProvider } from "./context/UserContestPreferences";

const CodeTestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <UserContestPreferencesProvider>
        <ContestContextProvider>
          <Header />
          {children}
        </ContestContextProvider>
      </UserContestPreferencesProvider>
    </div>
  );
};

export default CodeTestLayout;
