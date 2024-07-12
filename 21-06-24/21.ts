import { type } from "os";

/*let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
let testData3 = [{"name":"Vasya","email":"vasya@example.com","age":20,"skills":{"php":0,"js":-1,"madness":10,"rage":10}},{"name":"Dima","email":"dima@example.com","age":34,"skills":{"php":5,"js":7,"madness":3,"rage":2}},{"name":"Colya","email":"colya@example.com","age":46,"skills":{"php":8,"js":-2,"madness":1,"rage":4}},{"name":"Misha","email":"misha@example.com","age":16,"skills":{"php":6,"js":6,"madness":5,"rage":2}},{"name":"Ashan","email":"ashan@example.com","age":99,"skills":{"php":0,"js":10,"madness":10,"rage":1}},{"name":"Rafshan","email":"rafshan@example.com","age":11,"skills":{"php":0,"js":0,"madness":0,"rage":10}}]
let testData4 = [{"name":"Vasya","email":"vasya@example.com","age":20},{"name":"Dima","email":"dima@example.com","age":34},{"name":"Colya","email":"colya@example.com","age":46},{"name":"Misha","email":"misha@example.com","age":16},{"name":"Ashan","email":"ashan@example.com","age":99},{"name":"Rafshan","email":"rafshan@example.com","age":11},1,2,1990,85,24,"Vasya","colya@example.com","Rafshan","ashan@example.com",true,false,[[[[1,2,1990,85,24,"Vasya","colya@example.com","Rafshan","ashan@example.com",true,false,[{"name":"Rafshan","email":"rafshan@example.com","age":11}]]]]]]

//8. Сделать функцию которая обрезает массив до указанного значения.
//Синтаксис: array_skip_until(arr: array, value: any): any[]
//Пример: 
let result = array_skip_until(testData, 2) // [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
let result2 = array_skip_until(testData, "Rafshan") // ["Rafshan", "ashan@example.com", true, false]
let result3 = array_skip_until(testData, "asd") // []

function array_skip_until(arr, value){
  let idx = arr.indexOf(value)
  if(idx >= 0){
    return arr.slice(idx);
  }
  return [];
}

//9. Создать функцию которая нормализует данные в массиве исключая или преобразуя не подходящие.
Доступные шаблоны: 
'string' => строки, 
'number' => числа, 
'int' => целые числа, 
'float' => числа с плавающей точкой, 
'bool' => true | false, 
'function' => функция, 
'array' => массив, 
Object => объект {name: 'string'}
Синтаксис: array_normalize(arr: array, shema: string|Object[, transform: bool = false]): any[]
Пример: 
let result = array_normalize(testData4, 'string') // ['Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
let result2 = array_normalize(testData4, 'string', true) // ['1', '2', '1990', '85', '24', 'Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
let result3 = array_normalize(testData4, {age: 'float'}) // []
let result4 = array_normalize(testData4, {age: 'float'}, true) // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]

function array_normalize(arr, schema, transform = false) {
  function transformValue(el, type) {
    switch (type) {
      case 'string': 
        return (typeof el === 'number' || typeof el === 'string')? String(el) : undefined;
      case 'number':
        return Number(el);
      case 'int':
        return Number.isInteger(el) ? el : parseInt(el, 10);
      case 'float':
        return parseFloat(el);
      case 'bool':
        return typeof el === 'string' ? el.toLowerCase() === 'true' || el === '1' : Boolean(el);
      case 'function':
        return typeof el === 'function' ? el : undefined;
      case 'array':
        return Array.isArray(el) ? el : undefined;
      case 'Object':
        return typeof el === 'object' ? el : undefined;
      default:
        return undefined;
    }
  }

  if (typeof schema === 'string' && transform === true) {
    return arr.map((el) => transformValue(el, schema)).filter((el) => el !== undefined);
  } else if (typeof schema === 'string') {
    return arr.filter((el) => typeof el === schema);
  } else if (typeof schema === 'object' && transform) {
    return arr.map((el) => {

      if(typeof el === 'object' && !Array.isArray(el)){
        const transformedObject = {};
        let isValid = true;
  
        for (let key in schema) {
          const value = el[key];
          const type = schema[key];
  
          const transformedValue = transformValue(value, type);
          if (transformedValue !== undefined) {
            transformedObject[key] = transformedValue;
          } else {
            isValid = false;
            break;
          }
        }
        return isValid ? transformedObject : undefined;
      }
    }).filter((el) => el !== undefined);
  } else if (typeof schema === 'object') {
    return arr.filter((el) => {
      let isValid = true;
      for (let key in schema) {
        if (typeof el[key] !== schema[key]) {
          isValid = false;
          break;
        }
      }
      return isValid;
    });
  }
}


11. Сделать функцию которая сможет делать срез данных с ассоциативного массива.
Синтаксис: array_pluck(arr: array, path: string): any[]
Пример:
let result = array_pluck(testData3, 'name') // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
let result2 = array_pluck(testData3, 'skills.php') // [0, 5, 8, 6, 0, 0]

function array_pluck(arr, path){
  let keysOfPath = path.split('.');
  let newArr = arr.map((obj)=>{
    let property = obj
    keysOfPath.forEach((key)=>{
      property = property[key];
    })
    return property
  }).filter((el) => el !== undefined)
  return newArr;
}

12. Создать функцию которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.
Синтаксис: array_combine(keys: array, values: array): Object
Пример: 
let result = array_combine(testData, testData2) // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}

function array_combine(keys, values){
  let obj = {};
  for ( let i  = 0; i < keys.length; i++){
    if(typeof keys[i] !== 'boolean'){
      obj[keys[i]] = values[i];
    }
  }
  return obj;
}*/
type data1 = Array<number | string | boolean>

function array_skip_until(arr: data1, value: number): data1 {
  let idx: number = arr.indexOf(value)
  if(idx >= 0){
    return arr.slice(idx);
  }
  return [];
}

type skillsObj = {
  php:number,
  js:number,
  madness:number,
  rage:number
}

type data3Obj = {
  name: string,
  email: string,
  age: number,
  skills?: skillsObj
}
function array_pluck(arr: data3Obj[], path:string){
  let keysOfPath = path.split('.');
  let newArr = arr.map((obj)=>{
    let property = obj
    keysOfPath.forEach((key)=>{
      property = property[key];
    })
    return property
  }).filter((el) => el !== undefined)
  return newArr;
}

type validKeys = Array<string | number>

function array_combine(keys: validKeys, values: validKeys){
  let obj = {};
  for ( let i  = 0; i < keys.length; i++){
    if(typeof keys[i] !== 'boolean'){
      obj[keys[i]] = values[i];
    }
  }
  return obj;
}