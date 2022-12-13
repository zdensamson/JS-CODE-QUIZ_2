var number = 5;

var twoFactorial= function(number) {
    newNum = 2;
    for (var i = 0; i < number -1; i++){
        newNum = newNum * 2;
    }
    console.log(newNum);
};


twoFactorial(number);