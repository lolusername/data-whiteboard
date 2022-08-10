// lib for kmeans clustering
import ml5 from "ml5";

// reading from a Svelte store
import { get } from "svelte/store";

//charts array from store
import { charts, size } from "../store/charts.js";

// chart axies
import { drawTickAxes } from "./utils.js";

// array of random generated data points
let pointCoordinates = [];

// array mapped from generated data to include clustering info
let pointClustered = [];

// data point radius
const radius = 8;

// prefixed with '_' because it is internal (not exported)
function _drawCluster(s) {
  const deltaX = s.floor(s.random(0, get(size)));
  const deltaY = s.floor(s.random(0, get(size)));
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
      active: false,
    });
  }

  // hyperparamters of Kmeans
  const hyperparamters = {
    // random k value
    // ?: I will need to allow for having the user set the hyperparameters as well as the natural <number>count
    // any architecture ideas on how to do  this the best? have an input update a <object> currentParameters object?
    k: s.floor(s.random(2, 6)),
    maxIter: 5,
    threshold: 0.5,
  };

  // clustering, async
  const clustering = ml5.kmeans(
    // appears to ignore non-numerical attribites of pointCoordinates (such as '<Boolean>active') which is goood
    pointCoordinates,
    hyperparamters,
    onCluster
  );

  // callback for clustering, called on every iteration
  function onCluster() {
    clustering.dataset.forEach((point) => {
      point.prevCentroid = point.centroid;
      pointClustered.push(point);
    });
  }
}

//export factory function which takes the namespaced sketch object 's', introduced kmeans specific 'mousePressed' func
function DrawClusters(s) {
  // ?: I will need different mousePressed events depending on what chart is being used, is this the right way to do it?
  s.mousePressed = () => {
    const currentChart = get(charts)[get(charts).length - 1];
    if (get(charts).length) {
      // selects data points within <number>radius  to color and set active
      //?: how would I only select the closest data point? Iterate and keep the min value?
      for (let i = 0; i < currentChart.length; i++) {
        let point = currentChart[i],
          distance = s.dist(s.mouseX, s.mouseY, point[0], point[1]);

        if (distance < radius) {
          point.active = true;

          // sets centroid to -1 which was populated with a the color black
          // this is to not interfere with other palette colors when being interacted w/
          point.centroid = -1;
        } else {
          point.active = false;
          // if mouse event isnt close enough, color data points according to origanal value
          point.centroid = point.prevCentroid;
        }
      }
    }
  };

  // function that draws one instance of kmeans chart
  return function () {
    // 'natural' cluster count
    const count = s.floor(s.random(2, 6));
    drawTickAxes(s);

    //update charts store
    charts.update((prevValue) => {
      return [...prevValue, pointClustered];
    });

    // draw #count natural clusters
    for (let i = 0; i < count; i++) {
      _drawCluster(s);
    }

    // clear pointCoordinates Array
    pointCoordinates = [];
  };
}
export { DrawClusters };
