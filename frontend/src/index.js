import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import App from "./App";
import { AuthProvider } from "./providers/auth";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </AuthProvider>
);
