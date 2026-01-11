import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppServicesProvider } from "@synth-video/application";
import { BrowserStorageAdapter, BrowserLoggerAdapter } from "@synth-video/adapters/browser";
import { HomePage } from "./pages/home";

const services = {
  storage: new BrowserStorageAdapter(),
  logger: new BrowserLoggerAdapter(),
};

export function App() {
  return (
    <AppServicesProvider services={services}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppServicesProvider>
  );
}
