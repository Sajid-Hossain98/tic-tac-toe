"use client";

import Square from "@/components/Square";
import React, { useEffect, useState } from "react";

type Player = "X" | "O" | "BOTH" | null;

function calculateWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

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

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }
    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  }, [squares]);

  return (
    <div className="flex flex-col gap-7 items-center">
      <p
        className={`text-white text-center font-mono font-bold text-2xl underline ${
          currentPlayer === "X"
            ? `decoration-rose-700`
            : `decoration-yellow-500`
        }  underline-offset-4`}
      >
        Hey, &quot;{currentPlayer}&quot; it&apos;s your turn!
      </p>

      {winner && winner !== "BOTH" && (
        <p
          className={`absolute top-[10%] font-bold text-3xl text-center md:text-5xl border-2 p-2 ${
            winner === "O"
              ? "text-yellow-500 border-yellow-500"
              : "text-rose-700 border-rose-700"
          }`}
        >
          Congratulations &quot;{winner}&quot;
        </p>
      )}
      {winner && winner === "BOTH" && (
        <p className="bg-gradient-to-r from-rose-700 to-yellow-500 p-3 absolute top-0 md:top-[10%] font-bold text-3xl text-center md:text-5xl">
          Congratulations &quot;X&quot; & &quot;O&quot;, you both are winners 🎉
        </p>
      )}
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
