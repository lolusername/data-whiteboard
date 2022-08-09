import { drawKmeans, charts, setCharts, getCharts } from "./drawKmeans";

export const sketch = (s) => {
  let menu = [];
  function clearMenu() {
    menu.forEach((item) => {
      item.remove();
    });
    menu = [];
  }
  const renderKmeans = drawKmeans(s);
  const visuals = ["K-Means Clustering", "Simple Linear Regression", "Test"];
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };
  const colors = [
    s.color("#488f31"),
    s.color("#ff7c43"),
    s.color("#d45087"),
    s.color("ffa600"),
  ];
  colors[-1] = s.color(0, 0, 0);
  s.draw = () => {
    const currentChart = charts[charts.length - 1];
    if (charts.length) {
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

        // @TODO switch between visuals arr
        item.mousePressed(() => {
          s.translate(0, -300);
          renderKmeans();
          clearMenu();
        });
      });
    });
  };
};
