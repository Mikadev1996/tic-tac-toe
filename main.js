(function startGame() {

    const startMenu = document.querySelector("#start");
    const pvpMenu = document.querySelector("#dropdown-1");
    const AIMenu = document.querySelector("#dropdown-2");
    const winState = document.getElementById("win-state-header");

    const cancelButton = document.querySelector(".cancel");
    const confirmButton = document.querySelector(".confirm");
    const dropdown = document.querySelector(".dropdown");
    const pvp = document.querySelector("#local");
    const AI = document.querySelector("#computer");
    const gameMenu = document.querySelector("#game");

    const boxes = Array.from(document.querySelectorAll(".box"));
    const game_p1 = document.getElementById("game-p1")
    const game_p2 = document.getElementById("game-p2")

    const scoreP1 = document.querySelector("#score-p1");
    const scoreP2 = document.querySelector("#score-p2");

    const cancelButton2 = document.getElementById("cancel");
    const confirmButton2 = document.getElementById("confirm");

    function resetGameBoard()  {
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })
        gridInputs = [
            "","","",
            "","","",
            "","",""
        ];
        setTimeout(() => {
            boxes.forEach((box) => {
                box.textContent = "";
                box.style.pointerEvents = "all";
            })
        }, 750);
    }

    const Player = (name, shape, score) => {
        return {name, shape, score}
    }

    // PVAI

    AI.addEventListener("click", () => {
        gridInputs = ["", "", "", "", "", "", "", "", ""];
        AIMenu.style.opacity = "1";
        AIMenu.style.pointerEvents = "all";
    })

    cancelButton2.addEventListener("click", () => {
        AIMenu.style.opacity = "0";
        AIMenu.style.pointerEvents = "none";

        pvpMenu.style.opacity = "0";
        pvpMenu.style.pointerEvents = "none";
    })

    const startPVAI = () => {
        startMenu.style.opacity = "0";
        startMenu.style.pointerEvents = "none";
        gameMenu.style.opacity = "1";
        gameMenu.style.pointerEvents = "all";
        pvpMenu.style.opacity = "0";
        pvpMenu.style.pointerEvents = "none";
        AIMenu.style.opacity = "1";
        AIMenu.style.pointerEvents = "all";


        let player_name = document.querySelector("#player-name")

        let player1 = Player(player_name.value, "X", 0);
        let player2 = Player("R0B0T", "O", 0);

        scoreP1.textContent = "Score: 0";
        scoreP2.textContent = "Score: 0";

        game_p1.textContent = player1.name;
        game_p2.textContent = player2.name;


        const boxes = Array.from(document.querySelectorAll(".box"));
        boxes.forEach((box) => {
            function playAI() {
                let drawStatus = gridInputs.filter((item) => {
                    return item === "";
                })


                if (box.textContent !== "O" && box.textContent !== "X" && drawStatus.length > 1) {
                    box.textContent = "X";
                    gridInputs[(box.classList[1] - 1)] = box.textContent;
                    let gameOver = isGameOver([player1, player2], gridInputs, box.textContent);
                    let isGridEmpty = gridInputs.filter(item => {
                        return item !== "";
                    })

                    if (isGridEmpty.length !== 0) {

                        function generateValidMoves(gridInputs) {
                            let validMoves = [];
                            gridInputs.forEach((item, index) => {
                                if (item === "") {
                                    validMoves.push(index);
                                }
                            })
                            return validMoves;
                        }

                        let validMoves = generateValidMoves(gridInputs);
                        let index = Math.floor(Math.random() * validMoves.length);
                        let move = validMoves[index];

                        if (boxes[move] !== "X") {
                            gridInputs[move] = "O";
                            boxes[move].textContent = "O"
                            isGameOver([player1, player2], gridInputs, "O");

                            if (drawStatus.length <= 3 && winState.textContent !== "O Wins") {
                                winState.textContent = "Draw";
                                winState.style.opacity = "1";
                                setTimeout(() => {
                                    winState.style.opacity = "0"
                                }, 950)
                                resetGameBoard();
                            }

                        }
                    }
                }
            }
            box.addEventListener("click", playAI);
            box.style.pointerEvents = "all";

            menuButton.addEventListener("click", () => {
                boxes.forEach(box => {
                    box.removeEventListener("click", playAI);
                })
            })
        })
    }

    confirmButton2.addEventListener("click", () => {
        startPVAI();
    });

    //

    // PVP

    pvp.addEventListener("click", () => {
        pvpMenu.style.opacity = "1";
        pvpMenu.style.pointerEvents = "all";
    })

    cancelButton.addEventListener("click", () => {
        dropdown.style.opacity = "0";
        pvpMenu.style.pointerEvents = "none";
        AIMenu.style.pointerEvents = "none";
    })

    const startPVP = () => {
        startMenu.style.opacity = "0";
        startMenu.style.pointerEvents = "none";
        gameMenu.style.opacity = "1";
        gameMenu.style.pointerEvents = "all";
        pvpMenu.style.opacity = "0";
        pvpMenu.style.pointerEvents = "none";
        AIMenu.style.opacity = "1";
        AIMenu.style.pointerEvents = "all";

        let player1_name = document.querySelector("#player1-name")
        let player2_name = document.querySelector("#player2-name")

        let player1 = Player(player1_name.value, "X", 0);
        let player2 = Player(player2_name.value, "O", 0);

        scoreP1.textContent = "Score: 0";
        scoreP2.textContent = "Score: 0";

        game_p1.textContent = player1.name;
        game_p2.textContent = player2.name;

        pvpGame([player1, player2]);
    }
    confirmButton.addEventListener("click", startPVP);

    //

    let gridInputs = [
        "","","",
        "","","",
        "","",""
    ];

    let pvpGame = (player) => {
        let state = true;

        let playerShapeInput = (box) => {
            let drawStatus = gridInputs.filter((item) => {
                return item === "";
            })

            let isGridEmpty = gridInputs.filter((item) => {
                return item !== "";
            })

            if (box.target.textContent !== "O" && box.target.textContent !== "X" && drawStatus.length > 1) {
                box.target.textContent = state ? "X" : "O";
                state = (box.target.textContent !== "X");

                gridInputs[(box.target.classList[1] - 1)] = box.target.textContent;
                let gameOver = isGameOver(player, gridInputs, box.target.textContent);
                if (drawStatus.length <= 3 && !gameOver) {
                    winState.textContent = "Draw";
                    winState.style.opacity = "1";
                    setTimeout(() => {
                        winState.style.opacity = "0"
                    }, 950)
                    resetGameBoard();

                }
            }
        }

        const boxes = Array.from(document.querySelectorAll(".box"));
        boxes.forEach((box) => {
            box.style.pointerEvents = "all";
            box.addEventListener("click", playerShapeInput);
        })

        menuButton.addEventListener("click", () => {
            boxes.forEach((box) => {
                box.removeEventListener("click", playerShapeInput);
            })
        })
    }

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

    const isGameOver = (player, arr, shape) => {
        for (const set of winConditions) {
            let gameOver = (arr[set[0]] === shape && arr[set[1]] === shape && arr[set[2]] === shape)
            if (gameOver) {
                if (shape === "X") {
                    player[0].score += 1;
                    scoreP1.textContent = `Score: ${player[0].score}`;
                    winState.textContent = "X Wins";
                    winState.style.opacity = "1";
                        setTimeout(() => {
                            winState.style.opacity = "0"
                        }, 1500)

                } else {
                    player[1].score += 1;
                    scoreP2.textContent = `Score: ${player[1].score}`;
                    winState.textContent = "O Wins";
                    winState.style.opacity = "1";
                    setTimeout(() => {
                        winState.style.opacity = "0"
                    }, 950)
                }

                resetGameBoard();
                return gameOver;
            }
        }

        return false;
    }

    const menuButton = document.querySelector("#menu-button");
    menuButton.addEventListener("click", () => {
        startMenu.style.opacity = "1";
        startMenu.style.pointerEvents = "all";
        gameMenu.style.opacity = "0";
        gameMenu.style.pointerEvents = "none";
        AIMenu.style.opacity = "0";
        AIMenu.style.pointerEvents = "none";
        gridInputs = [
            "","","",
            "","","",
            "","",""
        ];

        setTimeout(() => {
            boxes.forEach((box) => {
                box.textContent = "";
                box.style.pointerEvents = "none";
            })
        }, 750);
    })
})();