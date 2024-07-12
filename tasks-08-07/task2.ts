const redInput = document.querySelector('#red') as HTMLInputElement;
const greenInput = document.querySelector('#green') as HTMLInputElement;
const blueInput = document.querySelector('#blue') as HTMLInputElement;
const textDiv = document.querySelector('.text') as HTMLDivElement;


function changeColor(r: string,g: string,b: string){
  let arr = [ ...arguments].map((el)=>{
    let num = + el;
    return num.toString(16);
  });
  let str = arr.reduce((acc, cur)=>{
    return acc += cur;
  },'#');
  textDiv.style.color = str;
}

redInput.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  changeColor(target.value, greenInput.value, blueInput.value)
  })
greenInput.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  changeColor(redInput.value, target.value, blueInput.value)
  })
blueInput.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  changeColor(redInput.value, greenInput.value,target.value)
  })