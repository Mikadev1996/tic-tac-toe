



const testPlayer = (name, shape) => {
    return {name, shape}
}

const player1 = testPlayer("Mika", "X");
const player2 = testPlayer("Dev", "O");

console.log(player1, player2);



(function inputShape() {
    let gridInputs = [
        "","","",
        "","","",
        "","",""
    ];


    const endButton = document.getElementById("end");
    endButton.addEventListener("click", () => {
        gameIsOver(gridInputs);
    });

    let state = true;

    const boxes = Array.from(document.querySelectorAll(".box"));
    boxes.forEach((box) =>{
        box.addEventListener("click", () => {
            box.textContent = state ? "X" : "O";
            state = box.textContent !== "X";

            gridInputs[(box.classList[1] - 1)] = box.textContent;
            gameIsOver(gridInputs, box.textContent);
        })
    })


    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    const gameIsOver = (arr, shape) => {
        winConditions.forEach((set) => {
            if (arr[set[0]] === shape && arr[set[1]] === shape && arr[set[2]] === shape) {
                alert(`Congratulations ${shape} has won!`)

                gridInputs = [
                    "","","",
                    "","","",
                    "","",""
                ];

                boxes.forEach((box) => {
                    box.textContent = "";
                })

            }
        })

    }
})();







