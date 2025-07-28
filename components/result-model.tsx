"use client";
import { CheckCircle, XCircle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResultModal({
  isOpen,
  status,
  message,
  isTimeUp = false,
  onClose,
  onGoToDashboard,
  onRetry,
}: {
  isOpen: boolean;
  status: "pass" | "fail";
  message: string;
  isTimeUp?: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
  onRetry?: () => void;
}) {
  if (!isOpen) return null;

  const isSuccess = status === "pass";

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl'>
        {/* Icon and Title */}
        <div className='text-center mb-6'>
          {isSuccess ? (
            <CheckCircle className='h-16 w-16 text-green-400 mx-auto mb-4' />
          ) : (
            <XCircle className='h-16 w-16 text-red-400 mx-auto mb-4' />
          )}

          <h2
            className={`text-2xl font-bold mb-2 ${
              isSuccess ? "text-green-400" : "text-red-400"
            }`}>
            {isSuccess
              ? "Congratulations! 🎉"
              : isTimeUp
              ? "Time's Up! ⏰"
              : "Test Failed 😞"}
          </h2>

          <p className='text-gray-300 text-sm leading-relaxed'>
            {isSuccess
              ? "You've successfully completed the challenge!"
              : isTimeUp
              ? "The time limit has been reached."
              : "Don't worry, keep practicing and you'll get it!"}
          </p>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${
                isSuccess
                  ? "bg-green-900/30 text-green-300 border border-green-800"
                  : "bg-red-900/30 text-red-300 border border-red-800"
              }`}>
              {message}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col gap-3'>
          <Button
            onClick={onGoToDashboard}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors'>
            <Home className='h-4 w-4 mr-2' />
            Back to Dashboard
          </Button>

          {!isSuccess && onRetry && !isTimeUp && (
            <Button
              onClick={onRetry}
              variant='outline'
              className='w-full border-gray-600 text-black hover:bg-gray-800 py-3 rounded-lg font-medium transition-colors hover:text-white'>
              <RotateCcw className='h-4 w-4 mr-2' />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
