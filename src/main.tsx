import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./global.css";

// for webAssembly
import wasm from "./wasm/pkg/wasm";

const root = ReactDOM.createRoot(document.getElementById("root")!);
(async () => {
  await wasm();

  // Setup MSW mock server in development
  if (process.env.NODE_ENV === "development") {
    // Certify MSW's Service Worker is available before start React app.
    await import("../mocks/browser")
      .then(({ worker }) => {
        return worker.start();
      }) // Run <App /> when Service Worker is ready to intercept requests.
      .then(() => {
        root.render(<App />);
      });
    // Never setup MSW mock server in production
  } else if (process.env.NODE_ENV === "production") {
    root.render(<App />);
  }
})();
