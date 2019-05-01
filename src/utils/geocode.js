const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFkaW05MyIsImEiOiJjanV3M2VuOWswOGNkNDRwdnNzODN6dnBsIn0.DsX3sr6RHbcJlnI5gpIs9A'
    request({url, json:true}, (err, res) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if(res.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[1].center[0],
                longitude: res.body.features[1].center[1],
                location: res. body. features[0].place_name
            })
        }
    })
}
module.exports = geoCode