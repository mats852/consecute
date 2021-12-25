/* eslint-disable */

interface Topics {
  [key: string]: Array<Hook>,
}

type Hook = (...args: any) => any;

interface Actions {
  subscribe: (topic: string, hook: Hook) => {
    remove: () => void,
  },
  publish: (topic: string, ...args: Parameters<Hook>) => void,
}

declare module 'consecute' {
  export default function consecute(): Actions;
}
