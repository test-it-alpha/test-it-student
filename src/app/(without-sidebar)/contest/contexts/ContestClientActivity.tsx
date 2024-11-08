"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useFullScreenChange } from "../hooks/useFullScreenChange";

type ContestClientActivityContextType = {
  fullScreen: {
    initial: boolean;
    setInitial: React.Dispatch<React.SetStateAction<boolean>>;
    current: boolean;
    setCurrent: React.Dispatch<React.SetStateAction<boolean>>;
  };
  shouldTrackPageExit: boolean;
  setShouldTrackPageExit: React.Dispatch<React.SetStateAction<boolean>>;
  pageExitAttempted: boolean;
  resetPageExitAttempt: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContestClientActivityContext =
  createContext<ContestClientActivityContextType | null>(null);

export const ContestClientActivityContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [initialFullScreen, setInitialFullScreen] = useState(false);
  const [currentFullScreen, setCurrentFullScreen] = useState(false);
  const isFullScreen = useFullScreenChange();

  const [shouldTrackPageExit, setShouldTrackPageExit] = useState(false);
  const [pageExitAttempted, setPageExitAttempted] = useState(false);

  const resetPageExitAttempt = () => {
    setPageExitAttempted(false);
  };

  useEffect(() => {
    if (isFullScreen === undefined) return;
    setCurrentFullScreen(isFullScreen);
  }, [isFullScreen]);

  useEffect(() => {
    if (!shouldTrackPageExit) return;

    const handlePageExitAttempt = () => {
      setPageExitAttempted(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handlePageExitAttempt();
      }
    };

    if (!currentFullScreen) {
      handlePageExitAttempt();
    }

    document.addEventListener("mouseleave", handlePageExitAttempt);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handlePageExitAttempt);

    return () => {
      document.removeEventListener("mouseleave", handlePageExitAttempt);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handlePageExitAttempt);
    };
  }, [shouldTrackPageExit, currentFullScreen]);

  return (
    <ContestClientActivityContext.Provider
      value={{
        fullScreen: {
          initial: initialFullScreen,
          setInitial: setInitialFullScreen,
          current: currentFullScreen,
          setCurrent: setCurrentFullScreen,
        },
        shouldTrackPageExit,
        setShouldTrackPageExit,
        pageExitAttempted,
        resetPageExitAttempt,
      }}
    >
      {children}
    </ContestClientActivityContext.Provider>
  );
};

const useContestClientActivity = () => {
  const context = useContext(ContestClientActivityContext);
  if (context === null) {
    throw new Error(
      "useContestClientActivity must be used within a ContestClientActivityProvider"
    );
  }
  return context;
};

export default useContestClientActivity;
