import { DrawClusters } from "./drawKmeans";
import { charts, size } from "../store/charts";
import { get } from "svelte/store";
const sketch = (s) => {
  let menu = [];
  function clearMenu() {
    menu.forEach((item) => {
      item.remove();
    });
    menu = [];
  }
  const renderKmeans = DrawClusters(s);
  const visuals = ["K-Means Clustering", "DBSCAN", "Simple Linear Regression"];
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  //possible cluster colors
  const colors = [
    s.color("#488f31"),
    s.color("#ff7c43"),
    s.color("#d45087"),
    s.color("#ffa600"),
    s.color(111, 1111, 111),
  ];

  // setting black to -1 for clicking a data point
  colors[-1] = s.color(0, 0, 0);
  s.draw = () => {
    // ?: this flow works for adding new kmeans charts after another
    // HOWEVER, I want to be able to select the chart by clicking on the area it overs, any ideas?
    const currentChart = get(charts)[get(charts).length - 1];
    if (get(charts).length) {
      currentChart.forEach((point) => {
        s.fill(s.color(colors[point["centroid"]]));
        s.circle(point[0], point[1], 8);
      });
    }
  };

  s.doubleClicked = (event) => {
    visuals.forEach((v) => {
      let btn = s.createButton(v);

      btn.addClass(
        "bg-stone-800 text-white px-3 py-2 rounded-2xl border border-sky-600  hover:bg-sky-600"
      );
      menu.push(btn);

      if (menu.length >= 4) {
        menu = menu.slice(0, 3);
      }
      menu.forEach((item, i) => {
        item.position(s.mouseX, s.mouseY + item.size().height * 1.2 * i);

        item.mousePressed(() => {
          // ?: i feel like tthis is bad way to do this, should I set the function when defining the visualizatons iterable like:
          // [{model:'K-Means Clustering',onMousePressed:someFunction}]
          if (item.elt.innerText === "K-Means Clustering") {
            s.translate(0, -get(size));
            renderKmeans();
          }
          clearMenu();
          console.log(item);
        });
      });
    });
  };
};
export { sketch };
