"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PhilosopherTimeline = ({ philosophers }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const x = d3.scaleTime().range([margin.left, width - margin.right]);
    const y = d3
      .scaleBand()
      .range([height - margin.bottom, margin.top])
      .padding(0.1);

    x.domain(d3.extent(philosophers, (d) => new Date(d.birth)));
    y.domain(philosophers.map((d) => d.name));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(philosophers)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(new Date(d.birth)))
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => x(new Date(d.death)) - x(new Date(d.birth)))
      .attr("height", y.bandwidth())
      .on("click", (d) => {
        alert(
          `Name: ${d.name}\nBorn: ${d.birth}\nDied: ${d.death}\nWorks: ${d.works.join(", ")}`,
        );
      });
  }, [philosophers]);

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default PhilosopherTimeline;
