"use client";

import Square from "@/components/Square";
import React, { useEffect, useState } from "react";

type Player = "X" | "O" | null;

const Board = () => {
  //creating squares
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);

  useEffect(() => {
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }, []);

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <div className="flex flex-col gap-7 w-screen items-center">
      <p
        className={`text-white font-mono font-bold text-2xl underline ${
          currentPlayer === "X"
            ? `decoration-rose-700`
            : `decoration-yellow-500`
        }  underline-offset-4`}
      >
        Hey, &quot;{currentPlayer}&quot; it&apos;s your turn!
      </p>
      <div className="grid gap-2 md:gap-5 grid-cols-3">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
                winner={winner}
                currentPlayer={currentPlayer}
              />
            );
          })}
      </div>

      <button
        className="px-4 py-2 rounded font-bold text-xl hover:bg-slate-500 transition-colors bg-slate-400"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default Board;
