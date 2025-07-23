"use client";
import dynamic from "next/dynamic";
import React from "react";

const CodeEditorWithPreview = dynamic(
  () => import("@/components/code-editor-with-preview"),
  {
    ssr: false,
  },
);
const SinglePlayer = () => {
  return (
    <div>
      <CodeEditorWithPreview />
    </div>
  );
};

export default SinglePlayer;
