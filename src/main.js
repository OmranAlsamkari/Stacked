import Engine from "./classes/Engine.js";

const engine = new Engine();

await engine.initialize();

engine.run();
