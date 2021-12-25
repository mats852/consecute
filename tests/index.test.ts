import consecute from '../src/index';

describe('given simple synchronous events', () => {
  describe('when the event is subscribed but nothing is published', () => {
    test('then the hook is not run', () => {
      const cs = consecute();
      let flag = false;

      cs.subscribe('bingo', () => { flag = true; });

      expect(flag).toBe(false);
    });
  });
  describe('when the event is subscribed and published', () => {
    test('then the hook is run', () => {
      expect.assertions(2);

      const cs = consecute();

      const flags = Array.from({ length: 10 }).map(() => Math.random().toString(36).slice(2));
      const results = [];

      flags.forEach((flag) => cs.subscribe('bingo', () => results.push(flag)));

      cs.publish('bingo')
        .then((res: Array<PromiseSettledResult<unknown>>) => {
          expect(results).toStrictEqual(flags);
          expect(res.filter((settlement: PromiseSettledResult<unknown>) => settlement.status === 'fulfilled').length).toBe(10);
        })
        .catch(() => expect(false).toBe(true));
    });
  });
});

describe('given asynchronous events', () => {
  describe('when the event is subscribed and published', () => {
    test('then the hook is run asynchronously and awaits all promises', () => {
      expect.assertions(2);

      const cs = consecute();
      const flags = [false, false, false];

      const hook = (idx: number) => new Promise((r) => setTimeout(() => { flags[idx] = true; r(true); }, 50 * (idx + 1)));

      cs.subscribe('bingo', hook);
      const promises = Promise.all([
        cs.publish('bingo', 0),
        cs.publish('bingo', 1),
        cs.publish('bingo', 2),
      ]);

      expect(flags).toStrictEqual([false, false, false]);
      return promises.then(() => expect(flags).toStrictEqual([true, true, true]));
    });
  });
});
