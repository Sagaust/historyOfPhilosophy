"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import BootstrapModal from "./BootstrapModal";

const EdgeWeightingVisualization = () => {
  const cardSvgRef = useRef();
  const modalSvgRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const createSvg = (svgRef, width, height) => {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      const nodes = [
        { id: "Socrates" },
        { id: "Plato" },
        { id: "Aristotle" },
        { id: "Augustine" },
        { id: "Aquinas" },
        { id: "Anselm" },
        { id: "Avicenna" },
        { id: "Averroes" },
        { id: "Maimonides" },
        { id: "Duns Scotus" },
        { id: "William Ockham" },
        { id: "Descartes" },
        { id: "Spinoza" },
        { id: "Leibniz" },
        { id: "Locke" },
        { id: "Berkeley" },
        { id: "Hume" },
        { id: "Kant" },
        { id: "Hegel" },
        { id: "Schopenhauer" },
        { id: "Nietzsche" },
        { id: "Bentham" },
        { id: "J.S. Mill" },
        { id: "Peirce" },
        { id: "James" },
        { id: "Frege" },
        { id: "Russell" },
        { id: "Wittgenstein" },
        { id: "Husserl" },
        { id: "Heidegger" },
        { id: "Sartre" },
        { id: "Kierkegaard" },
        { id: "Derrida" },
      ];

      const links = [
        { source: "Socrates", target: "Plato", value: 3 },
        { source: "Plato", target: "Aristotle", value: 3 },
        { source: "Augustine", target: "Aquinas", value: 2 },
        { source: "Aristotle", target: "Aquinas", value: 3 },
        { source: "Aristotle", target: "Avicenna", value: 2 },
        { source: "Avicenna", target: "Averroes", value: 2 },
        { source: "Averroes", target: "Maimonides", value: 2 },
        { source: "Augustine", target: "Anselm", value: 2 },
        { source: "Anselm", target: "Aquinas", value: 2 },
        { source: "Aquinas", target: "Duns Scotus", value: 2 },
        { source: "Duns Scotus", target: "William Ockham", value: 2 },
        { source: "Descartes", target: "Spinoza", value: 3 },
        { source: "Descartes", target: "Leibniz", value: 3 },
        { source: "Descartes", target: "Locke", value: 3 },
        { source: "Locke", target: "Berkeley", value: 2 },
        { source: "Berkeley", target: "Hume", value: 2 },
        { source: "Hume", target: "Kant", value: 3 },
        { source: "Kant", target: "Hegel", value: 3 },
        { source: "Hegel", target: "Schopenhauer", value: 2 },
        { source: "Hegel", target: "Nietzsche", value: 2 },
        { source: "Bentham", target: "J.S. Mill", value: 2 },
        { source: "Peirce", target: "James", value: 2 },
        { source: "Frege", target: "Russell", value: 3 },
        { source: "Russell", target: "Wittgenstein", value: 3 },
        { source: "Husserl", target: "Heidegger", value: 2 },
        { source: "Heidegger", target: "Sartre", value: 2 },
        { source: "Kierkegaard", target: "Sartre", value: 2 },
        { source: "Husserl", target: "Derrida", value: 2 },
        { source: "Heidegger", target: "Derrida", value: 2 },
      ];

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance(30),
        )
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg
        .append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", (d) => Math.sqrt(d.value) * 1.5)
        .attr("stroke", "#999");

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", (d) => color(d.id))
        .on("click", (event, d) => {
          modalSvgRef.current.innerHTML = ""; // Clear existing SVG content
          createSvg(modalSvgRef, 800, 600);
          setShow(true);
        })
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended),
        );

      const text = svg
        .append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("dy", -3)
        .attr("dx", 5)
        .attr("font-size", 10)
        .text((d) => d.id);

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        text.attr("x", (d) => d.x).attr("y", (d) => d.y);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    };

    createSvg(cardSvgRef, 300, 200);
    createSvg(modalSvgRef, 800, 600); // Create the SVG for the modal, but keep it hidden
  }, []);

  return (
    <>
      <div className="relative" onClick={() => setShow(true)}>
        <svg ref={cardSvgRef} className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-gray-200 hover:bg-opacity-50 cursor-pointer">
          <span className="text-sm font-bold">Click to Enlarge</span>
        </div>
      </div>
      <BootstrapModal show={show} handleClose={() => setShow(false)}>
        <svg ref={modalSvgRef} className="w-full h-full" />
      </BootstrapModal>
    </>
  );
};

export default EdgeWeightingVisualization;
