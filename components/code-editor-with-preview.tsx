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
import type { SubmitButtonHandle } from "./submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code,
  Zap,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
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
  const [test, setTest] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: "pass" | "fail";
    message: string;
    isTimeUp?: boolean;
  }>({ status: "fail", message: "" });
  const [showInlineError, setShowInlineError] = useState(false);
  const [inlineErrorMessage, setInlineErrorMessage] = useState("");
  const timeoutTriggeredRef = useRef(false);
  const submitButtonRef = useRef<SubmitButtonHandle>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      difficulty: difficulty.toString(),
      language: language.toString(),
    });
    console.log(queryParams);

    const fetchChallenge = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch(
          `/api/challenge/getChallenge?${queryParams}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch challenge");
        }

        const data = await response.json();
        const challenge = data.challenge;

        if (!challenge) {
          setHasError(true);
          return;
        }

        setTemplate(challenge.template);
        setFiles(challenge.files);
        setTitle(challenge.title);
        setTest(challenge.test);
        console.log("Test", challenge.test);
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, [difficulty, language]);

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10";
      case "hard":
        return "bg-red-500/10 text-red-400 border-red-500/20 shadow-red-500/10";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
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
    console.log("Time is up! Running final test...");
    timeoutTriggeredRef.current = true;
    if (submitButtonRef.current) {
      submitButtonRef.current.submit();
    } else {
      setTestResult({
        status: "fail",
        message: "Time limit exceeded - could not run final test",
        isTimeUp: true,
      });
      setShowResultModal(true);
      setShowInlineError(false);
    }
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleRetry = () => {
    setShowResultModal(false);
    setShowInlineError(false);
    setTestResult({ status: "fail", message: "" });
    timeoutTriggeredRef.current = false;
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
      previousConsoleError(...args);
    };

    return () => {
      window.console.error = originalError;
    };
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className='w-full max-w-7xl mx-auto'>
        <Card className='w-full shadow-2xl bg-slate-900/95 border-slate-800/50 backdrop-blur-sm'>
          <CardHeader className='pb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-t-lg border-b border-slate-700/50'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                  <div className='h-8 w-8 bg-slate-700 rounded-lg animate-pulse' />
                  <div className='h-8 w-48 bg-slate-700 rounded-lg animate-pulse' />
                </div>
                <div className='h-6 w-64 bg-slate-700 rounded-lg animate-pulse' />
              </div>
              <div className='flex items-center gap-3'>
                <div className='h-8 w-20 bg-slate-700 rounded-full animate-pulse' />
                <div className='h-8 w-16 bg-slate-700 rounded-full animate-pulse' />
                <div className='h-8 w-20 bg-slate-700 rounded-full animate-pulse' />
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='w-full h-[600px] bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-center'>
              <div className='text-slate-400 flex flex-col items-center gap-4'>
                <Loader2 className='h-8 w-8 animate-spin text-blue-400' />
                <div className='text-lg font-medium'>Loading Challenge...</div>
                <div className='text-sm text-slate-500'>
                  Preparing your coding environment
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error/No Challenge State
  if (hasError || !template || !files || Object.keys(files).length === 0) {
    return (
      <div className='w-full max-w-7xl mx-auto'>
        <Card className='w-full shadow-2xl bg-slate-900/95 border-slate-800/50 backdrop-blur-sm'>
          <CardHeader className='pb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-t-lg border-b border-slate-700/50'>
            <CardTitle className='text-2xl font-bold flex items-center gap-3 text-slate-100'>
              <Code className='h-6 w-6 text-blue-400' />
              Code Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className='p-12'>
            <div className='flex flex-col items-center justify-center text-center space-y-6'>
              <div className='h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center'>
                <AlertTriangle className='h-10 w-10 text-amber-400' />
              </div>
              <div className='space-y-2'>
                <h3 className='text-2xl font-bold text-slate-200'>
                  No Challenge Found
                </h3>
                <p className='text-slate-400 max-w-md'>
                  We couldn't find a challenge matching your criteria. This
                  might be due to network issues or the challenge may not exist.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-3'>
                <Button
                  onClick={handleGoToDashboard}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200'>
                  <ArrowLeft className='h-4 w-4 mr-2' />
                  Back to Dashboard
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant='outline'
                  className='border-slate-600 text-black hover:bg-slate-800 px-6 py-2 rounded-lg transition-colors duration-200 hover:text-white'>
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Component
  return (
    <div className='w-full max-w-7xl mx-auto'>
      <Card className='w-full shadow-2xl bg-slate-900/95 border-slate-800/50 backdrop-blur-sm h-full'>
        <CardHeader className='pb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-t-lg border-b border-slate-700/50'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-3'>
              <CardTitle className='text-2xl font-bold flex items-center gap-3 text-slate-100'>
                <div className='h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center'>
                  <Code className='h-5 w-5 text-blue-400' />
                </div>
                Code Challenge
              </CardTitle>
              {title && (
                <h2 className='text-lg text-slate-300 font-medium pl-11'>
                  {title}
                </h2>
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
                className={`${getDifficultyColor(
                  difficulty,
                )} font-medium shadow-sm`}>
                <Zap className='h-3 w-3 mr-1' />
                {difficulty}
              </Badge>
              <Badge
                variant='outline'
                className='bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-purple-500/10 font-medium'>
                <Code className='h-3 w-3 mr-1' />
                {language}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-6 bg-slate-900 flex-1'>
          <div className='rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800/30 backdrop-blur-sm'>
            <SandpackProvider
              template={template}
              files={{
                ...files,
              }}
              theme={dracula}
              options={{ recompileMode: "delayed", recompileDelay: 300 }}>
              <SandpackLayout>
                <SandpackCodeEditor
                  style={{
                    height: 500,
                    flex: 2,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}>
                  <SandpackPreview
                    style={{
                      height: 350,
                      flex: 1,
                      borderRadius: "0",
                    }}
                  />
                  <SandpackConsole
                    style={{
                      height: 120,
                      fontSize: "12px",
                      maxHeight: 120,
                      overflowY: "auto",
                      borderTop: "1px solid #374151",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                    showHeader={false}
                  />
                </div>
              </SandpackLayout>

              <div className='p-4 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm'>
                {showInlineError && (
                  <div className='mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm animate-in slide-in-from-top-2 duration-300'>
                    <div className='flex items-start gap-3'>
                      <XCircle className='h-4 w-4 text-red-400 flex-shrink-0 mt-0.5' />
                      <div className='flex-1 min-w-0'>
                        <p className='text-red-300 text-sm font-mono leading-relaxed break-all'>
                          {inlineErrorMessage}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowInlineError(false)}
                        className='text-red-400 hover:text-red-300 transition-colors duration-200 flex-shrink-0 p-1 hover:bg-red-500/10 rounded'>
                        <XCircle className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                )}

                <ConsoleResultListener onResult={handleTestResult} />

                <div className='flex justify-between items-center'>
                  <div className='text-sm text-slate-400 flex items-center gap-2'>
                    <div className='h-2 w-2 bg-slate-500 rounded-full animate-pulse' />
                    Click Submit to test your solution
                  </div>
                  <SubmitButton
                    ref={submitButtonRef}
                    test={test}
                    onTestResult={handleTestResult}
                    language={language}
                  />
                </div>
              </div>
            </SandpackProvider>
          </div>
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
