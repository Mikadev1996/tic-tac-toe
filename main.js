const boxes = Array.from(document.querySelectorAll(".box"));
const endButton = document.getElementById("end");

const Player = (name, shape) => {
    shape = "";
    name = "";
}


let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

(function inputShape() {
    let gridInputs = [
        "","","",
        "","","",
        "","",""
    ];

    endButton.addEventListener("click", () => {
        gameIsOver(gridInputs);
    });

    let state = true;

    boxes.forEach((box) =>{
        box.addEventListener("click", () => {
            box.textContent = state ? "X" : "O";
            state = box.textContent !== "X";

            gridInputs[(box.classList[1] - 1)] = box.textContent;
            gameIsOver(gridInputs, box.textContent);
        })
    })


})();

function gameIsOver(arr, shape) {
    winConditions.forEach((set) => {
        if (arr[set[0]] === shape && arr[set[1]] === shape && arr[set[2]] === shape) {
            alert(`Congratulations ${shape} has won!`)
        }
    })

}





