import test from "ava";
import Application from "./Application.js";
import Entity from "./Entity.js";

test("is in 'all' group", (t) => {
  const app = new Application();
  const entity = new Entity(app);
  app.hideBanner = true;

  t.true(entity.groups.has("all"), "Every entity should be in 'all'");
});

test("can be added to and removed from groups", (t) => {
  const app = new Application();
  const entity = new Entity(app);
  app.hideBanner = true;

  entity.group("cuddly", "whiskers");
  t.true(entity.groups.has("cuddly"), "Should be very cuddly");
  t.true(entity.groups.has("whiskers"), "Should have whiskers");

  entity.ungroup("cuddly", "whiskers");
  t.false(entity.groups.has("cuddly"), "Should not be cuddly :(");
  t.false(entity.groups.has("whiskers"), "Should not have whiskers");
});

test("hasGroups method works", (t) => {
  const app = new Application();
  const entity = new Entity(app);
  app.hideBanner = true;

  entity.group("dog", "horse");

  t.true(
    entity.hasGroups("all", "dog", "horse"),
    "Should be true if entity is in every group provided"
  );
});
