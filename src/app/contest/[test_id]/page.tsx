"use client";
import React, { useEffect } from "react";
import { Mosaic, MosaicNode, MosaicDirection } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import "./_components/styles/mosaic.css";
import CodeSection from "./_components/CodeSection";
import QuestionSection from "./_components/QuestionSection";
import CodeInput from "./_components/CodeSection/CodeInput";
import CodeUtils from "./_components/CodeSection/CodeUtils";
import { useContestContext } from "../context/Contest";
import useUserContestPreferencesContext from "../context/UserContestPreferences";

type TileId =
  | "questionSection"
  | "emptyCodeSection"
  | "codeInput"
  | "codeUtils";

const TILES = {
  questionSection: <QuestionSection />,
  emptyCodeSection: <CodeSection />,
  codeInput: <CodeInput />,
  codeUtils: <CodeUtils />,
};

const CodeTestPage = () => {
  const { currentQuestionId } = useContestContext();
  const { mosaicLayout, updateMosaicLayout } =
    useUserContestPreferencesContext();

  // Update layout when currentQuestionId changes while preserving split percentages
  useEffect(() => {
    if (typeof mosaicLayout === "string") return;

    const newSecondPane: MosaicNode<TileId> = currentQuestionId
      ? {
          direction: "column" as MosaicDirection,
          first: "codeInput",
          second: "codeUtils",
          splitPercentage:
            (typeof mosaicLayout.second === "object" &&
              mosaicLayout.second.splitPercentage) ||
            70,
        }
      : "emptyCodeSection";

    updateMosaicLayout({
      ...mosaicLayout,
      second: newSecondPane,
    });
  }, [currentQuestionId]);

  const onChange = (newNode: MosaicNode<TileId> | null) => {
    if (newNode) {
      updateMosaicLayout(newNode);
    }
  };

  return (
    <div className="w-full flex-1 flex items-start divide-x">
      <Mosaic<TileId>
        renderTile={(tile) => TILES[tile]}
        value={mosaicLayout}
        onChange={onChange}
        className="custom-theme"
      />
    </div>
  );
};

export default CodeTestPage;
