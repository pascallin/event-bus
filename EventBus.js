class EventBus {
    constructor() {
      this._listeners = Object.create(null);
    }
  
    on(eventName, listener) {
      let eventListeners = this._listeners[eventName];
      if (!eventListeners) {
        eventListeners = [];
        this._listeners[eventName] = eventListeners;
      }
      eventListeners.push(listener);
    }
  
    off(eventName, listener) {
      let eventListeners = this._listeners[eventName];
      let i;
      if (!eventListeners || ((i = eventListeners.indexOf(listener)) < 0)) {
        return;
      }
      eventListeners.splice(i, 1);
    }
  
    dispatch(eventName) {
      let eventListeners = this._listeners[eventName];
      if (!eventListeners || eventListeners.length === 0) {
        return;
      }
      // Passing all arguments after the eventName to the listeners.
      let args = Array.prototype.slice.call(arguments, 1);
      // Making copy of the listeners array in case if it will be modified
      // during dispatch.
      eventListeners.slice(0).forEach(function (listener) {
        listener.apply(null, args);
      });
    }
  }

export default EventBus;