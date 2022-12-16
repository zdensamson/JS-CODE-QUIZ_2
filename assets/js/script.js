var number = 5;

var triangle= function() {
    let hash = ''
    for (i=0; i<7; i++) {
        hash = hash + '#'
        console.log(hash);
    }
};

var fizzBuzz = function() {
    for (i=1; i<=100 ; i++) {
        if (i%3 == 0 && i%5 ==0){
            console.log('fizzbuzz')
        } else if(i%3==0){
            console.log('fizz');
        } else if (i%5 == 0) {
            console.log('buzz');
        } else {
            console.log(i);
        }

    }
}

let size = 10;
var chessBoard = function(size) {
    let rowOne = ' ';
    let rowTwo = '#';

    for(i=0; i<size; i++){
        if(i%2 == 0) {
            rowOne = rowOne + '#';
            rowTwo = rowTwo + ' ';
        } else {
            rowOne = rowOne + ' ';
            rowTwo = rowTwo + '#';
        }
    
    }

    for(i=0; i<size; i++){
        //console.log(i);
        if(i%2 == 0){
            console.log(rowOne);
        } else {
            console.log(rowTwo);
        }
    }
}
triangle();
fizzBuzz();
chessBoard(size);