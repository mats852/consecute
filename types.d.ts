/* eslint-disable */

type EventMapBase = Record<string, any>;

type Topics<TEventMap extends EventMapBase> = { [key in keyof TEventMap]: Array<Hook<TEventMap[key]>> };
  
type Hook<TArgs> = (...args: TArgs extends Array<unknown> ? TArgs : [TArgs]) => any;

interface Actions<TEventMap extends EventMapBase> {
  clear(): void;
  subscribe<TName extends keyof TEventMap>(topic: TName, hook: Hook<TEventMap[TName]>): {
    remove(): void,
  },
  publish<TName extends keyof TEventMap>(topic: TName, ...args: Parameters<Hook<TEventMap[TName]>>): Promise<void>,
}

declare module 'consecute' {
  export type EventMapBase = Record<string, any>;

  const instance: Actions<EventMapBase>;

  export default instance;
  export function consecute<TEventMap extends EventMapBase = EventMapBase>(): Actions<TEventMap>;
}
