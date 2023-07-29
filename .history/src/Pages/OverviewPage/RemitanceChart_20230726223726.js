import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class RemitanceChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      height: 165,
      backgroundColor: "transparent",
      title: {
        // text: "Nuclear Electricity Generation in US",
      },
      axisX: {
        valueFormatString: " ",
        tickLength: 0,
        lineColor: "#fff",
      },
      axisY: {
        // title: "Net Generation (in Billion kWh)",
        valueFormatString: " ",

        // suffix: " kWh",
        labelFontColor: "#fff",
        lineColor: "#fff",
        gridColor: "#fff",
        tickLength: 0,
        // labelFontSize: 1,
      },

      data: [
        {
          type: "splineArea",
          lineColor: "#648ffb",
          xValueFormatString: "YYYY",
          yValueFormatString: "#,##0.## bn kW⋅h",
          showInLegend: false,
          // legendText: "kWh = one kilowatt hour",
          color: "rgba(121,82,179,0.3)",
          dataPoints: [
            { x: new Date(2008, 0), y: 70.735 },
            { x: new Date(2009, 0), y: 74.102 },
            { x: new Date(2010, 0), y: 72.569 },
            { x: new Date(2011, 0), y: 72.743 },
            { x: new Date(2012, 0), y: 72.381 },
            { x: new Date(2013, 0), y: 71.406 },
            { x: new Date(2014, 0), y: 73.163 },
            { x: new Date(2015, 0), y: 74.27 },
            { x: new Date(2016, 0), y: 72.525 },
            { x: new Date(2017, 0), y: 73.121 },
          ],
        },
      ],
    };
    return (
      <div id="chartContainer">
        <CanvasJSChart
          options={options}

          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default RemitanceChart;
