"use client";
import React, { useEffect } from "react";
import { Mosaic, MosaicNode, MosaicDirection } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import "@/app/styles/mosaic.css";
import CodeSection from "../components/CodeSection";
import QuestionSection from "../components/QuestionSection";
import CodeInput from "../components/CodeSection/CodeInput";
import CodeUtils from "../components/CodeSection/CodeUtils";
import { useContestContext } from "../contexts/Contest";
import useUserContestPreferencesContext from "../contexts/UserContestPreferences";
import LockoutWarning from "../components/common/LockoutWarning";
import ContestInfo from "../components/ContestInfo";
import useContestClientActivity from "../contexts/ContestClientActivity";

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

const ContestPage = () => {
  const { currentQuestionId } = useContestContext();
  const { mosaicLayout, updateMosaicLayout } =
    useUserContestPreferencesContext();
  const { fullScreen, setShouldTrackPageExit, pageExitAttempted } =
    useContestClientActivity();

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

  useEffect(() => {
    if (fullScreen.initial) {
      setShouldTrackPageExit(true);
    }
  }, [fullScreen.initial]);

  return (
    <div className="w-full flex-1 flex items-start divide-x">
      {fullScreen.initial ? (
        <>
          <Mosaic<TileId>
            renderTile={(tile) => TILES[tile]}
            value={mosaicLayout}
            onChange={onChange}
            className="custom-theme"
          />
          {pageExitAttempted && <LockoutWarning open />}
        </>
      ) : (
        <div className="w-full h-full flex items-start justify-center">
          <ContestInfo />
        </div>
      )}
    </div>
  );
};

export default ContestPage;
