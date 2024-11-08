"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import CountdownTimer from "./CountdownTimer";

const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full border-b border-b-border flex items-center justify-between px-2">
      <div className="p-1 flex items-center gap-1">
        <Button
          size={"sm"}
          variant={"ghost"}
          className="pl-1 pr-3 gap-1 text-red-500 mr-2 hover:text-red-600 hover:bg-red-100 dark:bg-red-500/20"
          onClick={() => {
            const exitFullscreen = async (): Promise<void> => {
              if (document.fullscreenElement && document.exitFullscreen) {
                return document.exitFullscreen();
              }
              const emptyPromise: Promise<void> = new Promise((res) => res());

              const doc = document as any;
              const vendorPrefixes = ["moz", "webkit", "ms"];

              const vendor = vendorPrefixes.find((prefix) => {
                return doc[prefix + "ExitFullscreen"] !== undefined;
              });
              if (!vendor) return emptyPromise;
              const exitFunction = doc[vendor + "ExitFullscreen"];
              if (
                document.fullscreenElement ||
                doc[vendor + "FullscreenElement"]
              ) {
                return exitFunction() as Promise<void>;
              }

              return emptyPromise;
            };

            exitFullscreen().then(() => {
              router.back();
            });
          }}
        >
          <ChevronLeft size={20} /> <span>Exit</span>
        </Button>
        <span className="font-bold text-base">Contest</span>
      </div>
      <CountdownTimer totalTime={3600} />
    </header>
  );
};

export default Header;
