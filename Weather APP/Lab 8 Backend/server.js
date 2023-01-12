const { Router, json, response } = require('express');
const express = require('express');
const request = require('request');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.urlencoded({
    extended: true
}));

router.get('/', (req, res) => {
    res.json({ "Hello World": "message" });
})

app.get('/api', function (req, res) {
    res.json({ 'test': 'api' });
})

const uri = "mongodb+srv://weix3:Wxy991015!@lab5.twtcy.mongodb.net/Lab5?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// route parameters to get a document at the specified index
app.get('/db/:cityname', function (req, res) {
    client.connect(function (err, db) {
        var city = req.params.cityname;
        city[0] = city[0].toUpperCase();
        city = city.charAt(0).toUpperCase() + city.substring(1);
        console.log(city);
        if (err) throw err;
        var dbo = db.db("lab6");
        dbo.collection("lab6").findOne({
            cityname: city
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                console.log(result);
                db.close();
            });
    });
});

// add a new city data into the exisiting or display if already existed
app.post("/db/:cityname", function (req, res) {
    client.connect(function (err, db) {
        if (err) throw err;
        client.connect(function (err, db) {
            if (err) throw err;
            var cityname = req.params.cityname;
            cityname[0] = cityname[0].toUpperCase();
            cityname = cityname.charAt(0).toUpperCase() + cityname.substring(1);
            var dbo = db.db("lab6");
            dbo.collection("lab6").findOne({
                cityname: cityname
            },
                function (err, result) {
                    if (err) throw err;
                    if (result) {
                        console.log("This city is already in the dataset!");
                        res.json(result);
                        db.close();
                    } else {
                        //var count = db.collection.countDocuments;
                        let api = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=1c7da47091d437de3c25beb87da99c0a";
                        request({ uri: api, json: true }, function (error, response) {
                            if (error) throw error;
                            dbo.collection("lab6").countDocuments().then((countDocuments) => {
                                console.log(countDocuments);

                                var myobj = {
                                    index: countDocuments + 1,
                                    cityname: cityname,
                                    lat: response.body.coord.lat,
                                    lon: response.body.coord.lon,
                                    temp: response.body.main.temp,
                                    pressure: response.body.main.pressure,
                                    windspeed: response.body.wind.speed,
                                    humidity: response.body.main.humidity
                                };

                                dbo.collection("lab6").insertOne(myobj, function (err, res) {
                                    if (err) throw err;
                                    console.log(`${cityname}'s weather data has been added!`);
                                    db.close();
                                })
                            })
                        })
                    }
                })
        })

    })
})

// update the document with the specified city name
app.put('/db/:cityname', function (req, res) {
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("lab6");
        var city_name = req.params.cityname;
        city_name[0] = city_name[0].toUpperCase();
        city_name = city_name.charAt(0).toUpperCase() + city_name.substring(1);
        var api = "http://api.openweathermap.org/data/2.5/weather?q="
            + city_name + "&units=imperial&appid=1c7da47091d437de3c25beb87da99c0a";
        dbo.collection("lab6").findOne({
            cityname: city_name
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                if (result) {
                    request({ uri: api, json: true }, function (error, response) {
                        if (error) throw error;
                        var newobj = {
                            $set: {
                                lat: response.body.coord.lat,
                                lon: response.body.coord.lon,
                                temp: response.body.main.temp,
                                pressure: response.body.main.pressure,
                                windspeed: response.body.wind.speed,
                                humidity: response.body.main.humidity
                            }
                        };
                        dbo.collection("lab6").updateOne(result, newobj, function (err, res) {
                            if (err) throw err;
                            //console.log(`1 document inserted`);
                            console.log(`${city_name} has been updated!`);
                            db.close();
                        })
                    })
                } else {
                    console.log(`${city_name} does not exisit! Please try a new one!`);
                }
            })
    })
})

// delet the specified document from the collection
app.delete('/db/:cityname', function (req, res) {
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("lab6");
        var cityname = req.params.cityname;
        cityname[0] = cityname[0].toUpperCase();
        cityname = cityname.charAt(0).toUpperCase() + cityname.substring(1);
        var api = "http://api.openweathermap.org/data/2.5/weather?q="
            + cityname + "&units=imperial&appid=1c7da47091d437de3c25beb87da99c0a";
        dbo.collection("lab6").findOne({
            cityname: cityname
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                if (result) {
                    if (err) throw error;
                    dbo.collection("lab6").deleteOne(result, function (err, res) {
                        if (err) throw err;
                        //console.log(`1 document inserted`);
                        console.log(`${cityname} has been deleted!`);
                        db.close();
                    })
                } else {
                    console.log(`${cityname} does not exisit! Please try a new one!`);
                }
            })
        /*
        var myobj = { cityname: cityname }
        dbo.collection("lab6").deleteOne(myobj, function (err, result) {
            if (err) throw err;
            console.log("1 document deleted");
            console.log(result);
            res.send(result);
            db.close();
        });
        */
    });
})

app.use(express.static(path.join(__dirname, '../Lab\ 8\ Frontend/Lab8/dist/lab8')));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})