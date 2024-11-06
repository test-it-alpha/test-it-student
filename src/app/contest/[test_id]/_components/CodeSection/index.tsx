"use client";

import CodeInput from "./CodeInput";
import CodeUtils from "./CodeUtils";
import { useContestContext } from "../../../context/Contest";
import { Mosaic } from "react-mosaic-component";

const TILES = {
  top: <CodeInput />,
  bottom: <CodeUtils />,
};

export default function CodeSection() {
  const { currentQuestionId } = useContestContext();

  if (!currentQuestionId) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-muted-foreground">Click a question to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Mosaic<keyof typeof TILES>
        renderTile={(tile) => TILES[tile]}
        initialValue={{
          direction: "column",
          first: "top",
          second: "bottom",
          splitPercentage: 70,
        }}
        className="custom-theme"
      />
    </div>
  );
}
