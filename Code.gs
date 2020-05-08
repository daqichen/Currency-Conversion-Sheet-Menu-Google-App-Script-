function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Get Exchange Rate(s)')
      .addItem('From a base To another currency', 'instruction1')
      .addItem('From a base To all other currencies', 'instruction2')
      .addToUi();
}

function instruction1(){
  var ins = "Use function 'getExRate(base, target)' to convert one currency to another";
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(sheet.getLastRow()+1,1).setValue(ins);
}

function instruction2(){
  var ins = "Use function 'getAllExRate(base, target)' to convert one currency to all other currencies";
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(sheet.getLastRow()+1,1).setValue(ins);
}

//function callNumbers() {
//  
//  // Call the Numbers API for random math fact
//  var response = UrlFetchApp.fetch("http://numbersapi.com/random/math");
// 
////  var result = getExRate("USD", "EUR");
////  Logger.log(result);
//  
//  var json = JSON.parse(response.getContentText());
//
//  var fact = response.getContentText();
//  var sheet = SpreadsheetApp.getActiveSheet();
//  sheet.getRange(sheet.getLastRow()+1,1).setValue([fact]);
//  
//}

function getExRate(base,target){
  var response = UrlFetchApp.fetch("https://api.exchangeratesapi.io/latest?base=" + base);
  var content = response.getContentText();
  
  var fullJson = JSON.parse(content);
  var result = fullJson["rates"][target];
  
  if (result === "null") {
    return 1;
  } else {
    return result;
  }
} 

function getAllExRate(base){
  var response = UrlFetchApp.fetch("https://api.exchangeratesapi.io/latest?base=" + base);
  var content = response.getContentText();
  
  var fullJson = JSON.parse(content);
  var json = fullJson["rates"];
  
  if (typeof(json) === "undefined") {
    return "Undefined Currency Representation";
    
    
  } else if (typeof(json) === "object"){
    var list = [];
    for (var obj in json) {
      list.push([obj, json[obj]]);
    }
    return list;
    
    
  } else if (typeof(json) !== "object"){
    return json;
  }
  
}
