import React from "react";
import { Question } from "../../../context/Contest";
import { CheckCircle, Circle, CircleAlert, MinusCircle } from "lucide-react";

const userFriendlyQuestionStatusMap: {
  [k in Question["status"]]: {
    text: string;
    icon: React.ReactNode;
    colorClass: string;
  };
} = {
  AC: {
    text: "Submitted",
    icon: <CheckCircle className="w-4 h-4" />,
    colorClass: "text-green-500",
  },
  ATT: {
    text: "Attempted",
    icon: <MinusCircle className="w-4 h-4" />,
    colorClass: "text-orange-500",
  },
  UNATT: {
    text: "Unattempted",
    icon: <Circle className="w-4 h-4" />,
    colorClass: "text-muted-foreground",
  },
  WA: {
    text: "Wrong Answer",
    icon: <CircleAlert className="w-4 h-4" />,
    colorClass: "text-red-500",
  },
  TLE: {
    text: "Time Limit Exceeded",
    icon: <CircleAlert className="w-4 h-4" />,
    colorClass: "text-red-500",
  },
  RTE: {
    text: "Runtime Error",
    icon: <CircleAlert className="w-4 h-4" />,
    colorClass: "text-red-500",
  },
};

const ProblemStatusIndicator = ({
  status,
  showIcon = true,
  showText = true,
}: {
  status: Question["status"];
  showIcon?: boolean;
  showText?: boolean;
}) => {
  return (
    <span
      className={`${userFriendlyQuestionStatusMap[status].colorClass} flex items-center gap-2`}
    >
      {showIcon && userFriendlyQuestionStatusMap[status].icon}
      {showText && (
        <span className={`capitalize text-sm`}>
          {userFriendlyQuestionStatusMap[status].text}
        </span>
      )}
    </span>
  );
};

export default ProblemStatusIndicator;
