import { drawKmeans } from "./drawKmeans";

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
    s.background(244, 248, 252);
  };

  s.draw = () => {
    // s.circle(s.mouseX, s.mouseY, 100);
  };

  s.doubleClicked = (event) => {
    visuals.forEach((v) => {
      //   console.log(menu);
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
          renderKmeans();
          clearMenu();
        });
      });
    });
  };
};
