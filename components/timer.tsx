"use client";
import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export function Timer({
  timeLimit,
  onTimeUp,
}: {
  timeLimit: string;
  onTimeUp: () => void;
}) {
  const parseTimeLimit = (timeStr: string): number => {
    const str = timeStr.toLowerCase();
    if (str === "none") return 0;
    if (str.includes("min")) return parseInt(str) * 60;
    if (str.includes("hour")) return parseInt(str) * 3600;
    if (str.includes("sec")) return parseInt(str);
    return parseInt(str || "30") * 60;
  };

  const [timeLeft, setTimeLeft] = useState<number>(() =>
    parseTimeLimit(timeLimit),
  );
  const [isActive, setIsActive] = useState(timeLimit !== "none");

  useEffect(() => {
    const totalSeconds = parseTimeLimit(timeLimit);
    setTimeLeft(totalSeconds);
    setIsActive(timeLimit !== "none");
  }, [timeLimit]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsActive(false);
          // Call onTimeUp directly when timer reaches 0
          setTimeout(() => onTimeUp(), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return timeLimit !== "none" ? (
    <div className='flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-lg border border-gray-700'>
      {timeLeft <= 60 ? (
        <AlertTriangle className='h-4 w-4 text-red-400 animate-pulse' />
      ) : (
        <Clock className='h-4 w-4 text-gray-400' />
      )}
      <span
        className={`font-mono text-sm font-medium ${
          timeLeft <= 60 ? "text-red-400" : "text-green-400"
        }`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  ) : null;
}
