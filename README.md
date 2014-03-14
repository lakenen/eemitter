# eemitter

Simple custom event emitter.


## install

```
npm install eemitter
```


## usage

Basic usage:
```js
var EventEmitter = require('eemitter');
var ee = new EventEmitter();

ee.on('message', function (event) {
    console.log(event.data);
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
    this.emit('say', this.name);
};

var cameron = new Person('Cameron');
cameron.on('say', function (event) {
    console.log(event.data);
})
cameron.sayName();
// Cameron

```


## License

([The MIT License](LICENSE))

Copyright 2014 Cameron Lakenen
