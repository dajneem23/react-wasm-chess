import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./global.css";

import init, { greet } from "./wasm/pkg/wasm";
init().then(() => {
  console.log(greet("World"));
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Setup MSW mock server in development
if (process.env.NODE_ENV === "development") {
  // Certify MSW's Service Worker is available before start React app.
  import("../mocks/browser")
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
