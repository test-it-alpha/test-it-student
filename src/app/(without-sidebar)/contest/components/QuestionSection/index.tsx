"use client";
import React from "react";
import QuestionsList from "./QuestionsList";
import { useContestContext } from "../../contexts/Contest";
import QuestionPage from "./QuestionPage";

const QuestionSection = () => {
  const { currentQuestionId } = useContestContext();
  return (
    <div className="w-full h-full">
      {currentQuestionId ? <QuestionPage /> : <QuestionsList />}
    </div>
  );
};

export default QuestionSection;
