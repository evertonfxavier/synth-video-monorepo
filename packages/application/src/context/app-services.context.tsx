import { createContext, useContext, type ReactNode } from "react";
import type { StorageService, LoggerService } from "@synth-video/ports";

export interface AppServices {
  storage: StorageService;
  logger: LoggerService;
}

const AppServicesContext = createContext<AppServices | null>(null);

export interface AppServicesProviderProps {
  children: ReactNode;
  services: AppServices;
}

export function AppServicesProvider({ children, services }: AppServicesProviderProps) {
  return (
    <AppServicesContext.Provider value={services}>
      {children}
    </AppServicesContext.Provider>
  );
}

export function useAppServices(): AppServices {
  const context = useContext(AppServicesContext);
  if (!context) {
    throw new Error("useAppServices must be used within an AppServicesProvider");
  }
  return context;
}

export function useStorage(): StorageService {
  return useAppServices().storage;
}

export function useLogger(): LoggerService {
  return useAppServices().logger;
}
