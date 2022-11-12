
/* Global Variables */
const apiKey = "ca7ac655b2e15c8d34736322028a2e6f";
const openWeather = "https://api.openweathermap.org/data/2.5/weather?zip=";
const countdown = document.querySelector(".countdown");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const city = document.querySelector("#city");
const inputcity = document.querySelector(".Icity");
const generate = document.querySelector("#generate");
const img = document.querySelector("img");
const figure = document.querySelector("figure");
const app = document.querySelector(".app");
const rmv = document.querySelector(".rmv");
const depdate = document.querySelector("#depdate");
const retdate = document.querySelector("#retdate");
const ret = document.querySelector(".ret");
const Idate = document.querySelector(".Idate");
const _loading = document.querySelector(".loading");
let _dateDiff = "";

// Create a new date instance dynamically with JS
let d = new Date();
let today = dateFormat(d)

// update the DOM take an object as a parameter
function updateUI(data){
    _dateDiff = dateDiff(new Date(data.date), new Date(today));
    img.src = data.image; 
    countdown.innerHTML ="Your trip is in " + _dateDiff + " days";
    inputcity.innerHTML = data.city.toUpperCase() + ", " + data.country;
    Idate.innerHTML = data.date;
    temp.innerHTML = "Low "  + data.min + "°C  -  High " + data.max + "°C";
    description.innerHTML = data.description;
    app.classList.add("flip")
}

// change the data Format from mm-dd-yyyy to yyyy-mm-dd
function dateFormat(data){
    let date = new Date(data);
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return year + "-" + month + "-" + day;
}

const minDate = dateFormat(d);
const maxDate = dateFormat(d.setDate(d.getDate() + 15));


// calculate the difference between two dates
function dateDiff(date1, date2){
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Loading animation 
function loading(_switch){
  if(_switch == "on" || _switch == true){
    _loading.classList.add("loadingOn");
    _loading.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
  }else{
    _loading.classList.remove("loadingOn");
    _loading.innerHTML = "";
  }
}

//fetch data function
const postData = async (url = "", data = {})=>{
    const response = await fetch(url,{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)   
    })
    try {
      const Data = await response.json();
      return Data;
    } catch (error) {
      console.log("error", error);
    }
}

// Laod function start on load event
function load(){
    console.log("window loaded");
    depdate.min = minDate;
    depdate.max = maxDate;
    if(localStorage.getItem("data") != null){
        console.log("local storage is not empty");
        const data = JSON.parse(localStorage.getItem("data"));
        updateUI(data);
    }else{
        console.log("local storage is empty");
    }
}

// function to set the depart date 
function depdateClick(){
  ret.classList.add("active")
  const start_date = this.value;
  retdate.min = start_date;
  retdate.max = maxDate;
  console.log(start_date);
}

// Generate function start on click event
async function generateClick(){
  if(city.value == ''){
    alert("Please Enter a city name")
  } else if (depdate.value == '' || depdate.value < today || retdate.value == '' || retdate.value < today || retdate.value < depdate.value){
    alert("Please Enter a valid date (15 days from today)")
  } else {
    console.log(depdate.value);
    // send data to the server
    loading("on");
    const object = await postData("http://localhost:8082/add", {city:city.value, depdate: depdate.value});
    loading("off");
    if(object){
      localStorage.setItem("data", JSON.stringify(object));
      updateUI(object);
      // get data from the server and update the DOM 
      console.log(object)      
    }else{
      alert("something went wrong, please try again with another city name")
    }
  }
}

//function back to front page and remove the trip
function backClick(){
  localStorage.removeItem("data");
  app.classList.remove("flip");
  retdate.value = "";
  ret.classList.remove("active");
}


export{load, depdateClick, generateClick, backClick, dateFormat, dateDiff}




