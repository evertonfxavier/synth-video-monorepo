import type { Result } from "@synth-video/core";

export interface FileSystemService {
  readFile(path: string): Promise<Result<Buffer>>;
  writeFile(path: string, data: Buffer): Promise<Result<void>>;
  deleteFile(path: string): Promise<Result<void>>;
  exists(path: string): Promise<boolean>;
  listDirectory(path: string): Promise<Result<string[]>>;
}

export interface StorageService {
  get<T>(key: string): Promise<Result<T | null>>;
  set<T>(key: string, value: T): Promise<Result<void>>;
  delete(key: string): Promise<Result<void>>;
  clear(): Promise<Result<void>>;
}

export interface LoggerService {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, error?: Error, context?: Record<string, unknown>): void;
}
