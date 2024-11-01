"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

type UserV1 = {
  displayName: string;
  username: string;
  loggedInAt: Date;
  lastAccessedAt: Date;
  version: 1;
};

type User = UserV1;

type UserContextType = {
  user: User | undefined;
  logIn: (username: string) => void;
  logOut: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  type CookieType = {
    testItStudentUser: User | undefined;
  };

  const [cookies, setCookie, removeCookie] = useCookies<
    keyof CookieType,
    CookieType
  >(["testItStudentUser"]);

  const setTestItStudentUser = (user: User | undefined) => {
    if (user === undefined) {
      removeCookie("testItStudentUser", { path: "/" });
    } else {
      setCookie("testItStudentUser", user, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
      });
    }
  };

  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  // Handle authentication routing
  useEffect(() => {
    if (!user && !cookies.testItStudentUser) {
      // User is not logged in
      if (pathname !== "/auth") {
        router.push("/auth");
      }
    } else if (pathname === "/auth") {
      // User is logged in but on auth page
      router.push("/");
    }
  }, [user, cookies.testItStudentUser, pathname, router]);

  // Update user state and lastAccessedAt when cookie exists but state is undefined
  useEffect(() => {
    if (!user && cookies.testItStudentUser) {
      const updatedUser = {
        ...cookies.testItStudentUser,
        lastAccessedAt: new Date(),
      };
      setUser(updatedUser);
      setTestItStudentUser(updatedUser);
    }
  }, [user, cookies.testItStudentUser]);

  const logIn = (username: string) => {
    const newUser = {
      displayName: username,
      username: username,
      loggedInAt: new Date(),
      lastAccessedAt: new Date(),
      version: 1 as const,
    };
    setUser(newUser);
    setTestItStudentUser(newUser);
    router.push("/dashboard");
  };

  const logOut = () => {
    setUser(undefined);
    setTestItStudentUser(undefined);
    router.push("/auth");
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContextProvider."
    );
  }
  return context;
};

export default useUserContext;
