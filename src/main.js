import App from "./App.svelte";

import "./app.css";
import p5 from "p5";

import { sketch } from "./visualizations";

const app = new App({
  target: document.getElementById("app"),
});

let instance = new p5(sketch, "whiteboard");
export default app;
