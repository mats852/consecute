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

## Usage
### Subscribe and publish simple usage
```ts
import consecute from 'consecute';

const cs = consecute();

const sub = cs.subscribe('interesting-topic', yourFunction);

cs.publish('interesting-topic', your, arguments, here)
  .then((promiseSettledResults) => maybeDoSomethingIfYouLike());

sub.remove(); // deletes this specific subscription

cs.clear(); // clear all topics
```
