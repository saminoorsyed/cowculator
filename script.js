// query selectors
const buttons = document.querySelectorAll('[data-button]')
const screen = document.getElementById('input');

// global vars

let input = [];
let numbers = [];
const operation = [];
let result;
// functions

// push the input into an array
function pushInput(ins) {
    // check if the value is a number or decimal, if so, concat it to the previous number
    const re = new RegExp('[0-9]');
    if (re.test(ins) || ins === '.' ){
        numbers += ins;
        console.log(numbers);
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
        console.log(input);
    }
}

function compute(){

}
function display(){
    screen.textContent = input.join('');
    console.log(input);
}
// listen for key codes to press buttons
window.addEventListener('keyup', (e)=>{
    console.log(e.key);
    buttons.forEach(butt =>{
        if (butt.dataset.button === e.key){
            butt.click();
            butt.classList.add('active');
            setTimeout(()=>butt.classList.remove('active'),200);
        }
    });
});