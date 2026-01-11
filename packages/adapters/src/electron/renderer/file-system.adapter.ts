import { ok, err, type Result } from "@synth-video/core";
import type {
  FileSystemService,
  StorageService,
  LoggerService,
} from "@synth-video/ports";

// Note: This adapter is meant to be used in Electron's main process
// or via IPC from the renderer process

export class ElectronFileSystemAdapter implements FileSystemService {
  constructor(
    private readonly fs: typeof import("fs/promises"),
    public readonly path: typeof import("path")
  ) {}

  async readFile(filePath: string): Promise<Result<Buffer>> {
    try {
      const data = await this.fs.readFile(filePath);
      return ok(Buffer.from(data));
    } catch (error) {
      return err(error as Error);
    }
  }

  async writeFile(filePath: string, data: Buffer): Promise<Result<void>> {
    try {
      await this.fs.writeFile(filePath, data);
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async deleteFile(filePath: string): Promise<Result<void>> {
    try {
      await this.fs.unlink(filePath);
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      await this.fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async listDirectory(dirPath: string): Promise<Result<string[]>> {
    try {
      const files = await this.fs.readdir(dirPath);
      return ok(files);
    } catch (error) {
      return err(error as Error);
    }
  }
}

export class ElectronStorageAdapter implements StorageService {
  private store: Map<string, unknown> = new Map();

  constructor(
    private readonly fs: typeof import("fs/promises"),
    private readonly storagePath: string
  ) {
    this.loadFromDisk();
  }

  private async loadFromDisk(): Promise<void> {
    try {
      const data = await this.fs.readFile(this.storagePath, "utf-8");
      const parsed = JSON.parse(data);
      this.store = new Map(Object.entries(parsed));
    } catch {
      // File doesn't exist or is invalid, start with empty store
    }
  }

  private async saveToDisk(): Promise<void> {
    const data = Object.fromEntries(this.store);
    await this.fs.writeFile(this.storagePath, JSON.stringify(data, null, 2));
  }

  async get<T>(key: string): Promise<Result<T | null>> {
    try {
      const value = this.store.get(key) as T | undefined;
      return ok(value ?? null);
    } catch (error) {
      return err(error as Error);
    }
  }

  async set<T>(key: string, value: T): Promise<Result<void>> {
    try {
      this.store.set(key, value);
      await this.saveToDisk();
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async delete(key: string): Promise<Result<void>> {
    try {
      this.store.delete(key);
      await this.saveToDisk();
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }

  async clear(): Promise<Result<void>> {
    try {
      this.store.clear();
      await this.saveToDisk();
      return ok(undefined);
    } catch (error) {
      return err(error as Error);
    }
  }
}

export class ElectronLoggerAdapter implements LoggerService {
  constructor(private readonly prefix: string = "[SynthVideo]") {}

  debug(message: string, context?: Record<string, unknown>): void {
    console.debug(`${this.prefix} [DEBUG] ${message}`, context ?? "");
  }

  info(message: string, context?: Record<string, unknown>): void {
    console.info(`${this.prefix} [INFO] ${message}`, context ?? "");
  }

  warn(message: string, context?: Record<string, unknown>): void {
    console.warn(`${this.prefix} [WARN] ${message}`, context ?? "");
  }

  error(
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ): void {
    console.error(`${this.prefix} [ERROR] ${message}`, error, context ?? "");
  }
}
