// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () { 
// TO-DO (1): Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TO-DO (2): Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TO-DO (3): Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TO-DO (4): Add code to display the current date in the header of the page.
    //I referenced activity 25 (DayJS-Format) for these lines of code.

});



function saveTask(hour) {
  var yourword = document.getElementById("myTextarea" + hour).value; //this is my text
  var hours = parseInt(dayjs().format("HH")); //Use HH for hours, but use mm for minutes and ss for seconds.

  if (hours > hour) //hours is from the clock, hour is from the stored place
  {
    console.log("You can not write");
  }
  else{
    localStorage.setItem(("task at " + hour), yourword); //saving on local storage
    console.log(yourword);
  }
 }
function readTask(hour) {
  var yourword = localStorage.getItem("task at " + hour); //read from local storage
  document.getElementById("myTextarea" + hour).value = yourword; //this is my text from my local storage

  console.log(yourword);
 }
 readTask(9);

//I changed my mind & decided to use miniproject's function as inspo for this display. Using military time will make time conversion easier.
var timeDisplayEl = $("#currentDay");
function displayTime() {
  var rightNow = dayjs().format("MMM DD, YYYY [at] HH:mm:ss ");
  timeDisplayEl.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);

//Create a function that will call an argument. One argument for the hour and another argument for IDs 
function findHour(last_2digits, id) {

  // console.log("This is the hour " + last_2digits);
  // console.log("This is the ID " +id);
  var hours = parseInt(dayjs().format("HH")); //Use HH for hours, but use mm for minutes and ss for seconds.
  
  //readTask(last_2digits);
  if (hours === last_2digits)
  {
    //console.log('present')
    document.getElementById(id).className = "row time-block present"
  }
  else if (hours > last_2digits)
  {
    document.getElementById(id).className = "row time-block past"
    //console.log('past')
  }
  else if (hours < last_2digits)
  {
    document.getElementById(id).className = "row time-block future"
    //console.log('future')
  }
}
//I create a function that checks the time and if the seconds are equal to 30, print to console log.
//THIS IS FOR TESTING PURPOSES~~~~~~~~~~~~~~~~~~~~~~~
function thirty(){

  ///Get all element by ids of the class row (inside of index.html). This is so that my static calendar works with my changing hours
  var ids_hours = document.getElementsByClassName('row');
  var hours = ids_hours.length;  
  //console.log(hours); //This should log the length/number of the hours in a workday

  for (var i=0; i<hours; i++) {//For Loop time (so that it updates every single hour of the workday)
    //console.log(ids_hours[i].id);  //for the first cycle (hour of the day: hour-09)
    var last_2chars = ids_hours[i].id.slice(-2); //Pluck the last 2 characters from "hour-09" string...which is 09)
    var last_2digits = parseInt(last_2chars); //Convert string to a number
    findHour(last_2digits, ids_hours[i].id);
    //console.log(last_2chars);
  }
}

function bindingButtons(buttonid,i){ //this connects the button with the function
  var save9El = document.querySelector(buttonid);
  save9El.addEventListener("click", function() {
    saveTask(i)
  });
}
function init(){ //this loop will start creating all of the buttons from 9-17 (work hours)
  for (var i=9; i<18; i++) {
    var buttonid = "#button"+i;
    bindingButtons(buttonid,i);
    readTask(i);

  }
}

init(); //start it up (upon refreshing)

setInterval(function(){
  thirty()
}, 60000); //1 minute to write & save work
