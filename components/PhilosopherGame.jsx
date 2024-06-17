"use client";

import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Confetti from "react-confetti";
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
  const [timer, setTimer] = useState(60); // Set timer to default 60 seconds
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [correctlyPlaced, setCorrectlyPlaced] = useState(0);
  const [incorrectlyPlaced, setIncorrectlyPlaced] = useState(0);
  const [totalPhilosophers, setTotalPhilosophers] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(60); // Default duration

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/philosophers");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        const shuffledPhilosophers = shuffle(data);
        const movements = Object.keys(
          data.reduce((acc, philosopher) => {
            acc[philosopher.movement] = [];
            return acc;
          }, {}),
        );
        setGameData({
          philosophers: shuffledPhilosophers,
          movements: movements.reduce((acc, movement) => {
            acc[movement] = [];
            return acc;
          }, {}),
        });
        setTotalPhilosophers(shuffledPhilosophers.length);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isGameStarted && !isGamePaused && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsGameStarted(false);
      calculateScore();
    }
  }, [isGameStarted, isGamePaused, timer]);

  const calculateScore = () => {
    const attended = totalPhilosophers - gameData.philosophers.length;
    const score = (attended / totalPhilosophers) * 100;
    alert(`Game over! You attended ${score.toFixed(2)}% of the cards.`);
  };

  const startGame = () => {
    setIsGameStarted(true);
    setIsGamePaused(false);
    setTimer(selectedDuration);
    setCorrectlyPlaced(0);
    setIncorrectlyPlaced(0);
  };

  const pauseGame = () => {
    setIsGamePaused(!isGamePaused);
  };

  const stopGame = () => {
    setIsGameStarted(false);
    calculateScore();
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(parseInt(e.target.value));
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
          setNotification({
            message: `${movedPhilosopher.name} is correctly placed in ${targetMovement}`,
            type: "success",
          });
          setCorrectlyPlaced((prev) => prev + 1);
          setTimeout(() => {
            setShowConfetti(false);
            setNotification(null);
          }, 3000);
        } else {
          setNotification({
            message: `${movedPhilosopher.name} does not belong to ${targetMovement}`,
            type: "error",
          });
          setTimeout(() => {
            setNotification(null);
          }, 2000);
          newPhilosophers.push(movedPhilosopher); // Add the philosopher back to the list if incorrect
          setIncorrectlyPlaced((prev) => prev + 1);
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
      <div className="flex flex-col items-center justify-center p-4 h-full min-h-screen overflow-hidden relative bg-gradient-to-r from-blue-100 to-purple-100">
        {showConfetti && <Confetti />}
        <h1 className="text-3xl font-bold mb-4 text-purple-900">
          Philosopher Card Arrangement Game
        </h1>
        {!isGameStarted && (
          <div className="mb-4">
            <label htmlFor="duration" className="mr-2 text-xl font-semibold">
              Select Duration:
            </label>
            <select
              id="duration"
              value={selectedDuration}
              onChange={handleDurationChange}
              className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value={60}>1 Minute</option>
              <option value={300}>5 Minutes</option>
              <option value={600}>10 Minutes</option>
              <option value={900}>15 Minutes</option>
            </select>
          </div>
        )}
        <div className="mb-4 flex space-x-4">
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-900"
            onClick={startGame}
            disabled={isGameStarted}
          >
            {isGameStarted ? "Game in Progress" : "Start Game"}
          </button>

          {isGameStarted && (
            <>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-700"
                onClick={pauseGame}
              >
                {isGamePaused ? "Resume" : "Pause"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
                onClick={stopGame}
              >
                Stop
              </button>
            </>
          )}
        </div>
        {isGameStarted && (
          <div className="text-xl font-semibold mb-4">
            Time Remaining: {timer} seconds
          </div>
        )}
        {notification && (
          <div
            className={`fixed left-0 top-1/4 transform translate-x-1/4 p-2 rounded-lg shadow-lg text-white text-center transition-transform duration-300 ease-in-out ${
              notification.type === "error" ? "bg-orange-500" : "bg-green-500"
            }`}
          >
            {notification.message}
          </div>
        )}
        {isGameStarted && (
          <div className="flex w-full h-full">
            <div className="w-1/4 h-full overflow-y-auto overflow-x-hidden p-4 bg-purple-200 rounded-lg">
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
            <div className="w-2/4 h-full overflow-y-auto overflow-x-hidden p-4 bg-purple-50 rounded-lg">
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
            <div className="w-1/4 h-full overflow-y-auto overflow-x-hidden p-4 bg-purple-200 rounded-lg">
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
        )}
        {isGameStarted && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-semibold mb-2">Scoreboard</h2>
            <div className="flex justify-center space-x-4">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
                Correctly Placed: {correctlyPlaced}
              </div>
              <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
                Incorrectly Placed: {incorrectlyPlaced}
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default PhilosopherGame;
