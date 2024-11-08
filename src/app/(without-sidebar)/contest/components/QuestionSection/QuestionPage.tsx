"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useContestContext } from "../../contexts/Contest";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProblemStatusIndicator from "../common/ProblemStatusIndicator";
import ProblemDifficultyIndicator from "../common/ProblemDifficultyIndicator";

export default function QuestionPage() {
  const { questions, currentQuestionId, setCurrentQuestionId } =
    useContestContext();
  const questionIndex = questions.findIndex((q) => q.id === currentQuestionId);
  const question = questionIndex === -1 ? undefined : questions[questionIndex];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setCurrentQuestionId(undefined)}
            >
              <ChevronLeft />
              <span>All Problems</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>View all problems</TooltipContent>
        </Tooltip>
        <div className="flex items-center gap-2 mr-3">
          {question && <ProblemStatusIndicator status={question?.status} />}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                className="rounded-full p-0 h-8 w-8 ml-2"
                size={"sm"}
                disabled={questions.at(0)?.id === currentQuestionId}
                onClick={() =>
                  setCurrentQuestionId(questions.at(questionIndex - 1)?.id)
                }
              >
                <ChevronLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Previous Problem</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                className="rounded-full p-0 h-8 w-8"
                size={"sm"}
                disabled={questions.at(-1)?.id === currentQuestionId}
                onClick={() =>
                  setCurrentQuestionId(questions.at(questionIndex + 1)?.id)
                }
              >
                <ChevronRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Next Problem</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="p-2 px-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{question?.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {question && (
            <ProblemDifficultyIndicator difficulty={question?.difficulty} />
          )}
          <span className="text-sm text-muted-foreground">
            {question?.points} Points
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1"></ScrollArea>
    </div>
  );
}
