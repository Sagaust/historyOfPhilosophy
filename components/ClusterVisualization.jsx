"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import BootstrapModal from "./BootstrapModal";

const ClusterVisualization = () => {
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
        { id: "Socrates", group: "Ancient" },
        { id: "Plato", group: "Ancient" },
        { id: "Aristotle", group: "Ancient" },
        { id: "Augustine", group: "Medieval" },
        { id: "Aquinas", group: "Medieval" },
        { id: "Anselm", group: "Medieval" },
        { id: "Avicenna", group: "Medieval" },
        { id: "Averroes", group: "Medieval" },
        { id: "Maimonides", group: "Medieval" },
        { id: "Duns Scotus", group: "Medieval" },
        { id: "William Ockham", group: "Medieval" },
        { id: "Descartes", group: "Early Modern" },
        { id: "Spinoza", group: "Early Modern" },
        { id: "Leibniz", group: "Early Modern" },
        { id: "Locke", group: "Early Modern" },
        { id: "Berkeley", group: "Early Modern" },
        { id: "Hume", group: "Early Modern" },
        { id: "Kant", group: "Early Modern" },
        { id: "Hegel", group: "German Idealism" },
        { id: "Schopenhauer", group: "German Idealism" },
        { id: "Nietzsche", group: "German Idealism" },
        { id: "Bentham", group: "Utilitarianism" },
        { id: "J.S. Mill", group: "Utilitarianism" },
        { id: "Peirce", group: "Pragmatism" },
        { id: "James", group: "Pragmatism" },
        { id: "Frege", group: "Analytic" },
        { id: "Russell", group: "Analytic" },
        { id: "Wittgenstein", group: "Analytic" },
        { id: "Husserl", group: "Phenomenology" },
        { id: "Heidegger", group: "Phenomenology" },
        { id: "Sartre", group: "Existentialism" },
        { id: "Kierkegaard", group: "Existentialism" },
        { id: "Derrida", group: "Postmodernism" },
      ];

      const links = [
        { source: "Socrates", target: "Plato" },
        { source: "Plato", target: "Aristotle" },
        { source: "Augustine", target: "Aquinas" },
        { source: "Aristotle", target: "Aquinas" },
        { source: "Aristotle", target: "Avicenna" },
        { source: "Avicenna", target: "Averroes" },
        { source: "Averroes", target: "Maimonides" },
        { source: "Augustine", target: "Anselm" },
        { source: "Anselm", target: "Aquinas" },
        { source: "Aquinas", target: "Duns Scotus" },
        { source: "Duns Scotus", target: "William Ockham" },
        { source: "Descartes", target: "Spinoza" },
        { source: "Descartes", target: "Leibniz" },
        { source: "Descartes", target: "Locke" },
        { source: "Locke", target: "Berkeley" },
        { source: "Berkeley", target: "Hume" },
        { source: "Hume", target: "Kant" },
        { source: "Kant", target: "Hegel" },
        { source: "Hegel", target: "Schopenhauer" },
        { source: "Hegel", target: "Nietzsche" },
        { source: "Bentham", target: "J.S. Mill" },
        { source: "Peirce", target: "James" },
        { source: "Frege", target: "Russell" },
        { source: "Russell", target: "Wittgenstein" },
        { source: "Husserl", target: "Heidegger" },
        { source: "Heidegger", target: "Sartre" },
        { source: "Kierkegaard", target: "Sartre" },
        { source: "Husserl", target: "Derrida" },
        { source: "Heidegger", target: "Derrida" },
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
        .attr("stroke-width", 1)
        .attr("stroke", "#999");

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", (d) => color(d.group))
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

export default ClusterVisualization;
