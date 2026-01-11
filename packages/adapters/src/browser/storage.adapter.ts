import { ok, err, type Result } from "@synth-video/core";
import type { StorageService, LoggerService } from "@synth-video/ports";

export class BrowserStorageAdapter implements StorageService {
  constructor(private readonly storage: Storage = localStorage) {}

  async get<T>(key: string): Promise<Result<T | null>> {
    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return ok(null);
      }
      return ok(JSON.parse(item) as T);
    } catch (error) {
      return err(error as Error);
    }
  }

  async set<T>(key: string, value: T): Promise<Result<void>> {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async delete(key: string): Promise<Result<void>> {
    try {
      this.storage.removeItem(key);
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async clear(): Promise<Result<void>> {
    try {
      this.storage.clear();
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }
}

export class BrowserLoggerAdapter implements LoggerService {
  constructor(private readonly prefix: string = "[SynthVideo]") {}

  debug(message: string, context?: Record<string, unknown>): void {
    console.debug(`${this.prefix} ${message}`, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    console.info(`${this.prefix} ${message}`, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    console.warn(`${this.prefix} ${message}`, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    console.error(`${this.prefix} ${message}`, error, context);
  }
}
