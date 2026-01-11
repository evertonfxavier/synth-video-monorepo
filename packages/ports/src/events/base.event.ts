export interface DomainEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: Date;
  aggregateId?: string;
}

export interface EventBus {
  publish<T>(event: DomainEvent<T>): Promise<void>;
  subscribe<T>(eventType: string, handler: (event: DomainEvent<T>) => Promise<void>): void;
  unsubscribe(eventType: string): void;
}

export interface EventStore {
  append<T>(event: DomainEvent<T>): Promise<void>;
  getEvents(aggregateId: string): Promise<DomainEvent[]>;
  getAllEvents(): Promise<DomainEvent[]>;
}
