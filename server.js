const env = require('dotenv');
env.config();
const fetch = require('node-fetch');
// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const port = 8080;

//baseApis
const pixabayApi = 'https://pixabay.com/api/?key=';
const weatherbitApi = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const geonamesApi = 'http://api.geonames.org/searchJSON?q=';

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require("cors");
const { urlencoded } = require('body-parser');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, ()=>{
    console.log("server working on port: " + port);
})


// Post route
app.post("/add", async(req,res)=>{
    const city = req.body.city;
    projectData.city = city;
    const depdate = req.body.depdate;
    const retdate = req.body.retdate;
    const geodata = await geonames(city)
    if (geodata) {
        const lat = geodata.lat;
        const lng = geodata.lng;
        const country = geodata.countryName
        await weatherbit(lat, lng, depdate, retdate);
        await pixabay(city, country);
        console.log(projectData);
        res.send(projectData);
    } else {
        res.send("error");
    }
})

//get route for geonames
async function geonames(city) {
    console.log(city);
    
    const request = geonamesApi + encodeURIComponent(city) + "&username=" + process.env.geoApiKey;
    console.log(request);
    const response = await fetch(request);
    try {
        //console.log(response[0]);
        const data = await response.json();
        //console.log(data[0]);
        if (data.totalResultsCount > 0) {
            projectData.country = data.geonames[0].countryName;
            return data.geonames[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log("error", error);
    }
}

//get route for weatherbit
async function weatherbit(lat, lng, depdate, retdate) {
    console.log(lat, lng);
    const days = new Date(retdate).getDate() - new Date(depdate).getDate();
    console.log(days);
    const request = `${weatherbitApi}lat=${lat}&lon=${lng}&key=${process.env.weatherApiKey}`;
    console.log(request);
    const response = await fetch(request);
    try {
        const data = await response.json();
        data.data.forEach(data => {
            if (data.datetime == depdate){
                projectData.min = data.min_temp;
                projectData.max = data.max_temp;
                projectData.date = data.datetime;
                projectData.description = data.weather.description;               
            }
        });
    } catch (error) {
        console.log("error", error);
    }
}



//get route for pixabay
async function pixabay(city, country) {
    const request = pixabayApi + process.env.pixabayApiKey + '&q=' + encodeURIComponent(city) + '&orientation=horizontal&image_type=photo';
    console.log(request);
    const response = await fetch(request);
    try{
        const data = await response.json();
        if (data.totalHits > 0) {
            let hits = data.hits
            console.log(hits);
            let filterdhits = hits.filter(hit => hit.tags.includes(city) || hit.tags.includes("city"));
            console.log(filterdhits);
            filterdhits.sort((a,b) => b.views - a.views);
            projectData.image = filterdhits[0].webformatURL;
        }else {
            const request = pixabayApi + process.env.pixabayApiKey + '&q=' + encodeURIComponent(country) + '&orientation=horizontal&image_type=photo';
            console.log(request);
            const response = await fetch(request);
            const data = await response.json();
            if (data.totalHits > 0) {
                let hits = data.hits
                projectData.image = hits[0].webformatURL;
            }else{
                projectData.image = 'https://cdn.pixabay.com/photo/2018/02/27/06/30/skyscrapers-3184798_960_720.jpg';
            }
        }  
    } 
    catch (error) {
        console.log("error", error);
    }
}