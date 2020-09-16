import getTime from "../utils/getTime.js";

// Default game loop used if you do not provide a custom `startGame` function to
// the `Application` constructor
export default function defaultLoop(app) {
  let lastTime = getTime();
  let currentTime, dt;

  function gameLoop() {
    // Calculate frame delta time in seconds
    currentTime = getTime();
    dt = currentTime - lastTime;
    lastTime = currentTime;

    app.event.emit("update", dt);
    app.event.emit("draw");
  }

  // Function to start looping using requestAnimationFrame
  function rafLoop() {
    gameLoop();
    requestAnimationFrame(rafLoop);
  }

  // Use requestAnimationFrame if available, otherwise use setInterval
  // In either case, wait a frame before beginning
  if (globalThis.requestAnimationFrame) requestAnimationFrame(rafLoop);
  else setInterval(gameLoop, 1000 / 60);
}
