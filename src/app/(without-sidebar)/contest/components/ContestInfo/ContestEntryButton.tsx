"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import useContestClientActivity from "../../contexts/ContestClientActivity";

const ContestEntryButton = () => {
  const {
    fullScreen: { setInitial, setCurrent },
  } = useContestClientActivity();

  const handleFullScreenSuccess = () => {
    setInitial(true);
    setCurrent(true);
  };

  return (
    <Button
      onClick={() => {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen().then(handleFullScreenSuccess);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        } else if (document.body.webkitRequestFullscreen) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.body.webkitRequestFullscreen().then(handleFullScreenSuccess);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        } else if (document.body.msRequestFullscreen) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.body.msRequestFullscreen().then(handleFullScreenSuccess);
        }
      }}
    >
      Enter Contest
    </Button>
  );
};

export default ContestEntryButton;
