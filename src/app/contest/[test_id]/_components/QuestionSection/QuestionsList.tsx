import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import { useContestContext } from "../../../context/Contest";
import ProblemStatusIndicator from "../common/ProblemStatusIndicator";
import ProblemDifficultyIndicator from "../common/ProblemDifficultyIndicator";

export default function QuestionsList({
  onQuestionSelect,
}: {
  onQuestionSelect?: (questionId: string) => void;
}) {
  const { questions, setCurrentQuestionId } = useContestContext();

  const submittedCount = questions.filter((q) => q.status === "AC").length;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Practice Questions</h2>
          <p className="text-sm text-muted-foreground">
            {submittedCount} of {questions.length} submitted successfully.
          </p>
        </div>
      </div>
      <ScrollArea className="flex-1 pt-4">
        <div className="space-y-0">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="p-4 px-8 cursor-pointer hover:bg-accent transition-colors flex flex-col w-full gap-2 relative"
              onClick={() => {
                onQuestionSelect?.(question.id);
                setCurrentQuestionId(question.id);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <ProblemStatusIndicator status={question.status} />
                </div>
                <div className="flex items-center gap-2">
                  <ProblemDifficultyIndicator
                    difficulty={question.difficulty}
                  />
                  <strong className="text-sm text-muted-foreground">
                    {question.points} pts
                  </strong>
                </div>
              </div>
              <h3 className="font-medium text-lg flex items-center justify-between">
                <span>{question.title}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </h3>
              {index !== questions.length - 1 && (
                <hr className="absolute bottom-0 left-8 right-8 border-t border-border" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
