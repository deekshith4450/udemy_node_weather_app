const request=require('request')

function geoCode(address,callback){
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGVla3NoaXRoNDQ1MCIsImEiOiJjazhqdWR1bzEwN2xwM2VxYnl3cmU2eDRpIn0.I-MwsH44dUpwanO2tpFw2w&limit=1'
    request({url:url,json:true},function(error,response){
        if(error){
            callback('Unable to connect ot location service',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }
        else{
            // const {center[1]:latitude,center[0]:longitude} =response.body.features[0]
            var data={
               latitude:response.body.features[0].center[1],
               longitude:response.body.features[0].center[0],
               location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })


}
module.exports=geoCode