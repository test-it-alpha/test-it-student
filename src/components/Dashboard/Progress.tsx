import { TrendingUp } from "lucide-react";
import React from "react";

const Progress = () => {
  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="flex items-center text-xl font-bold text-muted-foreground">
        <TrendingUp className="mr-2" />
        <span>Progress</span>
      </h2>
      <div className="w-full border border-border rounded-lg h-40">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-muted-foreground">
            Not enough data to show progress.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Progress;
