const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req,res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req,res){

  const query = req.body.city;
  const apikey ="abb18d949406c99348bc3d932bf2ecf9";
  const unit ="metric";
    var url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data" , function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const url =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>The temperature in " + query + " is " + temp + " degreed celsius</h1>");
        res.write("<h2>The weather condition is " + desc + "</h2>");
        res.write("<img src=" + url + ">");

        res.send();
        })
  });

});

app.listen(3000 , function(){
  console.log("Server is running on port 3000");
})
