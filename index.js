function EventEmitter() {}

EventEmitter.prototype.addEventListener = function (type, handler) {
    var handlers;
    if (typeof this._eventHandlers === 'undefined') {
        this._eventHandlers = {};
    }
    handlers = this._eventHandlers[type] || (this._eventHandlers[type] = []);
    handlers.push(handler);
};
EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;

EventEmitter.prototype.removeEventListener = function (type, handler) {
    var handlers, i, len;
    if (typeof this._eventHandlers === 'undefined') {
        return;
    }
    if (typeof type === 'undefined') {
        this._eventHandlers = {};
        return;
    }
    handlers = this._eventHandlers[type];
    if (Array.isArray(handlers)) {
        if (typeof handler === 'undefined') {
            handlers.length = 0;
            return;
        }
        for (i = 0, len = handlers.length; i < len; ++i) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
                return;
            }
        }
    }
};
EventEmitter.prototype.off = EventEmitter.prototype.removeEventListener;

EventEmitter.prototype.dispatchEvent = function (type) {
    var handlers, i, len, args;
    if (typeof this._eventHandlers === 'undefined') {
        return;
    }
    handlers = this._eventHandlers[type];
    if (Array.isArray(handlers)) {
        // if an event handler removes itself, it would alter the
        // array as we loop, so create a copy
        handlers = handlers.concat();
        args = [].slice.call(arguments, 1);
        for (i = 0, len = handlers.length; i < len; ++i) {
            if (typeof handlers[i] === 'function') {
                handlers[i].apply(this, args);
            }
        }
    }
};
EventEmitter.prototype.emit = EventEmitter.prototype.dispatchEvent;

EventEmitter.prototype.one = function (type, handler) {
    this.on(type, function _handler() {
        handler.apply(this, arguments);
        this.off(type, _handler);
    });
};

module.exports = EventEmitter;
