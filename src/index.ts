export default function consecute(): Actions {
  const topics: Topics = {};

  return {
    subscribe: (topic: string, hook: Hook) => {
      if (!topics.hasOwnProperty.call(topics, topic)) topics[topic] = [];

      const index = topics[topic].push(hook) - 1;

      return {
        remove: () => delete topics[topic][index],
      };
    },
    publish: (topic: string, ...args: Parameters<Hook>) => new Promise((resolve, reject) => {
      if (!topics.hasOwnProperty.call(topics, topic)) reject();

      return Promise.allSettled(topics[topic].map((hook) => hook(...args)))
        .then((result) => resolve(result));
    }),
  };
}
