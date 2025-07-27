// SubmitButton.tsx
"use client";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function SubmitButton() {
  const { sandpack } = useSandpack();

  const handleSubmit = async () => {
    const userFiles = sandpack.files;
    console.log(userFiles);

    // const res = await fetch(`/api/challenge/getChallenge?...`);
    // const data = await res.json();

    // const mergedFiles = {
    //   ...userFiles,
    //   ...data.challenge.tests,
    //   "/vitest.config.ts": `export default { test: { globals: true, environment: 'jsdom' } }`,
    // };

    // sandpack.updateFiles(mergedFiles);
    // sandpack.runSandpack();
  };

  return (
    <div className='flex justify-end p-4'>
      <Button
        onClick={handleSubmit}
        className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-2'>
        <Send className='h-4 w-4 mr-2' />
        Submit Solution
      </Button>
    </div>
  );
}
