import { size } from "../store/charts.js";
import { get } from "svelte/store";
import Papa from "papaparse";

// chart ticks and axes, reusable
function drawTickAxes(s) {
  s.translate(0, get(size));
  s.line(s.mouseX, s.mouseY, s.mouseX, s.mouseY + get(size));
  s.translate(0, get(size));
  s.line(s.mouseX, s.mouseY, s.mouseX + get(size), s.mouseY);
  s.translate(s.mouseX, s.mouseY);
  //tickmarks
  for (var i = 0; i <= get(size); i += 30) {
    if (i % 2 == 0) {
      s.line(0, i / 20, -0.2, i / 20);
      s.line(-i / 20, +0, -i / 20, -0.2);
    }
    s.line(+3, -i, -3, -i);
    s.line(i, +3, i, -3);
    if (i) {
      s.strokeWeight(0);
      s.fill("black");
      s.textAlign(s.CENTER, s.CENTER);
      s.text(i / 3, i, get(size) / 12);
      s.textAlign(s.RIGHT, s.CENTER);
      s.text(i / 3, -get(size) / 12, -i);
      s.strokeWeight(1);
    }
    //end tickmarks
  }
}

const processCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
export { drawTickAxes, processCSVFile };
