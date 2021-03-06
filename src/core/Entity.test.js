import test from "ava";
import { Entity } from "./Entity.js";

// Test Utilities

// Return a mock collection.
const mockCollection = () => ({
  app: {},
  index: () => ({
    set: {
      add: () => {},
      delete: () => {},
    },
  }),
});

// Entity API Tests

test("application instance is available", (t) => {
  const { app } = new Entity(mockCollection());
  t.truthy(app, "Entity should have an `app` property.");
});

// Tags Tests

test("has 'all' tag", (t) => {
  const entity = new Entity(mockCollection());

  t.true(entity.tags.has("all"), "Every entity should be tagged with 'all'.");
});

test("tags can be added and removed", (t) => {
  const entity = new Entity(mockCollection());

  entity.tag("cuddly");
  t.true(entity.tags.has("cuddly"), "Should be very cuddly.");

  entity.untag("cuddly");
  t.false(entity.tags.has("cuddly"), "Should not be cuddly. :(");
});

// Components Tests

test("component attaches and detaches", (t) => {
  const entity = new Entity(mockCollection());

  t.falsy(entity.id, "ID should not exist yet.");

  const component = {
    tag: "id", // tag is used to access the component on the entity.
    init: () => 0, // init returns the initial state for the component.
  };

  entity.attach(component);
  t.is(entity.id, 0, "ID should be present and set to 0.");

  entity.detach(component.tag);
  t.falsy(entity.id, "ID should not exist anymore.");
});

test("component parameters are passed to init", (t) => {
  const entity = new Entity(mockCollection());

  const component = {
    tag: "flavor",
    init: (e, flavor) => flavor,
  };

  entity.attach(component, "lime");
  t.is(entity.flavor, "lime", "Flavor should be set to the passed parameter.");
});

test("component lifecycle initializes and exits", (t) => {
  const entity = new Entity(mockCollection());
  let alive = false;

  const component = {
    tag: "itsAlive",
    // init can also be used for imperative set up/side effects.
    init(e) {
      t.is(e, entity, "Entity instance should be passed in init.");
      alive = true;
      return null;
    },
    // and exit handles the clean up afterwards.
    exit(e) {
      t.is(e, entity, "Entity instance should be passed in exit.");
      alive = false;
    },
  };

  entity.attach(component);
  t.true(alive, "Alive should be set to true as a side effect of attaching.");

  entity.detach(component.tag);
  t.false(alive, "Alive should no longer be true.");
});
