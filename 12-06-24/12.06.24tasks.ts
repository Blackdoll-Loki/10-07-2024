import { type } from "os";

/*// Напишите функцию, которая принимает массив названий городов
// и возвращает обьект, у которого ключи - первые буквы названий 
// городов и значение - массив названий городов с одной букви


let arr = [
  'Lviv', 'Kyiv', 'Odessa',
  'New York', 'Portland', 'Miami', 'Chicago',
  'London', 'Edinburgh', 'Manchester',
  'Berlin', 'Drezden',
];

function sortCitiesByAlphabeth(arr){
  return arr.reduce((acc, cur)=>{
    if(!acc[cur[0]]){
      acc[cur[0]] = [];
    }
     acc[cur[0]].push(cur)
     return acc
  }, {})
}

// Напишите функцию которая на входе получает массив строк и на выходе выдает обьект где ключами служат уникальные слова а значениями число того сколько раз они встречаются в массиве.

const arr = [
  "red green red",
  "orange red green",
  "green black orange",
  "green red",
];

console.log(countUniqueWords(arr));

// {
//     "red": 4,
//     "green": 4,
//     "orange": 2,
//     "black": 1,
// }

function countUniqueWords(arr) {
  return arr.reduce((acc, cur)=>{

    let arrOfWordsOfString = cur.split(' ');

    for (let word of arrOfWordsOfString){
      if(!acc[word]){
        acc[word] = 0;
      }
      acc[word] = acc[word] + 1;
    }

    return acc;
  },{})
}

function countUniqueWords(arr){
  let newArr = arr.join(' ').split(' ');
  return newArr.reduce((acc, cur)=>{
    if(!acc[cur]){
      acc[cur] = 0
    } 
    acc[cur] += 1
    return acc;
  }, {})
}
*/

let arr: string[] = [
  'Lviv', 'Kyiv', 'Odessa',
  'New York', 'Portland', 'Miami', 'Chicago',
  'London', 'Edinburgh', 'Manchester',
  'Berlin', 'Drezden',
];

function sortCitiesByAlphabeth(arr: string[]): Record<string, string[]> {
  return arr.reduce((acc: Record<string, string[]>, cur: string) => {
    const firstLetter = cur[0];
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(cur);
    return acc;
  }, {});
}

const arr2: string[] = [
  "red green red",
  "orange red green",
  "green black orange",
  "green red",
];

function countUniqueWords(arr: string[]): Record<string, number> {
  return arr.reduce((acc: Record<string, number>, cur: string) => {
    let arrOfWordsOfString: string[] = cur.split(' ');

    for (let word of arrOfWordsOfString) {
      if (!acc[word]) {
        acc[word] = 0;
      }
      acc[word] += 1;
    }

    return acc;
  }, {});
}

function countUniqueWords2(arr: string[]){
  let newArr = arr.join(' ').split(' ');
  return newArr.reduce((acc: Record<string, number>, cur: string)=>{
    if(!acc[cur]){
      acc[cur] = 0
    } 
    acc[cur] += 1
    return acc;
  }, {})
}
