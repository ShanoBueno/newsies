var userFormEl = document.querySelector("#user-form");
var yearInputEl = document.querySelector("#year");
var monthInputEl = document.querySelector("#month")
var storyContainerEl = document.querySelector("#stories-container");
var saveContainerEl = document.querySelector("#save-container");
var monthYear = document.querySelector("#monthYear");
const monthNames = ["January","Feburary","March","April","May","June","July",
                    "August","September","October","November","December"];





//dispalys ten stories from the NYTIMES archive API

var displayStories = function (docs, yearSearchTerm, monthSearchTerm) {
  console.log(docs);
  console.log(yearSearchTerm);
  console.log(monthSearchTerm)
  
  storyContainerEl.innerHTML = "";
  yearSearchTerm.textContent = yearSearchTerm;
  monthSearchTerm.textContent = monthSearchTerm;
  let ul = document.createElement("ul");
  ul.className = "stories"

  //headline.main 
  //byline.original
let lines = 0
for (let {headline, byline, web_url} of docs){
  //console.log(headline, byline)
  let li = document.createElement("li")
  li.innerHTML = `<a href=${web_url} target="_blank">${headline.main}</a> ${byline.original}`
  ul.appendChild(li)
  if (++lines === 10){
    break; 
  }
}
  
  storyContainerEl.appendChild(ul);
 
}
//dynamically creates drop down menu for year
for (i = 1860; i < 2021; i++){
var x = document.getElementById("year");
var option = document.createElement("option");
option.text = i;
option.value = i; 
year.add(option);
}

  


var getUserRepos = function (year, month) {


  var year = yearInputEl.value.trim();
  var month = monthInputEl.value.trim();


 
  // format the github api url
  var apiUrl = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/" + year + "/" + month + ".json?api-key=soWGrPvUzUwXh7qusyJl3ZGfwnAr1AGJ"
  console.log(apiUrl)
  // make a request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok){
    response.json().then(function (result) {
      displayStories(result.response.docs, year, month)
      ;
    });
  } else {
      $('#myModal').modal('show');
  }
    
  });
  localStorage.setItem("year", year)
  localStorage.setItem("month", month)
  displayDates();
 
};

displayDates = function () {

  var yearSave = localStorage.getItem("year");
  var monthSave = localStorage.getItem("month");
  var ul = document.createElement("ul");
  var li = document.createElement("li")
  li.innerHTML=yearSave + "/" + monthSave
  ul.appendChild(li)
  saveContainerEl.appendChild(ul)
}

displayDates(); 




var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
  monthYear.innerText = `${monthNames[
    +monthInputEl.value-1]} ${yearInputEl.value}`
  getUserRepos(); 



};



userFormEl.addEventListener("submit", formSubmitHandler);


function addElement() {



  // adds today's date
  const todaysDate = document.createTextNode(moment().format('llll'));

  //appends to display under the greeting
  document.getElementById("currentDay").appendChild(todaysDate);


} 

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





addElement(); 