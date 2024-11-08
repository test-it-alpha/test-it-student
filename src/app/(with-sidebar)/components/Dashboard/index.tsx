import React from "react";
import Progress from "./Progress";
import Upcoming from "./Upcoming";

const Dashboard = () => {
  const events = 1;
  return (
    <div className="w-full flex flex-col items-start justify-start gap-6">
      <section className="w-full">
        <h1 className="font-extrabold text-3xl">Hello, User.</h1>
        <p className="text-gray-500">
          {events === undefined ? (
            "You have no upcoming events"
          ) : (
            <>
              You have{" "}
              <span className="text-foreground">
                {events} event{events > 1 ? "s" : ""}{" "}
              </span>
              coming up.
            </>
          )}
        </p>
      </section>
      <Progress />
      <Upcoming />
    </div>
  );
};

export default Dashboard;
