import test from "ava";
import { Application } from "./Application.js";
import { EventEmitter } from "./EventEmitter.js";
import { EntityCollection } from "./EntityCollection.js";
import { SystemManager } from "./SystemManager.js";

// Application API Tests

test("provides the correct interfaces", (t) => {
  const app = new Application({ hideBanner: true });

  t.truthy(app.state, "Should provide a store for global state.");
  t.true(app.event instanceof EventEmitter, "Should provide an event emitter.");
  t.true(
    app.entity instanceof EntityCollection,
    "Should provide an entity collection."
  );
  t.true(
    app.system instanceof SystemManager,
    "Should provide a system manager."
  );
  t.true(typeof app.stop === "function", "Should provide a stop function.");
});

test("instantiates without options", (t) => {
  t.notThrows(() => {
    new Application();
  }, "Should be possible to pass no options object.");
});
