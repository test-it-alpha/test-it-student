import { useEffect, useState } from "react";

const checkIsFullScreen = () => {
  const isFullScreen = !!(
    document.fullscreenElement || (document as any).webkitFullscreenElement
  );

  return isFullScreen;
};

export const useFullScreenChange = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>();

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(checkIsFullScreen());
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  return isFullScreen;
};
