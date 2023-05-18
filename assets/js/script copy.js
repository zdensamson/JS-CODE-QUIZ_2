// case for timer hitting 0 
// localStorage of scores
// ranking scores
// restarting game 


var gameEl = document.querySelector("#game-shell");
var startBtnEl = document.querySelector(".start");
var timeBoxEl = document.querySelector(".timer");
var questionBoxEl = document.querySelector(".question");
var optionBoxEl = document.querySelector("#answer-container");
var responseBoxEl = document.querySelector(".response");
var exampleBoxEl = document.querySelector("#example");
var players = [];

var answerObj = {
    "The Hulk": ["Spider Man", "Iron Man", "Super Man", "The Hulk"],
    "Spider Man": ["Nacho Libre", "Spider Man", "Mr. Fantastic", "Star Lord"],
    "The Batman": ["Ant Man", "Green Lantern", "The Batman", "Plastic Man"]
};

var questionList = ["Who is Bruce Banner", "Who is Peter Parker?","Who is Bruce Wayne"];
var questionNumber = 0;
var timeSecond = 100;
var gameActive = 0;
var errorCount = 0;

var questionQueue = function(qNumber) {
    questionBuilder(questionList[qNumber]);
    optionBuilder(Object.keys(answerObj)[qNumber],Object.values(answerObj)[qNumber]);
};

var questionBuilder = function(question) {
    questionBoxEl.textContent = question;
};

var optionBuilder = function(answer, options) {
    optionBoxEl.innerHTML = ''
    for(var i = 0; i < options.length; i++){
        var optionEl = document.createElement("div");
        optionEl.className = "box";
        if(options[i] == answer) {
            optionEl.setAttribute("data-boolean", "correct");
        } 
        optionEl.textContent = options[i];
        optionBoxEl.append(optionEl);
    }

};

var selectedAnswerHandler = function(event) {

    var targetEl = event.target;

    if (targetEl.getAttribute("data-boolean") == "correct") {
        responseBoxEl.textContent = "CORRECT";
        questionNumber ++;
        if(questionNumber == questionList.length) {
            gameWin();
        } 
        else {
            questionQueue(questionNumber);
        }
    }
    else {
        responseBoxEl.textContent = "INCORRECT";
        timeSecond = timeSecond -10;
        errorCount ++;
    }
    if(timeSecond < 0 || timeSecond == 0) {
        gameWin();
        console.log("negative")
    }
};

var gameWin = function(){
    if(timeSecond < 0) {
        timeSecond = 0;
    }
    gameEl.innerHTML = "";
    gameEl.textContent = `You got a score of ${timeSecond} seconds, and guessed incorrectly ${errorCount} time(s) `
    var scoreForm = document.createElement("form");
    scoreForm.setAttribute("action", "");
    var scoreInput = document.createElement("input");
    var scoreSubmit = document.createElement("button");
    scoreInput.setAttribute("name","player-name");
    scoreSubmit.setAttribute("type", "submit");
    scoreSubmit.textContent = "Submit score";

    scoreForm.appendChild(scoreInput);
    scoreForm.appendChild(scoreSubmit);
    gameEl.appendChild(scoreForm);
    scoreForm.addEventListener("submit", submitFormHandler);
};

var startQuiz = function(){
    
    gameActive = 1;
    var countDown = function(){
       
        const countDown = setInterval(() => {
            timeSecond--;
            timeBoxEl.innerHTML = timeSecond;
        }, 1000);
    }
    questionQueue(questionNumber);
    countDown();
};

var submitFormHandler = function(event){
    if(timeSecond < 0){
        timeSecond = 0;
    }
    event.preventDefault();
    var currentName = document.querySelector("input[name='player-name']").value;
    players.push ({name: currentName, score: timeSecond});
    savePlayer(players);


};

var savePlayer = function(saveGameObj) {
    console.log(saveGameObj);
    localStorage.setItem("scores", JSON.stringify(saveGameObj));
}

startBtnEl.addEventListener("click",startQuiz);
optionBoxEl.addEventListener("click",selectedAnswerHandler);