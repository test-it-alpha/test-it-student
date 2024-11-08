"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, Play, Send } from "lucide-react";
import { useContestContext } from "@/app/(without-sidebar)/contest/contexts/Contest";

export default function CodeUtils() {
  const { currentQuestionId, questions } = useContestContext();
  const [activeTab, setActiveTab] = useState("input");
  const [input, setInput] = useState(
    currentQuestionId
      ? questions.find((q) => q.id === currentQuestionId)?.defaultTestCase || ""
      : ""
  );
  const [output, setOutput] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<
    "correct" | "incorrect" | null
  >(null);

  const handleReset = () => {
    setInput(
      currentQuestionId
        ? questions.find((q) => q.id === currentQuestionId)?.defaultTestCase ||
            ""
        : ""
    );
  };

  const handleRun = async () => {
    setIsLoading(true);
    setActiveTab("output");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate code execution
      setOutput(`Output for the input:\n${input}\n\nSimulated result: Success`);
    } catch (error) {
      console.log(error);
      setOutput("An error occurred while running the code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsSubmitted(true);
    setActiveTab("submission");
    try {
      await new Promise((resolve, reject) => {
        const random = Math.random();
        setTimeout(() => {
          if (random > 0.5) {
            resolve(null);
          } else {
            reject(new Error("Wrong Answer"));
          }
        }, 2000);
      });
      setSubmissionResult("correct");
    } catch (error) {
      console.error(error);
      setSubmissionResult("incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between p-2 border-b">
          <TabsList className="grid w-[300px] grid-cols-3">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="submission" disabled={!isSubmitted}>
              Submission
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRun}
              disabled={isLoading}
              className="gap-1"
            >
              <Play className="h-4 w-4" />{" "}
              {isLoading && activeTab === "output" ? "Running..." : "Run"}
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isLoading}
              className="gap-1"
            >
              <Send className="h-4 w-4" />{" "}
              {isLoading && activeTab === "submission"
                ? "Submitting..."
                : "Submit"}
            </Button>
          </div>
        </div>

        <div className="p-4">
          <TabsContent value="input">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Test Case Input</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-7 w-7"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your test case here..."
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>

          <TabsContent value="output">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Output</h3>
              {isLoading && activeTab === "output" ? (
                <p className="text-muted-foreground">Running your code...</p>
              ) : output ? (
                <pre className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {output}
                </pre>
              ) : (
                <p className="text-muted-foreground">
                  Run your code to see the output
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="submission">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Submission Status</h3>
              {isLoading && activeTab === "submission" ? (
                <p className="text-muted-foreground">Submitting your code...</p>
              ) : submissionResult === "correct" ? (
                <p className="text-green-600 font-medium">Correct Answer</p>
              ) : submissionResult === "incorrect" ? (
                <div>
                  <p className="text-red-600 font-medium">Wrong Answer</p>
                  <pre className="p-4 bg-muted rounded-lg whitespace-pre-wrap mt-2">
                    Input Test Case:
                    {input}
                    Logs: Error: Wrong Answer
                  </pre>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Submit your code to see the result
                </p>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
