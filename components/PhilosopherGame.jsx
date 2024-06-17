"use client";

import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Confetti from "react-confetti";
import axios from "axios";
import { shuffle } from "../utils/shuffle";

const ItemType = "PHILOSOPHER";

const DraggableItem = ({ id, name, movement }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, movement },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 rounded-lg shadow-md text-sm transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 ${
        isDragging ? "bg-blue-200" : "bg-white"
      }`}
      style={{ width: "120px" }}
    >
      {name}
    </div>
  );
};

const DroppableArea = ({ movement, philosophers, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item.id, movement, item.movement),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 rounded-lg shadow-lg mb-4 transition-colors duration-300 ease-in-out ${
        isOver ? "bg-green-100" : "bg-gray-100"
      }`}
      style={{ width: "100%", minHeight: "150px" }}
    >
      <h2 className="text-lg font-semibold mb-2 text-center">{movement}</h2>
      <div className="flex flex-wrap gap-2">
        {philosophers.map((philosopher) => (
          <DraggableItem
            key={philosopher.id}
            id={philosopher.id}
            name={philosopher.name}
            movement={movement}
          />
        ))}
      </div>
    </div>
  );
};

const PhilosopherGame = () => {
  const [gameData, setGameData] = useState({
    philosophers: [],
    movements: {},
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [notification, setNotification] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [philosophersRes, movementsRes] = await Promise.all([
          axios.get("/api/philosophers"),
          axios.get("/api/movements"),
        ]);

        setGameData({
          philosophers: shuffle(philosophersRes.data),
          movements: movementsRes.data,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateScore = (correct) => {
    setScore((prevScore) => (correct ? prevScore + 1 : prevScore));
  };

  const handleDrop = (id, targetMovement, originalMovement) => {
    setGameData((prevData) => {
      const newPhilosophers = prevData.philosophers.filter((p) => p.id !== id);
      const movedPhilosopher =
        prevData.philosophers.find((p) => p.id === id) ||
        Object.values(prevData.movements)
          .flat()
          .find((p) => p.id === id);

      const newMovements = { ...prevData.movements };
      Object.keys(newMovements).forEach((movement) => {
        newMovements[movement] = newMovements[movement].filter(
          (p) => p.id !== id,
        );
      });

      let isCorrect = false;
      if (movedPhilosopher) {
        isCorrect = movedPhilosopher.movement === targetMovement;
        if (isCorrect) {
          newMovements[targetMovement] = [
            ...newMovements[targetMovement],
            movedPhilosopher,
          ];
          setShowConfetti(true);
          setNotification(
            `${movedPhilosopher.name} is correctly placed in ${targetMovement}`,
          );
          calculateScore(true);
          setTimeout(() => {
            setShowConfetti(false);
            setNotification(null);
          }, 3000);
        } else {
          setNotification(
            `${movedPhilosopher.name} does not belong to ${targetMovement}`,
          );
          setTimeout(() => {
            setNotification(null);
          }, 2000);
          newPhilosophers.push(movedPhilosopher); // Add the philosopher back to the list if incorrect
          calculateScore(false);
        }
      }

      return {
        philosophers: isCorrect ? newPhilosophers : prevData.philosophers,
        movements: newMovements,
      };
    });
  };

  const leftMovements = Object.keys(gameData.movements).slice(0, 5);
  const rightMovements = Object.keys(gameData.movements).slice(5);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center justify-center p-4 h-screen overflow-hidden relative bg-gradient-to-r from-blue-100 to-purple-100">
        {showConfetti && <Confetti />}
        <h1 className="text-3xl font-bold mb-8 text-purple-900">
          Philosopher Card Arrangement Game
        </h1>
        {notification && (
          <div className="fixed left-1/2 transform -translate-x-1/2 top-20 bg-red-500 text-white p-4 rounded-lg shadow-lg text-center animate-bounce">
            {notification}
          </div>
        )}
        <div className="flex w-full h-full">
          <div className="w-1/4 overflow-auto p-4 bg-purple-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-900">
              Philosophical Movements
            </h2>
            <div className="flex flex-col gap-4">
              {leftMovements.map((movement, index) => (
                <DroppableArea
                  key={movement}
                  movement={movement}
                  philosophers={gameData.movements[movement]}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          </div>
          <div className="w-2/4 overflow-auto p-4 bg-purple-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-900">
              Philosophers
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {gameData.philosophers.map((philosopher) => (
                <DraggableItem
                  key={philosopher.id}
                  id={philosopher.id}
                  name={philosopher.name}
                  movement={philosopher.movement}
                />
              ))}
            </div>
          </div>
          <div className="w-1/4 overflow-auto p-4 bg-purple-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-900">
              Philosophical Movements
            </h2>
            <div className="flex flex-col gap-4">
              {rightMovements.map((movement, index) => (
                <DroppableArea
                  key={movement}
                  movement={movement}
                  philosophers={gameData.movements[movement]}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg">
          <p className="text-lg font-semibold">Score: {score}</p>
        </div>
      </div>
    </DndProvider>
  );
};

export default PhilosopherGame;
