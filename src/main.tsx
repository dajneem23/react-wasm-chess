import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./global.css";

import "../node_modules/chessground/assets/chessground.base.css";
import "../node_modules/chessground/assets/chessground.brown.css";
import "../node_modules/chessground/assets/chessground.cburnett.css";

import init from "./wasm/pkg/wasm";

const root = ReactDOM.createRoot(document.getElementById("root")!);
(async () => {
  await init();

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
