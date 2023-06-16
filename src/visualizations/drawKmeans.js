import ml5 from "ml5";
import { get } from "svelte/store";
import { charts, size } from "../store/charts.js";
import { drawTickAxes } from "./utils.js";
import Papa from "papaparse";

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const data = await processCSVFile(file);
      const drawClusterWithData = DrawClusters(sketch, data);
      drawClusterWithData();
    } catch (error) {
      console.error("Error processing CSV file:", error);
    }
  }
};

const DrawClusters = (sketch, data = null) => {
  sketch.mousePressed = () => {
    const currentChart = get(charts)[get(charts).length - 1];
    if (get(charts).length) {
      for (const point of currentChart) {
        const distance = sketch.dist(sketch.mouseX, sketch.mouseY, point[0], point[1]);
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

  return () => {
    drawTickAxes(sketch);
    charts.update((prevValue) => [...prevValue, pointClustered]);

    if (data) {
      _drawClusterFromCSV(sketch, data);
    } else {
      const count = sketch.floor(sketch.random(2, 6));
      [...new Array(count)].forEach(() => _drawCluster(sketch));
    }

    pointCoordinates = [];
  };
};

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

const onCluster = (clustering) => {
  clustering.dataset.forEach((point) => {
    point.prevCentroid = point.centroid;
    pointClustered.push(point);
  });
};

let pointCoordinates = [];
let pointClustered = [];
const radius = 8;

const _drawCluster = (sketch) => {
  const deltaX = sketch.floor(sketch.random(0, get(size)));
  const deltaY = sketch.floor(sketch.random(0, get(size)));
  const count = sketch.floor(sketch.random(7, 12));
  const distribution = [...new Array(count)].map(() => [
    sketch.randomGaussian(3, 15),
    sketch.randomGaussian(3, 15),
    sketch.randomGaussian(3, 15),
  ]);
  for (const [i, distributionPoint] of distribution.entries()) {
    sketch.stroke(0);
    const distX = distributionPoint[0] + deltaX + sketch.mouseX;
    const distY = distributionPoint[1] + deltaY + sketch.mouseY;
    const distZ = distributionPoint[2] + deltaY + sketch.mouseY;
    pointCoordinates.push({ distX, distY, active: false });
  }

  const hyperparamters = {
    k: sketch.floor(sketch.random(2, 6)),
    maxIter: 5,
    threshold: 0.5,
  };

  const clustering = ml5.kmeans(pointCoordinates, hyperparamters, () => onCluster(clustering));
};

const _drawClusterFromCSV = (sketch, data) => {
  pointCoordinates = data.map((row) => ({ distX: row.x, distY: row.y, active: false }));

  const hyperparameters = {
    k: sketch.floor(sketch.random(2, 6)),
    maxIter: 5,
    threshold: 0.5,
  };

  const clustering = ml5.kmeans(pointCoordinates, hyperparameters, () => onCluster(clustering));
};

export { DrawClusters, handleFileUpload };