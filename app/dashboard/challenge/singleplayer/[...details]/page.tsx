"use client";
import dynamic from "next/dynamic";
import React from "react";
import { use } from "react";
const CodeEditorWithPreview = dynamic(
  () => import("@/components/code-editor-with-preview"),
  {
    ssr: false,
  },
);
const SinglePlayer = ({ params }: { params: Promise<{ details: string }> }) => {
  const { details } = use(params);
  console.log(details);

  return (
    <div className='flex min-h-screen flex-col items-center justify-start p-24 bg-gray-950'>
      <CodeEditorWithPreview
        difficulty={details[0]}
        time={details[1]}
        language={details[2]}
      />
    </div>
  );
};

export default SinglePlayer;
