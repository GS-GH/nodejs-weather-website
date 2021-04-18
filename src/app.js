const path = require('path');
const express = require('express');
const hbs = require('hbs');


const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



const app = express();
const port = process.env.PORT || 3000;


const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Guy Sagi'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Guy Sagi'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is the Help page!',
        name: 'Guy Sagi'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, data) => {  
        if (error) {
            return res.send({
                error
            })
        }

        forecast (data, (error, { location, temperature, precip } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            const forecast = 'In ' + location + ' is currently ' + temperature + ' degrees out. There is a ' + precip + '% chance of rain.'
            console.log('Forecast:', forecast);

            res.send({
                location,
                temperature,
                precip
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Guy Sagi'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'My 404 page',
        name: 'Guy Sagi'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});