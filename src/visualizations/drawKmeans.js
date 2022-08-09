import ml5 from "ml5";

let pointCoordinates = [];
let pointClustered = [];
let charts = [];
const radius = 8;
const size = 300;

function setCharts(newValue) {
  charts = newValue;
}
function getCharts() {
  return charts;
}
function drawTickAxes(s) {
  s.translate(0, size);
  s.line(s.mouseX, s.mouseY, s.mouseX, s.mouseY + size);
  s.translate(0, size);
  s.line(s.mouseX, s.mouseY, s.mouseX + size, s.mouseY);
  s.translate(s.mouseX, s.mouseY);
  //tickmarks
  for (var i = 0; i <= size; i += 30) {
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
      s.text(i / 3, i, size / 12);
      s.textAlign(s.RIGHT, s.CENTER);
      s.text(i / 3, -size / 12, -i);
      s.strokeWeight(1);
    }
  }
}

function drawCluster(s) {
  const deltaX = s.floor(s.random(0, size));
  const deltaY = s.floor(s.random(0, size));
  const count = s.floor(s.random(7, 12));
  let distribution = [...new Array(count)].map(() => {
    return [s.randomGaussian(3, 15), s.randomGaussian(3, 15)];
  });
  for (let i = 0; i < distribution.length; i++) {
    s.stroke(0);
    let distX = distribution[i][0] + deltaX + s.mouseX;
    let distY = distribution[i][1] + deltaY + s.mouseY;
    pointCoordinates.push({
      distX,
      distY,
      color: s.color(0, 255, 255),
      active: false,
    });
  }

  const options = {
    k: 3,
    maxIter: 4,
    threshold: 0.5,
  };

  const clustering = ml5.kmeans(
    pointCoordinates.map((point) => {
      return { x: point.distX, y: point.distY };
    }),
    options,
    onCluster
  );
  function onCluster() {
    clustering.dataset.forEach((point) => {
      point.prevCentroid = point.centroid;
      pointClustered.push(point);
    });
    console.log(pointClustered);
  }
}

function drawKmeans(s) {
  s.mousePressed = () => {
    const currentChart = charts[charts.length - 1];
    if (charts.length) {
      for (let i = 0; i < currentChart.length; i++) {
        let point = currentChart[i],
          distance = s.dist(s.mouseX, s.mouseY, point[0], point[1]);

        if (distance < radius) {
          point.active = true;
          point.centroid = -1;
        } else {
          point.active = false;
          point.centroid = point.prevCentroid;
        }
      }
    }
  };
  const count = s.floor(s.random(2, 6));

  return function () {
    charts.push(pointClustered);
    drawTickAxes(s);
    for (let i = 0; i < count; i++) {
      drawCluster(s);
    }
    pointCoordinates = [];
  };
}
export { drawKmeans, charts, setCharts, getCharts };
