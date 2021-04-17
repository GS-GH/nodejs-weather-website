const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3V5LXNhZ2kiLCJhIjoiY2tua3g5NGJuMGZvYTJwczV2aTgycnkyeCJ9.iIGMpKHgXNEzg_sqts8rTA&limit=1'

    request({ url, json:true}, (error, { body: { features } } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longtitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode;