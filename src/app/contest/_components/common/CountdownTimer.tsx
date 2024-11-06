"use client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function CountdownTimer({ totalTime }: { totalTime: number }) {
  const [timeLeft, setTimeLeft] = useState(totalTime); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const rgbVal = `${200 * (1 - timeLeft / totalTime)} ${
    200 * (timeLeft / totalTime)
  } 0`;

  return (
    <div
      className="text-sm font-semibold rounded-full px-3 py-1 flex items-center gap-2"
      style={{
        color: `rgb(${rgbVal})`,
        backgroundColor: `rgb(${rgbVal} / 0.05)`,
      }}
    >
      <Clock size={16} />
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
