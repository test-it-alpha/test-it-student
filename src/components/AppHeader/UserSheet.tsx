"use client";

import React from "react";
import { Button } from "../ui/button";
import { UserRoundMinus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import useUserContext from "@/contexts/User";

const UserSheet = () => {
  const { logOut } = useUserContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-8 w-8 rounded-full border border-border bg-muted flex hover:contrast-75"></button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>User Options</SheetTitle>
          <SheetDescription>Manage your account settings.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center gap-1 mt-8">
          <div className="h-20 w-20 rounded-full border border-border bg-muted"></div>
          <h2 className="text-xl font-bold mt-2">User</h2>
          <p className="text-muted-foreground text-sm">No options to show.</p>
          <div className="mt-4 w-full">
            <Button
              variant="outline"
              className="w-full h-9 justify-start"
              onClick={() => {
                logOut();
              }}
            >
              <UserRoundMinus className="mr-1" />
              Log Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
