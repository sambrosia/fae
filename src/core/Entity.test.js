import test from "ava";
import { Entity } from "./Entity.js";

function createEntity() {
  const mockCollection = {
    index: () => ({
      set: {
        add: () => {},
        delete: () => {},
      },
    }),
  };

  return new Entity(mockCollection);
}

// Components API tests
test("component attaches and detaches", (t) => {
  const entity = createEntity();

  t.falsy(entity.id, "ID field should not exist yet.");

  const component = {
    key: "id", // key is used to access the component on the entity.
    init: () => 0, // init returns the initial state for the component.
  };

  entity.attach(component);
  t.is(entity.id, 0, "ID should be present and set to 0.");

  entity.detach(component.key);
  t.falsy(entity.id, "ID should not exist anymore.");
});

test("component lifecycle initializes and exits", (t) => {
  const entity = createEntity();
  let alive = false;

  const component = {
    key: "itsAlive",
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

  entity.detach(component.key);
  t.false(alive, "Alive should no longer be true.");
});

test("component parameters are passed to init", (t) => {
  const entity = createEntity();

  const component = {
    key: "flavor",
    init: (e, flavor) => flavor,
  };

  entity.attach(component, "lime");
  t.is(entity.flavor, "lime", "Flavor should be set to the passed parameter.");
});

// Tags API tests
test("has 'all' tag", (t) => {
  const entity = createEntity();

  t.true(entity.tags.has("all"), "Every entity should be tagged with 'all'.");
});

test("tags can be added and removed", (t) => {
  const entity = createEntity();

  entity.tag("cuddly");
  t.true(entity.tags.has("cuddly"), "Should be very cuddly.");

  entity.untag("cuddly");
  t.false(entity.tags.has("cuddly"), "Should not be cuddly. :(");
});
