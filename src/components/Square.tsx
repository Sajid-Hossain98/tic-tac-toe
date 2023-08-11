type Player = "X" | "O" | null;

function Square({
  value,
  onClick,
  winner,
  currentPlayer,
}: {
  winner: Player;
  value: Player;
  currentPlayer: Player;
  onClick: () => void;
}) {
  if (!value) {
    return (
      <button
        className={`w-20 h-20 border-2 md:border-4 p-5 ${
          currentPlayer === "X" ? ` border-rose-700` : `border-yellow-500`
        }`}
        onClick={onClick}
        disabled={Boolean(winner)}
      />
    );
  }
  return (
    <button
      disabled
      className={`w-20 h-20 border-2 md:border-4 border-x-4 p-5 ${
        value === "X"
          ? "border-rose-700 text-rose-700"
          : "border-yellow-500 text-yellow-500"
      } text-3xl disabled:cursor-not-allowed`}
    >
      {value}
    </button>
  );
}

export default Square;
