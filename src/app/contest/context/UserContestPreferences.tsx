"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { MosaicNode } from "react-mosaic-component";

type TileId =
  | "questionSection"
  | "emptyCodeSection"
  | "codeInput"
  | "codeUtils";

interface UserContestPreferencesState {
  version: number;
  mosaicLayout: MosaicNode<TileId>;
}

interface UserContestPreferencesContextType {
  mosaicLayout: MosaicNode<TileId>;
  updateMosaicLayout: (layout: MosaicNode<TileId>) => void;
}

const DEFAULT_LAYOUT: MosaicNode<TileId> = {
  direction: "row",
  first: "questionSection",
  second: "emptyCodeSection",
  splitPercentage: 50,
};

const DEFAULT_STATE: UserContestPreferencesState = {
  version: 1,
  mosaicLayout: DEFAULT_LAYOUT,
};

const STORAGE_KEY = "user_contest_preferences_state_v1";

const UserContestPreferencesContext =
  createContext<UserContestPreferencesContextType | null>(null);

export const UserContestPreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] =
    useState<UserContestPreferencesState>(DEFAULT_STATE);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Only use saved state if versions match
        if (parsedState.version === DEFAULT_STATE.version) {
          setState(parsedState);
        }
      } catch (error) {
        console.error("Error loading userContestPreferences state:", error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateMosaicLayout = (layout: MosaicNode<TileId>) => {
    setState((prev) => ({
      ...prev,
      mosaicLayout: layout,
    }));
  };

  return (
    <UserContestPreferencesContext.Provider
      value={{
        mosaicLayout: state.mosaicLayout,
        updateMosaicLayout,
      }}
    >
      {children}
    </UserContestPreferencesContext.Provider>
  );
};

export const useUserContestPreferencesContext = () => {
  const context = useContext(UserContestPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserContestPreferencesContext must be used within a UserContestPreferencesProvider"
    );
  }
  return context;
};

export default useUserContestPreferencesContext;
