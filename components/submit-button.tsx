// components/submit-button.tsx
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
    }: {
      onTestResult: (status: "pass" | "fail", message: string) => void;
    },
    ref,
  ) => {
    const { sandpack } = useSandpack();

    const handleSubmit = () => {
      console.log("Submit clicked - Running tests...");

      try {
        const timestamp = Date.now();

        const cleanupCode = `
if (typeof window !== 'undefined') {
  delete window.testExecuted;
  delete window.currentTest;
}
`;

        const testCode = `
// Test execution code - timestamp: ${timestamp}
(function executeTest() {
  console.log("🧪 Starting test execution [${timestamp}]");

  setTimeout(() => {
    try {
      const buttons = document.querySelectorAll('button');
      let targetButton = null;

      for (let button of buttons) {
        const text = (button.textContent || button.innerText || '').toLowerCase();
        if (text.includes('increase') || text.includes('5')) {
          targetButton = button;
          break;
        }
      }

      if (!targetButton) {
        console.log("TEST_FAIL_${timestamp}: Could not find increment button");
        return;
      }

      let initialCount = 0;
      let countElement = null;
      const countRegex = /count[:\\s]*([0-9]+)/i;

      const allElements = document.querySelectorAll('*');
      for (let el of allElements) {
        const text = el.textContent || el.innerText || '';
        const match = text.match(countRegex);
        if (match) {
          initialCount = parseInt(match[1]);
          countElement = el;
          break;
        }
      }

      if (!countElement) {
        console.log("TEST_FAIL_${timestamp}: Could not find count display element");
        return;
      }

      targetButton.click();

      setTimeout(() => {
        try {
          const newText = countElement.textContent || countElement.innerText || '';
          const newMatch = newText.match(countRegex);

          if (!newMatch) {
            console.log("TEST_FAIL_${timestamp}: Could not read count after click");
            return;
          }

          const newCount = parseInt(newMatch[1]);

          if (newCount === initialCount + 5) {
            console.log("TEST_PASS_${timestamp}: Test passed successfully!");
          } else {
            console.log("TEST_FAIL_${timestamp}: Expected " + (initialCount + 5) + ", got " + newCount);
          }
        } catch (error) {
          console.log("TEST_FAIL_${timestamp}: Error checking result: " + error.message);
        }
      }, 300);
    } catch (error) {
      console.log("TEST_FAIL_${timestamp}: Test error: " + error.message);
    }
  }, 600);
})();
`;

        const currentIndexCode =
          sandpack.files["/index.js"]?.code ||
          `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
`;

        let cleanIndexCode = currentIndexCode
          .replace(/\/\/ Test execution code[\s\S]*?\}\)\(\);/g, "")
          .replace(/\/\/ Cleanup existing tests[\s\S]*?\}/g, "");

        const finalCode =
          cleanIndexCode + "\n\n" + cleanupCode + "\n\n" + testCode;

        setTimeout(() => {
          sandpack.updateFile("/index.js", finalCode);
          console.log("Test code injected and ready to execute");
        }, 100);
      } catch (error) {
        console.error("Test setup error", error);
        onTestResult("fail", "Test setup failed");
      }
    };

    // expose `submit()` method
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
