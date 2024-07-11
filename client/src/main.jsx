import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";

// Create a root element using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app using root.render instead of ReactDOM.render
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
