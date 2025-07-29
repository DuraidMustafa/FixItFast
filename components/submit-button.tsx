"use client";
import { useImperativeHandle, forwardRef } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export type SubmitButtonHandle = {
  submit: () => void;
};

export const SubmitButton = forwardRef(
  (
    {
      onTestResult,
      test,
    }: {
      onTestResult: (status: "pass" | "fail", message: string) => void;
      test: String;
    },
    ref,
  ) => {
    const { sandpack } = useSandpack();

    const handleSubmit = () => {
      console.log("Submit clicked - Running tests...");

      try {
        const finalCode: any = test;
        setTimeout(() => {
          sandpack.updateFile("/index.js", finalCode);
          console.log("Test code injected and ready to execute");
        }, 100);
      } catch (error) {
        console.error("Test setup error", error);
        onTestResult("fail", "Test setup failed");
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <Button
        onClick={handleSubmit}
        className='bg-blue-600 text-white hover:bg-blue-700 transition-colors'
        disabled={!sandpack.files["/App.js"]}>
        <Send className='w-4 h-4 mr-2' />
        Submit Solution
      </Button>
    );
  },
);
