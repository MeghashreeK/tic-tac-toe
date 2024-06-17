let playerNames = JSON.parse(localStorage.getItem("playerNames")) || [];
let input1 = document.getElementById("inp1");
let input2 = document.getElementById("inp2");
let button = document.getElementById("button1");

let ting = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = "false";
let user;

button.addEventListener("click", names);
function names() {
    if (input1.value === "" && input1.value === "") {
        alert("Please enter players names");
    }
    else {
        const player1 = input1.value;
        const player2 = input2.value;
        if (player1 !== "" && player2 !== "") {
            playerNames.push(
                {
                    name1: player1,
                    name2: player2,
                }
            );
            saveToLocalStorage();
            document.getElementById("abc").style.display = "none";
            document.getElementById("xyz").style.display = "block";
            document.getElementsByClassName("info")[0].innerHTML = "Turn for " + playerNames[0].name1;
            input1.value="";
            input2.value="";
        }

    }
}

function saveToLocalStorage() {
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
}


gameLogic();
function gameLogic() {
    if (isgameover === "false") {

        logic1();
    }

    const changeTurn = () => {
        return turn === "X" ? "0" : "X";
    }
    let userName = () => {
        return user === playerNames[0].name2 ? playerNames[0].name1 : playerNames[0].name2;
    }

    function logic1() {
        let boxes = document.getElementsByClassName("box");
        Array.from(boxes).forEach(element => {
            let boxtext = element.querySelector(".boxtext");
            element.addEventListener("click", () => {
                if (boxtext.innerText === "" && isgameover === "false") {
                    boxtext.innerText = turn;
                    turn = changeTurn();
                    if (turn === "X") {
                        boxtext.style.color = "#fff";
                    }
                    else {
                        boxtext.style.color = "pink";
                    }
                    ting.play();
                    checkWin();
                    if (isgameover === "false") {
                        user = userName();
                        document.getElementsByClassName("info")[0].innerText = "Turn for " + user;
                    }

                }

            })
        })
    }

    const checkWin = () => {
        let boxtext = document.getElementsByClassName("boxtext");
        let win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        win.forEach(e => {
            if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
                if (boxtext[e[0]].innerText === "X") {
                    document.getElementsByClassName("info")[0].innerText = playerNames[0].name1 + " won";
                }
                else {
                    document.getElementsByClassName("info")[0].innerText = playerNames[0].name2 + " won";
                }
                isgameover = "true";
                boxtext[e[0]].style.color = "red";
                boxtext[e[1]].style.color = "red";
                boxtext[e[2]].style.color = "red";
                gameover.play();
            }

        })
    }
}

reset.addEventListener("click", () => {
    let boxtext = document.querySelectorAll(".boxtext");
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
        turn = "X";
        document.getElementsByClassName("info")[0].innerHTML = "Turn for " + playerNames[0].name1;
    })
    isgameover = "false";
    gameLogic();
})

exit.addEventListener("click", (event) => {
    let boxtext = document.querySelectorAll(".boxtext");
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
        turn = "X";
        document.getElementsByClassName("info")[0].innerHTML = "Turn for " + playerNames[0].name1;
    })
    isgameover = "false";
    gameLogic();
    document.getElementById("abc").style.display = "flex";
    document.getElementById("xyz").style.display = "none";
    playerNames.splice(0,1);
    saveToLocalStorage();
})

function clearStorage(){
    let session=sessionStorage.getItem("register");
    if (session == null){
        playerNames.splice(0,1); 
        saveToLocalStorage();
    }
    sessionStorage.setItem("register",1);
}
window.addEventListener("load",clearStorage);