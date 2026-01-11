import { HashRouter, Routes, Route } from "react-router-dom";
import { AppServicesProvider } from "@synth-video/application";
import { BrowserStorageAdapter, BrowserLoggerAdapter } from "@synth-video/adapters/browser";
import { HomePage } from "./pages/home";

const services = {
  storage: new BrowserStorageAdapter(),
  logger: new BrowserLoggerAdapter("[Desktop]"),
};

export function App() {
  return (
    <AppServicesProvider services={services}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </AppServicesProvider>
  );
}
