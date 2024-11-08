import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContestEntryButton from "./ContestEntryButton";

const ContestInfo = () => {
  return (
    <div className="md:my-auto">
      <Card className="w-full max-w-2xl rounded-2xl border-0 md:border shadow-none md:shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Coding Contest Rules & Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Welcome to our NextJS Coding Challenge! Please read the following
            information carefully before entering the contest.
          </p>
          <div className="space-y-2">
            <h3 className="font-semibold">Contest Details:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Duration: 2 hours</li>
              <li>Total Questions: 3</li>
              <li>Difficulty: Medium to Hard</li>
              <li>Topics: React, Next.js, API Routes, Server Components</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Rules:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>The contest will be conducted in full-screen mode</li>
              <li>
                Switching tabs or exiting full-screen may result in
                disqualification
              </li>

              <li>Submissions will be automatically saved every 5 minutes</li>
            </ul>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="font-semibold">Warning:</p>
            <p>
              Once you enter the contest, your browser will go into full-screen
              mode. Attempting to exit full-screen or switch tabs/windows may
              result in immediate disqualification from the contest.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <ContestEntryButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContestInfo;
