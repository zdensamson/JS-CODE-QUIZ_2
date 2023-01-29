// var number = 5;
// var triangle= function() {
//     let hash = ''
//     for (i=0; i<7; i++) {
//         hash = hash + '#'
//         console.log(hash);
//     }
// };
// var fizzBuzz = function() {
//     for (i=1; i<=100 ; i++) {
//         if (i%3 == 0 && i%5 ==0){
//             console.log('fizzbuzz')
//         } else if(i%3==0){
//             console.log('fizz');
//         } else if (i%5 == 0) {
//             console.log('buzz');
//         } else {
//             console.log(i);
//         }

//     }
// }
// let size = 10;
// var chessBoard = function(size) {
//     let rowOne = ' ';
//     let rowTwo = '#';
//     for(i=0; i<size; i++){
//         if(i%2 == 0) {
//             rowOne = rowOne + '#';
//             rowTwo = rowTwo + ' ';
//         } else {
//             rowOne = rowOne + ' ';
//             rowTwo = rowTwo + '#';
//         }
//     }
//     for(i=0; i<size; i++){
//         //console.log(i);
//         if(i%2 == 0){
//             console.log(rowOne);
//         } else {
//             console.log(rowTwo);
//         }
//     }
// }
// triangle();
// fizzBuzz();
// chessBoard(size);
// var findMin = function(a,b) {
//     if(a < b) {
//         console.log(a)
//     } else {
//         console.log(b)
//     }
// };
// var isEven = function(number) {
//     if(number < 0){
//         isEven(-1*number)
//     }
//     else if(number == 1){
//         console.log("ODD")
//     } else if(number == 0){
//         console.log("EVEN")
//     } else {
//         isEven(number - 2)
//     }
// }

var startBtnEl = document.querySelector(".start");
var timeBoxEl = document.querySelector(".timer");
var questionBoxEl = document.querySelector(".question");
var optionBoxEl = document.querySelector("#answer-container");

var answerObj = {
    "The Hulk": ["Spider Man", "Iron Man", "Super Man", "The Hulk"],
    "Spider Man": ["Nacho Libre", "Spider Man", "Mr. Fantastic", "Star Lord"],
    "The Batman": ["Ant Man", "Green Lantern", "The Batman", "Plastic Man"]
}
var questionList = ["Who is Bruce Banner", "Who is Peter Parker?","Who is Bruce Wayne"]

var questionBuilder = function(question, answer, options) {
    questionBoxEl.textContent = question;

    
    var optionEl = document.createElement("div");
    optionEl.className = "box"

}

var startQuiz = function(){

    var countDown = function(){
        var timeSecond = 100;
        const countDown = setInterval(() => {
            timeSecond--;
            timeBoxEl.innerHTML = timeSecond;
        }, 1000);
    }

    questionBoxEl.textContent = questionList[0];
    console.log(optionBoxEl.children)
    countDown();
}


startBtnEl.addEventListener("click",startQuiz);