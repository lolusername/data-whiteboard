import ml5 from "ml5";

let pointCoordinates = [];
let charts = [];
const radius = 8;
const size = 300;

function drawTickAxes(s) {
  s.line(s.mouseX, s.mouseY, s.mouseX, s.mouseY + size);
  s.translate(0, size);
  s.line(s.mouseX, s.mouseY, s.mouseX + size, s.mouseY);
}

function drawCluster(s) {
  // let pointCoordinates = [];
  const bluish = s.color(109, 138, 162);
  const reddish = s.color(252, 71, 51);
  const brown = s.color(181, 98, 69);

  const colors = [bluish, reddish, brown];

  const deltaX = s.floor(s.random(0, size));
  const deltaY = s.floor(s.random(0, size));
  const count = s.floor(s.random(7, 12));
  let distribution = [...new Array(count)].map(() => {
    return [s.randomGaussian(3, 15), s.randomGaussian(3, 15)];
  });
  for (let i = 0; i < distribution.length; i++) {
    s.stroke(0);
    let distX = distribution[i][0] + deltaX + s.mouseX;
    let distY = distribution[i][1] + deltaY + s.mouseY - size;
    pointCoordinates.push({
      distX,
      distY,
      color: s.color(0, 255, 255),
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
      s.fill(s.color(colors[point["centroid"]]));
      s.circle(point[0], point[1], radius);
    });
    pointCoordinates = [];
  }
}
export function drawKmeans(s) {
  const count = s.floor(s.random(2, 6));
  return function () {
    for (let i = 0; i < count; i++) {
      drawCluster(s);
    }
    drawTickAxes(s);
  };
}
