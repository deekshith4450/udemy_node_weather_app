const request=require('request')
function foreCast(latitude,longitude,callback){
    const url='http://api.weatherstack.com/current?access_key=13e6c5c3b9137f0d8d91d8a09a35b0ba&query='+ latitude +',' + longitude 
    request({url:url,json:true},function(error,response){
        if(error){
            callback('Unable to connect to internet/ to weather service!',undefined)

        }
        else if(response.body.error){
            callback(response.body.error.info,undefined)
        }
        else{
            const {weather_descriptions:summary, temperature, precip}=response.body.current
            const data=summary[0] + ', It is currently '+temperature + ' degress out. There is ' + precip +'% chance of rain!'
            callback(undefined,data)
        }
    })
}  
module.exports=foreCast