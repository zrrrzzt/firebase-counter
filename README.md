[![Build Status](https://travis-ci.org/zrrrzzt/firebase-counter.svg?branch=master)](https://travis-ci.org/zrrrzzt/firebase-counter)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# firebase-counter

[![Greenkeeper badge](https://badges.greenkeeper.io/zrrrzzt/firebase-counter.svg)](https://greenkeeper.io/)
Counter with [firebase](https://firebase.google.com) backend

## Installation

```bash
$ npm i firebase-counter --save
```

## Usage

Add, subtract og lookup values for a specific key in firebase.
- Uses ```value``` as key if no key supplied.
- Defaults to 1 if no value is presented.
- Supports promises and callbacks

```JavaScript
const fbc = require('firebase-counter')
const counterOptions = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  appName: '<your-app-name>',
  authEmail: '<your-auth-email>',
  authPassword: '<your-auth-password>'
}

const counter = fbc(counterOptions)

counter.add({'key': 'fishy', value: 10}).then(data => console.log(data))

counter.subtract({'key': 'fishy', value: 5}).then(data => console.log(data))

counter.lookup({'key': 'fishy'}).then(data => console.log(data))
```

## License
[MIT](LICENSE)

![alt text](https://robots.kebabstudios.party/firebase-counter.png "Robohash image of firebase-counter")