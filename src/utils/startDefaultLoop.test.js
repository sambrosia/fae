import test from "ava";
import util from "util";
import { EventEmitter } from "../core/EventEmitter.js";
import { startDefaultLoop } from "./startDefaultLoop.js";

const promiseTimeout = util.promisify(setTimeout);

test("emits proper events", async (t) => {
  const app = { event: new EventEmitter() };
  startDefaultLoop(app);

  let expected = 0;
  let updates = 0;
  let draws = 0;

  app.event.addListener("update", () => {
    t.is(updates, expected, "Number of updates should match what we expect.");
    updates++;
  });
  app.event.addListener("draw", () => {
    t.is(draws, expected, "Number of draws should match what we expect.");
    draws++;
    expected++;
  });

  await promiseTimeout(200);
  t.not(updates, 0, "Updates should have occurred.");
  t.not(draws, 0, "Draws should have occurred.");
});

test("returns a function that terminates the loop", async (t) => {
  const app = { event: new EventEmitter() };
  let stopped = false;

  const stopLoop = startDefaultLoop(app);

  app.event.addListener("update", () => {
    if (stopped) t.fail("Should not emit any updates while stopped.");
  });

  stopLoop();
  stopped = true;

  await promiseTimeout(200);
  t.pass();
});
