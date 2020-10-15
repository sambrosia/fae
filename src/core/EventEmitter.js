// A small event emitter class which implements a subset of the Node API of the
// same name
export default class EventEmitter {
  constructor() {
    // ## Properties
    // *(read-only)*

    // A Map where the keys are event names and the values are Maps of
    // listener/context pairs
    this.events = new Map();
  }

  // ## Methods

  // Register the given event listener
  addListener(event, listener, context) {
    let listeners = this.events.get(event);

    // Create a new Map to hold the event's listeners, if it doesn't exist yet
    if (!listeners) {
      listeners = new Map();
      this.events.set(event, listeners);
    }

    // Add the listener to the Map, paired with its intended `this` context
    listeners.set(listener, context);

    return this;
  }

  // Unregister the given event listener
  removeListener(event, listener) {
    const listeners = this.events.get(event);
    if (!listeners) return;

    listeners.delete(listener);

    // Also delete the entry for the event if it has no more registered listeners
    if (listeners.size === 0) this.events.delete(event);

    return this;
  }

  // Call all listeners for the event in order of registration,
  // passing the given arguments
  emit(event, ...args) {
    const listeners = this.events.get(event);
    if (!listeners) return;

    listeners.forEach((context, listener) => {
      listener.apply(context, args);
    });
  }
}