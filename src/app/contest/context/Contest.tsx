"use client";
import { createContext, useContext, useState } from "react";

export type Question = {
  id: string;
  title: string;
  content: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  status: "WA" | "TLE" | "RTE" | "UNATT" | "ATT" | "AC";
  defaultTestCase: string;
};

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: "1",
    title: "Two Sum Problem",
    content: "",
    status: "AC",
    difficulty: "easy",
    points: 4,
    defaultTestCase: `
    1
    2
    3
    `,
  },
  {
    id: "2",
    title: "Reverse Linked List",
    content: "",
    status: "ATT",
    difficulty: "medium",
    points: 4,
    defaultTestCase: `
    1
    2
    3
    `,
  },
  {
    id: "3",
    title: "Binary Tree Traversal",
    content: "",
    status: "TLE",
    difficulty: "medium",
    points: 4,
    defaultTestCase: `
    1
    2
    3
    `,
  },
  {
    id: "4",
    title: "Dynamic Programming Basics",
    content: "",
    status: "AC",
    points: 4,
    difficulty: "hard",
    defaultTestCase: `
    1
    2
    3
    `,
  },
  {
    id: "5",
    title: "Graph Search Algorithm",
    content: "",
    status: "UNATT",
    difficulty: "hard",
    points: 4,
    defaultTestCase: `
    1
    2
    3
    `,
  },
];

type ContestContextType = {
  durationInSec: number | null;
  questions: Question[];
  currentQuestionId: string | undefined;
};

type ContestActionsType = {
  setDurationInSec: React.Dispatch<React.SetStateAction<number | null>>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setCurrentQuestionId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const ContestContext = createContext<
  (ContestContextType & ContestActionsType) | null
>(null);

const ContestContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [durationInSec, setDurationInSec] = useState<null | number>(null);
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>();

  return (
    <ContestContext.Provider
      value={{
        durationInSec,
        questions,
        currentQuestionId,
        setDurationInSec,
        setQuestions,
        setCurrentQuestionId,
      }}
    >
      {children}
    </ContestContext.Provider>
  );
};

const useContestContext = () => {
  const context = useContext(ContestContext);
  if (context === null) {
    throw new Error(
      "useContestContext must be used within a ContestContextProvider"
    );
  }
  return context;
};

export { ContestContextProvider, useContestContext };
