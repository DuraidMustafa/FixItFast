// Fixed: CodeEditorWithPreview.tsx
"use client";

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Code, Zap, XCircle } from "lucide-react";
import { SubmitButton } from "./submit-button";
import { ConsoleResultListener } from "./console-result";
import { Timer } from "./timer";
import { ResultModal } from "./result-model";

type ChallengeFile = {
  code: string;
  hidden?: boolean;
};

export default function CodeEditorWithPreview({
  difficulty,
  time,
  language,
}: {
  difficulty: string;
  time: string;
  language: string;
}) {
  const [template, setTemplate] = useState();
  const [files, setFiles] = useState<Record<string, ChallengeFile>>({});
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [showResultModal, setShowResultModal] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: "pass" | "fail";
    message: string;
    isTimeUp?: boolean;
  }>({ status: "fail", message: "" });

  const [showInlineError, setShowInlineError] = useState(false);
  const [inlineErrorMessage, setInlineErrorMessage] = useState("");

  const timeoutTriggeredRef = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      difficulty: difficulty.toString(),
      language: language.toString(),
    });

    const fetchChallenge = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/challenge/getChallenge?${queryParams}`,
        );
        const data = await response.json();
        const challenge = data.challenge;
        setTemplate(challenge.template);
        setFiles(challenge.files);
        setTitle(challenge.title);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, [difficulty, language]);

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-green-900/20 text-green-400 border-green-800";
      case "medium":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-800";
      case "hard":
        return "bg-red-900/20 text-red-400 border-red-800";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const handleTestResult = (status: "pass" | "fail", message?: string) => {
    setTestResult({
      status,
      message: message || "",
      isTimeUp: timeoutTriggeredRef.current,
    });
    setShowResultModal(true);
    setShowInlineError(false);
    timeoutTriggeredRef.current = false;
  };

  const handleTimeUp = () => {
    timeoutTriggeredRef.current = true;
    const submitButton = document.querySelector(
      '[data-testid="submit-button"]',
    ) as HTMLButtonElement;
    if (submitButton) {
      setTimeout(() => {
        submitButton.click();
      }, 100);
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleRetry = () => {
    setShowResultModal(false);
    setShowInlineError(false);
    setTestResult({ status: "fail", message: "" });
  };

  useEffect(() => {
    const originalError = window.console.error;
    const previousConsoleError = window.console.error;

    window.console.error = (...args: any[]) => {
      const str = args.join(" ");
      if (
        !str.includes("TEST_FAIL_") &&
        (str.includes("SyntaxError") ||
          str.includes("TypeError") ||
          str.includes("ReferenceError"))
      ) {
        const briefError =
          str.split("\n")[0].substring(0, 100) +
          (str.length > 100 ? "..." : "");
        setShowInlineError(true);
        setInlineErrorMessage(briefError);
        setTimeout(() => setShowInlineError(false), 8000);
      }

      previousConsoleError(...args); // ✅ Let ConsoleResultListener catch the rest
    };

    return () => {
      window.console.error = originalError;
    };
  }, []);

  return (
    <div className='w-full max-w-7xl mx-auto'>
      <Card className='w-full shadow-2xl bg-gray-900 border-gray-800 h-full'>
        <CardHeader className='pb-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-lg border-b border-gray-700'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <CardTitle className='text-2xl font-bold flex items-center gap-2 text-gray-100'>
                <Code className='h-6 w-6 text-blue-400' />
                Code Challenge
              </CardTitle>
              {title && (
                <h2 className='text-lg text-gray-300 font-medium'>{title}</h2>
              )}
            </div>
            <div className='flex items-center gap-3'>
              {time !== "none" && (
                <Timer
                  timeLimit={time}
                  onTimeUp={handleTimeUp}
                />
              )}
              <Badge
                variant='outline'
                className={`${getDifficultyColor(difficulty)} font-medium`}>
                <Zap className='h-3 w-3 mr-1' />
                {difficulty}
              </Badge>
              <Badge
                variant='outline'
                className='bg-purple-900/20 text-purple-400 border-purple-800'>
                <Code className='h-3 w-3 mr-1' />
                {language}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-0 bg-gray-900 flex-1'>
          {files && template ? (
            <div className='rounded-lg overflow-hidden border border-gray-700 shadow-lg mb-6'>
              <SandpackProvider
                template={template}
                files={{
                  ...files,
                  "/test-executor.js": {
                    code: "// Test executor - hidden",
                    hidden: true,
                  },
                }}
                theme={dracula}
                options={{ recompileMode: "delayed", recompileDelay: 300 }}>
                <SandpackLayout>
                  <SandpackCodeEditor style={{ height: 500, flex: 2 }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}>
                    <SandpackPreview style={{ height: 350, flex: 1 }} />
                    <SandpackConsole
                      style={{
                        height: 120,
                        fontSize: "12px",
                        maxHeight: 120,
                        overflowY: "auto",
                        borderTop: "1px solid #374151",
                      }}
                      showHeader={false}
                    />
                  </div>
                </SandpackLayout>

                <div className='p-4 border-t border-gray-700 bg-gray-800/50'>
                  {showInlineError && (
                    <div className='mb-3 p-2 bg-red-900/20 border border-red-800 rounded-md overflow-hidden'>
                      <div className='flex items-center gap-2'>
                        <XCircle className='h-3 w-3 text-red-400 flex-shrink-0' />
                        <div className='flex-1 min-w-0 overflow-hidden'>
                          <p className='text-red-300 text-xs truncate font-mono'>
                            {inlineErrorMessage}
                          </p>
                        </div>
                        <button
                          onClick={() => setShowInlineError(false)}
                          className='text-red-400 hover:text-red-300 text-sm leading-none flex-shrink-0'>
                          ×
                        </button>
                      </div>
                    </div>
                  )}

                  <ConsoleResultListener onResult={handleTestResult} />

                  <div className='flex justify-between items-center'>
                    <div className='text-sm text-gray-400'>
                      Click Submit to test your solution
                    </div>
                    <SubmitButton onTestResult={handleTestResult} />
                    <button
                      data-testid='submit-button'
                      style={{ display: "none" }}>
                      Hidden Submit
                    </button>
                  </div>
                </div>
              </SandpackProvider>
            </div>
          ) : (
            <div className='w-full h-[600px] bg-gray-800 rounded-lg animate-pulse flex items-center justify-center'>
              <div className='text-gray-400 flex items-center gap-2'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400'></div>
                Loading editor...
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ResultModal
        isOpen={showResultModal}
        status={testResult.status}
        message={testResult.message}
        isTimeUp={testResult.isTimeUp}
        onClose={() => setShowResultModal(false)}
        onGoToDashboard={handleGoToDashboard}
        onRetry={handleRetry}
      />
    </div>
  );
}
