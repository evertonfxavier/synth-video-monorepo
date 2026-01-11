export interface ValueObject<T> {
  value: T;
  equals(vo: ValueObject<T>): boolean;
}

export abstract class BaseValueObject<T> implements ValueObject<T> {
  constructor(public readonly value: T) {}

  equals(vo: ValueObject<T>): boolean {
    return JSON.stringify(this.value) === JSON.stringify(vo.value);
  }
}
