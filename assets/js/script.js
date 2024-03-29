// case for timer hitting 0 
// localStorage of scores
// ranking scores
// restarting game 


// var gameEl = document.querySelector("#game-shell");
var gameEl = document.querySelector(".action-box");
var startBtnEl = document.querySelector(".start");
var timeBoxEl = document.querySelector(".timer");
var scoreBtnEl = document.querySelector(".hi-scores");
// var questionBoxEl = document.querySelector(".question");

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
var gameWinFlag = 0;

var gameBuilder = function() {
    var qBox = document.createElement("h1");
    qBox.setAttribute("id", "question-container");
    gameEl.append(qBox);

    var aBox = document.createElement("div");
    aBox.setAttribute("id", "answer-container");
    gameEl.append(aBox);

    var rBox = document.createElement("div");
    rBox.setAttribute("class", "response");
    gameEl.append(rBox);    

    aBox.addEventListener("click",selectedAnswerHandler);
}

var questionQueue = function(qNumber) {
    questionBuilder(questionList[qNumber]);
    optionBuilder(Object.keys(answerObj)[qNumber],Object.values(answerObj)[qNumber]);
};

var questionBuilder = function(question) {
    var questionEl = document.querySelector('#question-container')
    questionEl.textContent = question;
};

var optionBuilder = function(answer, options) {
    var optionBoxEl = document.querySelector('#answer-container');
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
    var responseBoxEl = document.querySelector('.response');

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
    }
};

var gameWin = function(){
    if(timeSecond < 0) {
        timeSecond = 0;
    }
    timerHandler(1);
    timeBoxEl.innerHTML = 0;
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

var timerHandler = function(gameStatus){
    var cd2 = function(){
        timeSecond--;
        timeBoxEl.innerHTML = timeSecond;
    };
    var cdEx = setInterval(cd2, 1000);
    if(gameStatus == 1){
        console.log('GAME WIN')
        debugger;
        clearInterval(cdEx);
    }
}

var startQuiz = function(){
    console.log('start this ish')
    gameEl.innerHTML = '';
    gameBuilder(0);
    gameActive = 1;


    questionNumber = 0;
    questionQueue(questionNumber);
    timerHandler(0);
};

var submitFormHandler = function(event){
    if(timeSecond < 0){
        timeSecond = 0;
    }
    event.preventDefault();
    var currentName = document.querySelector("input[name='player-name']").value;
    var oldScore = localStorage.getItem("scores");
    if(oldScore == null){
        players.push ({name: currentName, score: timeSecond});
        savePlayer(players);
    } else {
        scoreList = JSON.parse(oldScore);
        for(var i = 0; i < scoreList.length; i++){

            players.push(scoreList[i]);
        
        }
        // players.push(JSON.parse(oldScore));
        players.push ({name: currentName, score: timeSecond});
        savePlayer(players);
    }



};

var savePlayer = function(saveGameObj) {
    console.log(saveGameObj);
    // var oldScore = localStorage.getItem("scores");
    // players.push(oldScore);
    // // players.push(saveGameObj);
    localStorage.setItem("scores", JSON.stringify(players));
    viewScores();
}

var deleteAllScores = function(){
    localStorage.clear();
}

var viewScores = function(){
    gameEl.innerHTML='';
    var scoreRanking = JSON.parse(localStorage.getItem("scores"));

    if(scoreRanking == null){
        var noScoreMessage = document.createElement("div");
        noScoreMessage.textContent = 'NO SCORES TO DISPLAY';
        gameEl.append(noScoreMessage);
    } else {
    for(var i = 0; i < scoreRanking.length; i++){
        var scoreBox = document.createElement("div");
        scoreBox.textContent = `PLAYER: ${scoreRanking[i].name} /// TIME SCORE: ${scoreRanking[i].score}`;
        gameEl.append(scoreBox);
        } 
    }

    var deleteScoreBtn = document.createElement("button");
    deleteScoreBtn.textContent = "Delete all scores?"
    gameEl.append(deleteScoreBtn);
    deleteScoreBtn.addEventListener("click", deleteAllScores);
};

startBtnEl.addEventListener("click",startQuiz);
scoreBtnEl.addEventListener("click",viewScores);

// aBox.addEventListener("click",selectedAnswerHandler);