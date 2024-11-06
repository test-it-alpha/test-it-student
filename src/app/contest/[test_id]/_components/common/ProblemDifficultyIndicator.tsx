import React from "react";

const ProblemDifficultyIndicator = ({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) => {
  return (
    <span
      className={`text-xs px-2 py-1 capitalize rounded-full ${
        difficulty === "easy"
          ? "bg-green-100 text-green-800"
          : difficulty === "medium"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {difficulty}
    </span>
  );
};

export default ProblemDifficultyIndicator;
