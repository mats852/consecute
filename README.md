# consecute
Handle any Javascript and Typescript function using pub/sub.

[![consecute](https://img.shields.io/npm/v/consecute.svg)](https://www.npmjs.com/package/consecute)
[![Github licence](https://img.shields.io/github/license/mats852/consecute)](https://img.shields.io/github/license/mats852/consecute)
[![CI](https://github.com/mats852/consecute/actions/workflows/main.yml/badge.svg)](https://github.com/mats852/consecute/actions/workflows/main.yml)

> Special thanks to David Walsh ([@darkwing](https://github.com/darkwing)) for [the inspiration](https://davidwalsh.name/pubsub-javascript)!

## Installation

```shell
npm i consecute 
```

## Getting started
Import the globally available instance
```ts
import cs from 'consecute'; // Globally available instance
```

Or instanciate your own instance
```ts
import { consecute } from 'consecute';
const cs = consecute();
```

## Usage
### Subscribe and publish simple usage
```ts
const sub = cs.subscribe('interesting-topic', yourFunction);

cs.publish('interesting-topic', your, arguments, here)
  .then((promiseSettledResults) => maybeDoSomethingIfYouLike());

sub.remove(); // deletes this specific subscription

cs.clear(); // clear all topics
```

### Typescript safety

You can merge the `EventMapBase` declaration to specify your hook types.

```ts
interface EventMapBase {
  bingo: [string, number];
}

cs.subscribe('bingo', (a, b) => {
//                     ^^^^ These have the type `string`, `number`
});
```

You can also extend the `EventMapBase` for your separate instances.

```ts
interface MyEventMap extends EventMapBase {
  binga: number;
  bingo: { a: number, b: string };
  bingu: [string, number, boolean];
}

const customInstance = consecute<MyEventMap>();

customInstance.subscribe('binga', (event) => {
//                                 ^^^^^ This has the type `number`
});

customInstance.subscribe('bingo', (event) => {
//                                 ^^^^^ This has the type `{ a: number, b: string }`
});

customInstance.subscribe('bingu', (one, two, three) => {
//                                 ^^^^^^^^^^^^^^^ These have the type `string`, `number` and `boolean` respectively
});
```

In the case where you would want to send an array as a standalone argument (not spread), you would do this

```ts
interface MyEventMap extends EventMapBase {
  bingy: [Array<string>];
}

const customInstance = consecute<MyEventMap>();

customInstance.subscribe('bingy', (event) => {
//                                 ^^^^^ This has the type `Array<string>`
});
```
