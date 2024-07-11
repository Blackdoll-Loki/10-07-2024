/*
const text1 = "Some long text"
const text2 = "Some text long "
const text3 = "long Some text"
const text4 = "Some long text"

let indexes = new Map();


function findIndex(text, sub) {
  let key = text + sub;
  if(indexes.has(key)){
    return indexes.get(key)
  } else {
    let idx = text.indexOf(sub);
    indexes.set(key, idx);
    return idx;
  }
}

findIndex(text1, 'long') // 5
findIndex(text2, 'long') // 5
findIndex(text3, 'long') 
findIndex(text4, 'long')

*/



const text1: string = "Some long text";
const text2: string = "Some text long ";
const text3: string = "long Some text";
const text4: string = "Some long text";

let indexes: Map<string, number> = new Map();

function findIndex(text: string, sub: string): number {
  let key: string = text + sub;
  if (indexes.has(key)) {
    return indexes.get(key) as number;
  } else {
    let idx: number = text.indexOf(sub);
    indexes.set(key, idx);
    return idx;
  }
}

console.log(findIndex(text1, 'long')); // 5
console.log(findIndex(text2, 'long')); // 5
console.log(findIndex(text3, 'long'));
console.log(findIndex(text4, 'long'));
