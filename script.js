document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const board = document.getElementById("board");
    const resetButton = document.getElementById("resetButton");
    const message = document.getElementById("message");
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const index = e.target.getAttribute("data-index");

        if (boardState[index] === null && !checkWinner()) {
            boardState[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            if (checkWinner()) {
                message.textContent = `${currentPlayer} wins!`;
                board.classList.add("disabled");
            } else if (boardState.every(cell => cell !== null)) {
                message.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        message.textContent = "";
        board.classList.remove("disabled");
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    resetButton.addEventListener("click", resetGame);
});
