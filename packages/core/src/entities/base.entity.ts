export interface Entity<T> {
  id: string;
  equals(entity: Entity<T>): boolean;
}

export abstract class BaseEntity<T> implements Entity<T> {
  constructor(public readonly id: string) {}

  equals(entity: Entity<T>): boolean {
    return this.id === entity.id;
  }
}
