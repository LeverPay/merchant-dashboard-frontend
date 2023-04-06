import React, { Component } from "react";
import { CanvasJSChart, CanvasJS } from "canvasjs-react-charts";
import "./chart.css";
// eslint-disable-next-line no-undef
CanvasJS.addColorSet("rainbow", [
  "#1861ff",
  "#f49a1f",
  "#ed452a",
  "#872929",
  "#336906",
]);
const Chart = (props) => {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    backgroundColor: props.bgColor,
    interactivityEnabled: true,
    theme: "", //"light1", "dark1", "dark2"
    axisY: {
      includeZero: true,
    },
    colorSet: "rainbow",

    height: props.height | 260,
    legend: {
      fontFamily: " AgrandirBold",
      fontWeight: "bold",
      fontSize: 17,
    },
    data: [
      {
        type: props.type, //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "white",
        indexLabelPlacement: "inside",
        showInLegend: props.Legend | false,

        // color: props.color,

        // dataPoints: [
        //   { x: 30, y: 15 },
        //   { x: 10, y: 5 },
        //   { x: 20, y: 10 },
        //   { x: 40, y: 20, indexLabel: "Highest" },
        // ],
        dataPoints: props.chartData,
      },
    ],
  };
  if (props.color) options.data[0].color = props.color;

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
