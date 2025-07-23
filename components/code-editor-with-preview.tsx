"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";

export default function CodeEditorWithPreview() {
  return (
    <Sandpack
      template='react'
      theme={dracula}
      options={{
        showConsole: true,
        showTabs: true,
        editorHeight: 400,
        autorun: true,
        recompileMode: "delayed",
        recompileDelay: 300,
      }}
      files={{
        "/App.js": {
          code: `export default function App() {
  return <h1>Hello from App.js!</h1>;
}`,
        },
        "/index.js": {
          code: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
console.log("Hello from index.js!");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`,
        },
      }}
    />
  );
}
