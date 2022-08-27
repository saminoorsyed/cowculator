// query selectors
const buttons = document.querySelectorAll('[data-button]')
const screen = document.getElementById('input');

// global vars

let input = [];
let operation;
let result;
// functions

function pushInput(ins) {
    input.push(ins);
    console.log(input);
    display();
}

function display(){
    screen.textContent = input.join('');
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