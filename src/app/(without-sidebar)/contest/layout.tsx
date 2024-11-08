import React from "react";
import Header from "./components/common/Header";
import { ContestContextProvider } from "./contexts/Contest";
import { UserContestPreferencesProvider } from "./contexts/UserContestPreferences";
import { ContestClientActivityContextProvider } from "./contexts/ContestClientActivity";

const CodeTestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContestClientActivityContextProvider>
      <UserContestPreferencesProvider>
        <ContestContextProvider>
          <div className="w-full min-h-screen flex flex-col">
            <Header />
            {children}
          </div>
        </ContestContextProvider>
      </UserContestPreferencesProvider>
    </ContestClientActivityContextProvider>
  );
};

export default CodeTestLayout;
