/* eslint-disable @typescript-eslint/no-non-null-assertion */

function consecute<TEventMap extends EventMapBase = EventMapBase>(): Actions<TEventMap> {
  const topics: Partial<Topics<TEventMap>> = {};

  return {
    subscribe: (topic, hook) => {
      if (!topics.hasOwnProperty.call(topics, topic)) topics[topic] = [];

      const index = topics[topic]!.push(hook) - 1;

      return {
        remove: () => delete topics?.[topic]?.[index],
      };
    },
    publish: (topic, ...args) => new Promise((resolve) => {
      if (!topics.hasOwnProperty.call(topics, topic)) return resolve([]);

      return Promise.allSettled(topics[topic]!.map((hook) => hook(...args)))
        .then((result) => resolve(result));
    }),
    clear: () => {
      Object.keys(topics).forEach((key) => delete topics[key]);
    },
  };
}

const instance = consecute();

export {
  instance as default,
  consecute,
};
