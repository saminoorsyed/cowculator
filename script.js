// query selectors
const buttons = document.querySelectorAll('[data-button]')
const screen = document.getElementById('input');
const cowSound = document.getElementById('cow-sound');
// global vars

let input = [];
let numbers = [];
const operations = ["^","x","/","+","-"];
let screenStr=[];
let interimResult;
let total;
let deciFlag = false;
// functions

function moo(){
    console.log('hello');
    cowSound.currentTime = 0; //rewinds to start when key is hit
    cowSound.play(); // plays audio element from query selector
}

// push the input into an array
function pushInput(ins) {
    // check if the value is a number or decimal, if so, concat it to the previous number
    const re = new RegExp('[0-9]');
    if (re.test(ins) || ins === '.' ){
        if (ins ==="." && numbers.includes(".")){
            moo();
            alert("you can't include more than one decimal in a number");
            return;
        }
        numbers += ins;
    // if the value is not a number, push the concatenated number to the input list
    }else{
        // cannot put two operators in a row
        if (numbers.length <=0){
            moo();
            alert("You can't insert an operator here");
            return;
        }
        input.push(numbers);
        // reset number value to an empty list for the next number to be input
        numbers = []
        // push the operator into the list
        input.push(ins);
    }

    if (ins === "="){
        if (input.length === 2){
            console.log('hel');
            numbers = input[0]
            input = [];
            return
        }
        compute();
        input = [];
        numbers = interimResult.toString();
    }else{
        display();
    }
}

function compute(){
    // loop through operations in the order of operations
    operations.forEach(operation => {
        // check each value of the array to see if it equals one of the operations
         // input.forEach((value, index) =>{
        for (i = 0; i<input.length; i++)
            // once an operation is found, call handleComputation and pass the operation and the index of that operation
            if (input[i] === operation){
                console.log(i);
                handleComputation(operation, i)
                // once a computation has ocurred, step the index back once to account for missing values
                i--
            }
    });
    display();
}

function handleComputation(operation, index){
    const firstNum = parseFloat(input[index-1]);
    const secondNum =parseFloat(input[index+1]);
    if (operation === "^"){
        exponents(firstNum,secondNum);
    }else if (operation === "x"){
        multiplication(firstNum,secondNum);
    }else if (operation === "/"){
        division(firstNum,secondNum);
    }else if (operation === "+"){
        addition(firstNum,secondNum);
    }else if (operation === "-"){
        subtraction(firstNum,secondNum);
    }
    input.splice(index,2);
    input[index-1] = interimResult.toString();
    console.log(input);
}

function exponents(firstNum,secondNum){
    interimResult = (firstNum**secondNum).toFixed(2);
}

function multiplication(firstNum,secondNum){
    interimResult = (firstNum*secondNum).toFixed(2);
}

function division(firstNum,secondNum){
    interimResult = (firstNum/secondNum).toFixed(2);

}

function addition(firstNum,secondNum){
    interimResult = (firstNum+secondNum).toFixed(2);
}

function subtraction(firstNum,secondNum){
    interimResult = (firstNum-secondNum).toFixed(2);
}

function clearAll(){
    input = [];
    numbers = [];
    display();
}

function toggleNeg(){
    if (parseFloat(numbers)<0){
        numbers = numbers.slice(1);
    }else{
        numbers = "-"+numbers;
    }
    display();
}

function display(){
    if (input.length === 0){
        screenStr = numbers;
    }else{
        screenStr = input.join('')+numbers;
    };
    screen.textContent = screenStr;

}

function del(){
    if (numbers.length >0){
        numbers = numbers.slice(0,-1);
    }else if (input.length >0){
        if (operations.includes(input[-1])) {
            input.pop();
        }else{
            input.pop();
            numbers = input.pop();
            console.log({input, numbers});
        }
    }
    display();
}
// listen for key codes to press buttons
window.addEventListener('keyup', (e)=>{
    buttons.forEach(butt =>{
        if (butt.dataset.button === e.key){
            butt.click();
            butt.classList.add('active');
            setTimeout(()=>butt.classList.remove('active'),200);
        }
    });
});