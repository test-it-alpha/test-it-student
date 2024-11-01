"use client";
import { Button } from "@/components/ui/button";
import IconInput from "@/components/ui/icon-input";
import useUserContext from "@/contexts/User";
import { wait } from "@/lib/utils";
import { Loader2, LockKeyhole, LucideProps, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

export const defaultInputIconProps: LucideProps = {
  size: 16 as const,
  className: "text-muted-foreground ml-3" as const,
};

const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { logIn } = useUserContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;
    setError("");

    // Pre-validation
    if (email === "" || password === "") {
      setError("Please fill all the fields");
      return;
    }

    // Validation
    setIsLoading(true);
    await wait(1000);
    if (email === "admin@admin.com" && password === "admin") {
      setIsLoading(false);
      logIn("admin");
      return;
    }
    setIsLoading(false);
    setError("Incorrect Email or Password");
  };
  return (
    <form
      className="m-auto p-8 border border-border shadow-lg rounded-2xl max-w-sm"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center">
        <Image
          src={"/testit-dark.svg"}
          alt={"Test It"}
          width={200}
          height={200}
          className="h-20 w-20"
        />
        <h1 className="font-extrabold text-2xl mt-4">Student Login</h1>
        <p className="text-muted-foreground mt-1 text-center text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="w-full mt-8 flex flex-col gap-2">
        <IconInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          icon={<Mail {...defaultInputIconProps} />}
          required
        />
        <IconInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          icon={
            <LockKeyhole
              size={defaultInputIconProps.size}
              className={defaultInputIconProps.className}
              //   {...defaultInputIconProps}
            />
          }
          required
        />
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <div className="text-sm text-red-500">{error}</div>
        <Button disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}Log In
        </Button>
      </div>
    </form>
  );
};

export default Auth;
