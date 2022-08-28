// query selectors
const buttons = document.querySelectorAll('[data-button]')
const screen = document.getElementById('input');

// global vars

let input = [];
let numbers = [];
const operations = ["^","x","/","+","-"];
let screenStr=[];
let interimResult;
let total;
// functions

// push the input into an array
function pushInput(ins) {
    // check if the value is a number or decimal, if so, concat it to the previous number
    const re = new RegExp('[0-9]');
    if (re.test(ins) || ins === '.' ){
        numbers += ins;
    // if the value is not a number, push the concatenated number to the input list
    }else{
        // cannot put two operators in a row
        if (numbers.length <=0){
            alert('you cannot insert two operators in a row!');
            return;
        }
        input.push(numbers);
        // reset number value to an empty list for the next number to be input
        numbers = []
        // push the operator into the list
        input.push(ins);
    }
    if (ins === "="){
        compute();
        input = [];
        numbers = [];
    }else{
        display();
    }
}

function compute(){
    // loop through operations in the order of operations
    operations.forEach(operation => {
        // check each value of the array to see if it equals one of the operations
        input.forEach((value, index) =>{
            // once an operation is found, call handleComputation and pass the operation and the index of that operation
            if (value === operation){
                console.log(index);
                handleComputation(operation, index)
            }
        });
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
}

function exponents(firstNum,secondNum){
    interimResult = (firstNum**secondNum).toFixed(2);
}

function multiplication(firstNum,secondNum){
    interimResult = (firstNum*secondNum).toFixed(2);
}

function division(firstNum,secondNum){
    interimResult = (firstNum*secondNum).toFixed(2);

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

function checkButton(){
    console.log('checked');
}
function display(){
    if (input.length === 0){
        screenStr = numbers;
    }else{
        screenStr = input.join('')+numbers;
    };
    screen.textContent = screenStr;

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