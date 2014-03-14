var EventEmitter = require('../index.js'),
    test = require('tape');


test('emit() should call the registered event handler for the event when called with an event', function(t) {
    var ee = new EventEmitter();
    t.plan(1);
    ee.on('myevent', function () {
        t.pass('handler was called');
    });
    ee.emit('myevent');
});

test('emit() should call all registered event handlers for the event when called with an event', function(t) {
    var ee = new EventEmitter();
    t.plan(2);
    ee.on('myevent', function () {
        t.pass('handler1 was called');
    });
    ee.on('myevent', function () {
        t.pass('handler2 was called');
    });
    ee.emit('myevent');
});

test('emit() should only call the event handlers registered for the event when called with an event', function(t) {
    var ee = new EventEmitter();
    t.plan(1);
    ee.on('myevent', function () {
        t.pass('handler1 was called');
    });
    ee.on('notmyevent', function () {
        t.fail('handler2 was called');
    });
    ee.emit('myevent');
});

test('emit() should call the event handler with an event object for event when called with an event object', function(t) {
    var ee = new EventEmitter(),
        data = {
            one: 'two',
            three: ['four', 'five']
        };
    t.plan(2);
    ee.on('myevent', function (event) {
        t.pass('handler was called');
        t.same(event.data, data);
    });
    ee.emit('myevent', data);
});

test('emit() should call the event handler even after another event handler for the same type removes itself', function(t) {
    var ee = new EventEmitter(),
        handler1 = function () {
            // this handler removes itself
            this.off('myevent', handler1);
        },
        handler2 = function () {
            t.pass('handler2 was called');
        };

    t.plan(1);
    ee.on('myevent', handler1);
    ee.on('myevent', handler2);

    ee.emit('myevent');
});

test('off() should remove an event handler when called for that event type and handler', function(t) {
    var ee = new EventEmitter();
    var handler = function () {
        t.fail('handler was called');
    };

    t.plan(1);
    ee.on('myevent', handler);
    ee.off('myevent', handler);
    ee.emit('myevent');
    t.pass('yay');
});

test('off() should remove all event handlers of a given type when called for that event type with no handler', function(t) {
    var ee = new EventEmitter();
    var handler = function () {
        t.fail('handler was called');
    };

    t.plan(1);
    ee.on('myevent', handler);
    ee.on('myevent', handler);
    ee.off('myevent');
    ee.emit('myevent');
    t.pass('yay');
});
