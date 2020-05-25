let request = require('request')
// let geocode = require('./geocode');


const weather =({latti,longi}={},callback)=>{  
    const url = "http://api.weatherstack.com/current?access_key=497032e3d009c8e0900a6ae41a4c740e&query="+latti+","+longi+"";
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("error generated",undefined);
        }else if(body){
            let result = {city:body.location.name
                ,country:body.location.country
                ,state:body.location.region
                ,temperature:body.current.temperature
                ,windSpeed:body.current.wind_speed
                ,humidity:body.current.humidity
            }
            callback(undefined,result);            
        }else{
            callback("error again",undefined);
        }
    })
}

module.exports = weather;
