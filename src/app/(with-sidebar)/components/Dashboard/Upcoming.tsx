"use client";
import { ArrowRight, Code2, CodeSquare } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import SlickDialog from "../../../../components/ui/slick-dialog";
import Link from "next/link";

type EventObject = {
  title: string;
  description: string;
  id: string;
  date: Date;
  time: Date;
};

const Event = ({ event }: { event: EventObject }) => {
  const [isDetailedViewOpen, setIsDetailedViewOpen] = React.useState(false);

  return (
    <>
      <motion.div
        className="border border-border rounded-xl w-44 overflow-hidden hover:shadow-md"
        layoutId={event.id}
      >
        <div className="w-full h-24 border-b border-b-border relative">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            layoutId={event.id + "-icon"}
          >
            <Code2 size={32} className="text-muted-foreground" />
          </motion.div>
          <motion.div
            className="absolute top-1 right-1 rounded-full bg-accent px-2"
            layoutId={event.id + "-status"}
          >
            <span className="text-xs text-accent-foreground">Unattempted</span>
          </motion.div>
        </div>
        <div className="p-2">
          <motion.span className="font-bold" layoutId={event.id + "-title"}>
            {event.title}
          </motion.span>
          <motion.p
            className="text-sm text-muted-foreground line-clamp-2"
            layoutId={event.id + "-description"}
          >
            {event.description}
          </motion.p>
          <div className="flex items-center mt-2 gap-1">
            <Button
              className="flex-1"
              variant={"secondary"}
              size={"sm"}
              onClick={() => setIsDetailedViewOpen(true)}
            >
              Details
            </Button>
            <Link href={`/contest/${event.id}`}>
              <Button size={"sm"}>
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        <SlickDialog
          layoutId={event.id}
          isOpen={isDetailedViewOpen}
          onClose={() => setIsDetailedViewOpen(false)}
        >
          <div className="w-full flex flex-col items-center">
            <motion.div
              className="flex items-center justify-center w-40 h-32 border border-border rounded-xl"
              layoutId={event.id + "-icon"}
            >
              <Code2 size={32} className="text-muted-foreground" />
            </motion.div>
            <motion.div
              className="absolute top-2 left-2 rounded-full bg-accent px-2"
              layoutId={event.id + "-status"}
            >
              <span className="text-sm text-accent-foreground">
                Unattempted
              </span>
            </motion.div>
            <div className="p-2 w-full flex flex-col items-center mt-2">
              <motion.span
                className="font-bold text-xl"
                layoutId={event.id + "-title"}
              >
                {event.title}
              </motion.span>
              <motion.p
                className="text-muted-foreground text-center mt-2"
                layoutId={event.id + "-description"}
              >
                {event.description}
              </motion.p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center mt-8">
            <Link href={`/contest/${event.id}`} className="w-full">
              <Button className="w-full">Attempt</Button>
            </Link>
          </div>
        </SlickDialog>
      </AnimatePresence>
    </>
  );
};

const Upcoming = () => {
  const events: EventObject[] = [
    {
      title: "Event 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem deserunt quaerat animi ea excepturi quod tenetur",
      date: new Date(),
      time: new Date(),
      id: "ev001",
    },
  ];
  return (
    <section className="flex flex-col items-start w-full">
      <h2 className="flex items-center text-xl font-bold text-muted-foreground">
        <CodeSquare className="mr-2" />
        <span>Upcoming</span>
      </h2>
      {events.length === 0 ? (
        <div className="w-full text-center text-pretty border border-border bg-background p-4 rounded-xl my-4">
          You are all caught up! 🎉
        </div>
      ) : (
        <div className="w-full text-pretty my-4 flex items-start flex-wrap">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Upcoming;
