
/* Global Variables */
const apiKey = "ca7ac655b2e15c8d34736322028a2e6f";
const openWeather = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const city = document.querySelector("#city");
const generate = document.querySelector("#generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();


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
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
}

// get data from the server
const retrieveData = async () =>{
 const request = await fetch('/all');
 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData)
 // Write updated data to DOM elements
 city.innerHTML = 'City: ' + allData.city + ", " + allData.country;
 temp.innerHTML = 'Temperature: ' + Math.round(allData.temp) + ' °C';
 //content.innerHTML = 'I Feel: ' + allData.feeling;
 date.innerHTML = 'Date: ' + allData.date;
 }
 catch(error) {
   console.log("error", error);
 }
}

// get data from Api
const getApiData=async(url)=>{
    const response = await fetch(url)
    try {   
     const data =await response.json();  
     console.log(data)
     return data;
    }catch (error){  
     console.log("error",error);
    }   
}


// Click Event 
generate.addEventListener("click", ()=>{
  if(isNaN(zip.value) || zip.value == ''){
    alert("Please Enter a zip code")
  } else{
    const URL = `${openWeather}${zip.value}&appid=${apiKey}&units=metric`;
    // send data to the server
    getApiData(URL)
    .then(data => postData("/add", {city:data.name, country:data.sys.country, date:newDate, temp:data.main.temp})
    // get data from the server and update the DOM 
    .then(retrieveData())
    );
  }
})

