const boxes = Array.from(document.querySelectorAll(".box"));
const endButton = document.getElementById("end");

const Player = (name, shape) => {
    shape = "";
    name = "";
}

(function inputShape() {
    let gridInputs = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    endButton.addEventListener("click", () => {
        gameIsOver(gridInputs);
    });

    let state = true;

    boxes.forEach((box) =>{
        box.addEventListener("click", () => {

            if (box.classList[1] <= 3) {
                box.textContent = state ? "X" : "O";
                gridInputs[0][(box.classList[1] - 1)] = box.textContent;
                state = box.textContent !== "X";
            }

            else if (box.classList[1] > 3 && box.classList[1] <= 6) {
                console.log("2nd row", box.classList[1])
                box.textContent = state ? "X" : "O";
                gridInputs[1][(box.classList[1] - 4)] = box.textContent;
                state = box.textContent !== "X";
            }

            else if (box.classList[1] > 6) {
                box.textContent = state ? "X" : "O";
                gridInputs[2][(box.classList[1] - 7)] = box.textContent;
                state = box.textContent !== "X";
            }

        })
    })
})();

function gameIsOver(array) {
    console.log(array)
}