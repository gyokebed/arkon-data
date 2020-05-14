import React, { useState, useEffect, createRef } from "react";
import * as d3 from "d3";

const TasksChart = () => {
  const [data, setData] = useState([
    { skill: "CSS", value: 80 },
    { skill: "HTML", value: 70 },
    { skill: "JS", value: 85 },
    { skill: "ANGULAR", value: 90 },
    { skill: "REACT", value: 75 },
    { skill: "D3", value: 70 },
    { skill: "NODE JS", value: 65 },
    { skill: "JAVA", value: 65 },
    { skill: "UI DESIGN", value: 70 },
    { skill: "XD", value: 65 },
  ]);
  const [yAxisAttribute, setyAxisAttribute] = useState("skill");
  const [xAxisAttribute, setxAxisAttribute] = useState("value");
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    drawChart();
  }, []);

  const chartRef = createRef();

  const drawChart = () => {
    let margin = { top: 20, right: 30, bottom: 40, left: 90 },
      w = width - margin.left - margin.right,
      h = height - margin.top - margin.bottom;
    // append the svg object to the body of the page
    let svg = d3
      .select(".rowChart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
    let x = d3.scaleLinear().domain([0, 100]).range([0, w]);
    svg
      .append("g")
      .attr("transform", "translate(0," + h + ")")
      .attr("class", "axis x")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
    // Add Y axis
    let y = d3
      .scaleBand()
      .range([0, h])
      .domain(data.map((d) => d[yAxisAttribute]))
      .padding(0.1);
    svg
      .append("g")
      .attr("class", "axis y")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("dy", null);
    // Add Bars
    svg
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .on("mouseover", function () {
        d3.select(this).style("opacity", 0.5);
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 1);
      })
      .attr("x", x(0))
      .attr("y", (d) => y(d[yAxisAttribute]))
      .attr("width", 0)
      .attr("height", y.bandwidth() - 10)
      .attr("fill", "#DF337D")
      .transition(d3.transition().duration(1000))
      .attr("width", (d) => x(d[xAxisAttribute]));
  };

  return (
    <div
      style={{
        height: "50vh",
        width: "100%",
        textAlign: "center",
      }}
    >
      <div class="rowChart" ref={chartRef}></div>;
    </div>
  );
};

export default TasksChart;
