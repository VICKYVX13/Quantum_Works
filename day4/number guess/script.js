let maxNumber = 50;
let secretNumber = Math.floor(Math.random() * maxNumber) + 1;

let attempts = 0;
let score = 100;

let bestScore = localStorage.getItem("bestScore") || 0;

document.getElementById("bestScore").textContent = bestScore;

function setDifficulty(level){

    if(level === "easy"){
        maxNumber = 50;
    }

    if(level === "medium"){
        maxNumber = 100;
    }

    if(level === "hard"){
        maxNumber = 200;
    }

    document.getElementById("range").textContent =
    `Range: 1 - ${maxNumber}`;

    restartGame();
}

function checkGuess(){

    let guess =
    Number(document.getElementById("guessInput").value);

    if(!guess){
        document.getElementById("message").textContent =
        "⚠ Please enter a number!";
        return;
    }

    attempts++;
    score -= 5;

    document.getElementById("attempts").textContent =
    attempts;

    document.getElementById("score").textContent =
    score;

    let li = document.createElement("li");
    li.textContent = guess;

    document.getElementById("history")
    .appendChild(li);

    if(guess === secretNumber){

        document.getElementById("message").textContent =
        `🎉 You Won! Number was ${secretNumber}`;

        if(score > bestScore){

            bestScore = score;

            localStorage.setItem(
                "bestScore",
                bestScore
            );

            document.getElementById(
                "bestScore"
            ).textContent = bestScore;
        }
    }
    else if(guess < secretNumber){

        document.getElementById("message").textContent =
        "📉 Too Low!";
    }
    else{

        document.getElementById("message").textContent =
        "📈 Too High!";
    }

    document.getElementById("guessInput").value = "";
}

function showHint(){

    let hint = "";

    if(secretNumber % 2 === 0){
        hint += "Number is EVEN. ";
    }
    else{
        hint += "Number is ODD. ";
    }

    if(secretNumber > maxNumber/2){
        hint += "Upper Half Range.";
    }
    else{
        hint += "Lower Half Range.";
    }

    alert("💡 Hint: " + hint);
}

function restartGame(){

    secretNumber =
    Math.floor(Math.random()*maxNumber)+1;

    attempts = 0;
    score = 100;

    document.getElementById("attempts").textContent = 0;
    document.getElementById("score").textContent = 100;

    document.getElementById("message").textContent =
    "🎯 New Game Started!";

    document.getElementById("history").innerHTML = "";
    document.getElementById("guessInput").value = "";
}

function toggleTheme(){
    document.body.classList.toggle("dark");
}

document
.getElementById("guessInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        checkGuess();
    }
}); 