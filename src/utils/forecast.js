const request = require('request');

const forecast = ({ location, latitude, longtitude }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=49764dc66c07c03712753bae0f6238df&query=' + latitude + ',' +  longtitude;

    request ({ url, json:true }, (error, { body: { error:bodyErr, current: {temperature, precip} } } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (bodyErr) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, { location, temperature, precip });
        }
    })
}

module.exports = forecast;