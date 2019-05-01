const request = require('request');

const forecast = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/1c7e07feb68888130cffdd3cb9df9aaa/${lat},${long}?units=si&lang=en`;
    request({url, json:true}, (err, res)=>{
        if (err) {
            callback('No connection ot api.darksky')
        } else if(res.body.err) {
            callback('Unbale to find location')
        } else {
            callback(undefined, `${res.body.daily.summary} It is currently ${res.body.currently.temperature}. There is ${res.body.currently.precipProbability}% chance of rain`)
        }
    })

}


  module.exports = forecast
