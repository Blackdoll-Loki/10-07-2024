const express = require('express');
const app = express();
const port: number = 3000;

function createArr(length: number){
  let newArr: Array<number> = [];
  for (let i = 0; i < length; i++){
    newArr.push(Math.round(Math.random() * 100))
  }
  return newArr
}

app.get('/', (req, res) => {
  res.send('Enter adress /random or /random/:count');
})

app.get('/random', (req, res) => {
  let randomNumber = Math.round(Math.random() * 100);
  res.send(`Random number ${randomNumber}`);
})

app.get('/random/:\d+', (req, res) => {
  let arrLength = +req.path.replace(/\D/ig, '');
  let arr = createArr(arrLength);
  res.send(arr);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
