
/* Global Variables */
const apiKey = "ca7ac655b2e15c8d34736322028a2e6f";
const openWeather = "https://api.openweathermap.org/data/2.5/weather?zip=";
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const city = document.querySelector("#city");
const inputcity = document.querySelector(".Icity");
const generate = document.querySelector("#generate");
const img = document.querySelector("img");
const figure = document.querySelector("figure");
const app = document.querySelector(".app");
const rmv = document.querySelector(".rmv");
const date = document.querySelector("#date");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'/'+ d.getDate()+'/'+ d.getFullYear();

function updateUI(data){
    img.src = data.image; 
    inputcity.innerHTML = data.city.toUpperCase() + ", " + data.country;
    temp.innerHTML = "Low "  + data.min + "°C  -  High " + data.max + "°C";
    description.innerHTML = data.description;
    app.classList.add("flip")
}

window.addEventListener("load", function(){
    console.log("window loaded");
    if(this.localStorage.getItem("data") != null){
        console.log("local storage is not empty");
        data = JSON.parse(localStorage.getItem("data"));
        updateUI(data);
    }else{
        console.log("local storage is empty");
    }
});

function loading(){

}

//fetch data
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

// get data from the server
// const retrieveData = async () =>{
//   const request = await fetch('/all');
//   return request.json();
// }
// get data from Api
// const getApiData=async(url)=>{
//     const response = await fetch(url)
//     try {   
//      const data =await response.json();  
//      console.log(data)
//      return data;
//     }catch (error){  
//      console.log("error",error);
//     }   
// }


// Click Events 

//Post Event
generate.addEventListener("click", async()=>{
  if(city.value == ''){
    alert("Please Enter a city name")
  } else if (date.value == ''){
    alert("Please Enter a date")
  } else {
    console.log(date.value);
    // send data to the server
    const object = await postData("/add", {city:city.value, date: date.value});
    if(object){
      localStorage.setItem("data", JSON.stringify(object));
      updateUI(object);
      // get data from the server and update the DOM 
      console.log(object)      
    }else{
      alert("something went wrong, please try again with another city name")
    }

  }
})

// Back Event
rmv.addEventListener("click", ()=>{
  localStorage.removeItem("data");
  app.classList.remove("flip")
})


