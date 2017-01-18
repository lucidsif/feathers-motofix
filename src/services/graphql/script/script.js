var rp = require('request-promise');
var jsonfile = require('jsonfile');

var file = './data.json'

var page1 = {
  uri: 'https://api.autodata-group.com/docs/motorcycles/v1/manufacturers?country-code=us&api_key=z66tkk6dh45n5a8mq4hvga6j'
}
var page2 = {
  uri: 'https://api.autodata-group.com/docs/motorcycles/v1/manufacturers?country-code=us&page=2&api_key=z66tkk6dh45n5a8mq4hvga6j'
}
var page3 = {
  uri: 'https://api.autodata-group.com/docs/motorcycles/v1/manufacturers?country-code=us&page=2&api_key=z66tkk6dh45n5a8mq4hvga6j'
}

var arr;
var obj = {name: 'sif'};

// Save

/*
jsonfile.writeFile(file, obj, function(err) {
  console.error(err);
});
*/
var manufacturers1;
var manufacturers2;
var manufacturers3;

function callPage1() {
  rp(page1)
    .then((response) => {
      var parsedArr = JSON.parse(response);
      manufacturers1 = parsedArr.data.map((manufacturerObj) => {
        return { [manufacturerObj.manufacturer]: manufacturerObj.manufacturer_id }
      });
      console.log(manufacturers1)
    });
}

function callPage2() {
  rp(page2)
    .then((response) => {
      var parsedArr = JSON.parse(response);
      manufacturers2 = parsedArr.data.map((manufacturerObj) => {
        return { [manufacturerObj.manufacturer]: manufacturerObj.manufacturer_id }
      });
      console.log(manufacturers2);
    });
}

function callPage3() {
  rp(page3)
    .then((response) => {
      var parsedArr = JSON.parse(response);
      manufacturers3 = parsedArr.data.map((manufacturerObj) => {
        return { [manufacturerObj.manufacturer]: manufacturerObj.manufacturer_id }
      });
      console.log(manufacturers3)
      arr = manufacturers1.concat(manufacturers2, manufacturers3)
      console.log(arr)
      jsonfile.writeFile(file, arr, function(err) {
        console.error(err);
      });
    })
    .catch((err) => {
      console.error(err);
    })
}
function start(){
  setTimeout(callPage1, 1000);
  setTimeout(callPage2, 4000);
  setTimeout(callPage3, 7000);
}
start();

