import type { UseCase } from "@synth-video/core";

export class ServiceOrchestrator {
  private useCases: Map<string, UseCase<unknown, unknown>> = new Map();

  register<TInput, TOutput>(name: string, useCase: UseCase<TInput, TOutput>): void {
    this.useCases.set(name, useCase as UseCase<unknown, unknown>);
  }

  async execute<TInput, TOutput>(name: string, input: TInput): Promise<TOutput> {
    const useCase = this.useCases.get(name) as UseCase<TInput, TOutput> | undefined;
    if (!useCase) {
      throw new Error(`Use case "${name}" not found`);
    }
    return useCase.execute(input);
  }

  has(name: string): boolean {
    return this.useCases.has(name);
  }
}
