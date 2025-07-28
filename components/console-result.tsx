"use client";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useEffect } from "react";

export function ConsoleResultListener({
  onResult,
}: {
  onResult: (status: "pass" | "fail", message?: string) => void;
}) {
  const { listen } = useSandpack();

  useEffect(() => {
    const unsubscribe = listen((msg) => {
      if (msg.type === "console" && Array.isArray(msg.log)) {
        for (const logEntry of msg.log) {
          const str = logEntry.data.join(" ");

          if (str.includes("TEST_PASS")) {
            const message = str.replace(/TEST_PASS[_\d:]*\s?/, "").trim(); // ✅ removes TEST_PASS_1234:

            onResult("pass", message || "Test passed!");
            break;
          }

          if (str.includes("TEST_FAIL")) {
            const message = str.replace(/TEST_FAIL[_\d:]*\s?/, "").trim();

            onResult("fail", message || "Test failed");
            break;
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [listen, onResult]);

  return null;
}
