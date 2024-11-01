"use client";

import { cn } from "@/lib/utils";
import React from "react";

const IconInput = ({
  className,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        "flex items-center h-10 w-full overflow-hidden rounded-lg border border-input bg-background ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-text disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => {
        focusInput();
      }}
    >
      {icon}
      <input
        className="w-full h-full outline-none px-3 py-2 text-sm placeholder:text-muted-foreground"
        ref={inputRef}
        {...props}
      />
    </div>
  );
};

export default IconInput;
