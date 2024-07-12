const redInput = document.querySelector('#red');
const greenInput = document.querySelector('#green');
const blueInput = document.querySelector('#blue');
const textDiv = document.querySelector('.text');

console.log(
  `red ${red.value}
  green ${green.value}
  blue ${blue.value}`
)

function changeColor(r,g,b){
  let arr = [ ...arguments].map((el)=>{
    let num = + el;
    return num.toString(16);
  });
  let str = arr.reduce((acc, cur)=>{
    return acc += cur;
  },'#');
  textDiv.style.color = str;
}

redInput.addEventListener('input', (e) => changeColor(e.target.value, green.value, blue.value))
greenInput.addEventListener('input', (e) => changeColor(red.value, e.target.value, blue.value))
blueInput.addEventListener('input', (e) => changeColor(red.value, green.value, e.target.value))
