# eemitter

Simple custom event emitter.

[![Build Status](https://travis-ci.org/lakenen/eemitter.png?branch=master)](https://travis-ci.org/lakenen/eemitter)


## install

```
npm install eemitter
```


## usage

Basic usage:
```js
var EventEmitter = require('eemitter');
var ee = new EventEmitter();

ee.on('message', function (msg) {
    console.log(msg);
});

ee.emit('message', 'hello, world!');
// hello, world!
ee.off('message');
```

As a mixin:
```js
var EventEmitter = require('eemitter');

function Person(name) {
    this.name = name;
}
Person.prototype = new EventEmitter();
Person.prototype.constructor = Person;
// you can also do Person.prototype = Object.create(EventEmitter.prototype);

Person.prototype.sayName = function () {
    this.emit('talk', this.name);
};

var cameron = new Person('Cameron');
cameron.on('talk', function (msg) {
    console.log(msg);
})
cameron.sayName();
// Cameron

```

Bind an event handler for one message:
```js
var ee = new EventEmitter();
ee.one('myevent', function () {
    console.log('should only be called once')
});
ee.emit('myevent');
ee.emit('myevent'); // nothing
```

Remove all handlers:
```js
var ee = new EventEmitter();
ee.on('myevent1', function () {
    console.log('should not be called')
});
ee.on('myevent2', function () {
    console.log('should not be called')
});
ee.off();
ee.emit('myevent1'); // nothing
ee.emit('myevent2'); // nothing
```

## License

([The MIT License](LICENSE))

Copyright 2014 Cameron Lakenen
