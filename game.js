let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // playerX , playerO
let count = 0 // To Track Draw

//Winning Patterns
const winPatterns = [
    [0 , 1 , 2],
    [0 , 3 , 6],
    [0 , 4 , 8],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [2 , 4 , 6],
    [3 , 4 , 5],
    [6 , 7 , 8]
];

// Reset Game
const resetGame = () =>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

// Add Click Event to all boxes
boxes.forEach((box)=>{
    box.addEventListener("click" , ()=>{
        if(turn0){
            //playerO
            box.innerText = '◯';
            turn0 = false;
        }else{
            //playerX
            box.innerText = '✕'
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

// Game Draw
const gameDraw = ()=>{
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// Disable all boxes
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

// Enable all boxes
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

// Show Winner
const showWinner = (winner) =>{
    msg.innerText = `Congratulations🎉🎊,\n winner is ${winner}`
    msgContainer.classList.remove("hide");
    disableBoxes()
}

// Check Winner
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){

                showWinner(pos1Val);
            }
        }
    }
};
newGameBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame);
