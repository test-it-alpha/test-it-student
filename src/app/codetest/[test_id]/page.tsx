import React from "react";
import QuestionsList from "./_components/QuestionsList";
import CodeSection from "./_components/CodeSection";

const CodeTestPage = () => {
  return (
    <div className="w-full h-full flex items-start divide-x">
      <div className="flex-1 h-full">
        <QuestionsList />
      </div>
      <div className="flex-1 h-full">
        <CodeSection />
      </div>
    </div>
  );
};

export default CodeTestPage;
