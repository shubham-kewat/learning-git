const request = require('request');

const geoCode = (address,callback)=>{
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiaW1vY29jbyIsImEiOiJjazlxMWJ4Y2cwZnRmM29wOWRwOGFxOWR1In0.IR4_t9ujJfV3MGcPuXcMIA";   

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("sorry unable to process your request at this moment !please check your internet connection",undefined);
        }else if(body.features.length==0){
            callback('sorry no such location found',undefined);
        }else{
            callback(undefined,{
               latti:body.features[0].center[1],
               longi: body.features[0].center[0],
               location:body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;
