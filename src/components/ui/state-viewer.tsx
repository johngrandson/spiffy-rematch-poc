import React from "react";
import { useSelector } from "react-redux";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { selectEntireState } from "@/store/models/root";

/**
 * StateViewer Component
 *
 * This component renders the entire Redux state in a syntax-highlighted code block.
 */
const StateViewer: React.FC = () => {
  /**
   * Select the entire state.
   * It will generate a warning in the console due to displaying the whole state
   */
  const state = useSelector(selectEntireState);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        fontFamily: "monospace",
        overflow: "auto",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>
        Application State
      </h2>
      <SyntaxHighlighter
        language="json"
        style={docco}
        customStyle={{
          textAlign: "left",
          margin: 0,
          padding: "1rem",
        }}
      >
        {JSON.stringify(state, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};

export default StateViewer;
