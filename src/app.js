const express = require('express')
const path = require('path')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express();
const port = process.env.PORT || PORT

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index',{
        name:'Vadim',
        title: 'Weather App'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'U must provide a address'
        })
    }
    geocode(req.query.address, (err, data)=>{
        if(err){
            return res.send({err})
        }
        forecast(data.latitude, data.longitude, (err, forecastData)=>{
            if(err){
                return res.send(err)
            }
            res.send({
                location:data.location,
                forecast:forecastData
            })
        })
    })
})
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'U must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help page'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title:'About page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {title:'article not found'})
})

app.get('*', (req, res) => {
    res.render('error', {title:'404'})
    
})
app.listen(port, () => {
    console.log("server started on port" + port)
})