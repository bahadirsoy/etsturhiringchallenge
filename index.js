//import middlewares
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mysql = require("mysql");
require("dotenv").config();


//include middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//create connection to mysql database
const db = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});


/* GET REQUESTS */

//get all events
app.get('/api/getEvents', (req, res) => {

    sql = "SELECT *, DATE_FORMAT(eventStartDate, '%d-%m-%Y') as eventStartDate, DATE_FORMAT(eventEndDate, '%d-%m-%Y') as eventEndDate FROM heroku_61b7c6ae4a0075c.event"
    db.query(
        sql,
        (error, result) => {
            if(error){
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )
})

//get all none out dated events
app.get('/api/getRecentEvents', (req, res) => {

    sql = "SELECT *, DATE_FORMAT(eventStartDate, '%d-%m-%Y') as eventStartDate, DATE_FORMAT(eventEndDate, '%d-%m-%Y') as eventEndDate FROM heroku_61b7c6ae4a0075c.event WHERE CURDATE() <= eventEndDate"
    db.query(
        sql,
        (error, result) => {
            if(error){
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )
})

//get all out dated events
app.get('/api/getOutDatedEvents', (req, res) => {

    sql = "SELECT *, DATE_FORMAT(eventStartDate, '%d-%m-%Y') as eventStartDate, DATE_FORMAT(eventEndDate, '%d-%m-%Y') as eventEndDate FROM heroku_61b7c6ae4a0075c.event WHERE NOT (CURDATE() <= eventEndDate)"
    db.query(
        sql,
        (error, result) => {
            if(error){
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )
})

//get populer events
app.get('/api/getPopularEvents', (req, res) => {

    sql = "SELECT *, DATE_FORMAT(eventStartDate, '%d-%m-%Y') as eventStartDate, DATE_FORMAT(eventEndDate, '%d-%m-%Y') as eventEndDate FROM heroku_61b7c6ae4a0075c.event WHERE eventIsPopular = 1"
    db.query(
        sql,
        (error, result) => {
            if(error){
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )
})

//get eventTypeName with eventTypeID
app.get('/api/getEventTypeName', (req, res) => {

    //eventTypeID
    const eventTypeID = req.query.eventTypeID

    sql = "SELECT eventTypeName from heroku_61b7c6ae4a0075c.eventtype WHERE eventTypeID = ?"
    db.query(
        sql,
        [eventTypeID],
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result[0].eventTypeName)
            }
        }
    )
})

//get eventCityName with eventCityID
app.get('/api/getEventCityName', (req, res) => {
    
    //eventCityID
    const eventCityID = req.query.eventCityID

    sql = "SELECT eventCityName from heroku_61b7c6ae4a0075c.eventcity WHERE eventCityID = ?"
    db.query(
        sql,
        [eventCityID],
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result[0].eventCityName)
            }
        }
    )
})

//get eventLocationName with eventLocationID
app.get('/api/getEventLocationName', (req, res) => {
    
    //eventLocationID
    const eventLocationID = req.query.eventLocationID

    sql = "SELECT eventLocationName from heroku_61b7c6ae4a0075c.eventLocation WHERE eventLocationID = ?"
    db.query(
        sql,
        [eventLocationID],
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result[0].eventLocationName)
            }
        }
    )
})

//get all event type names
app.get('/api/getEventTypeNames', (req, res) => {

    sql = "SELECT * FROM heroku_61b7c6ae4a0075c.eventtype"
    db.query(
        sql,
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )

})

//get all event location names
app.get('/api/getEventLocationNames', (req, res) => {

    sql = "SELECT * FROM heroku_61b7c6ae4a0075c.eventlocation"
    db.query(
        sql,
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )

})

//get an event by eventId
app.get('/api/getEventByEventId', (req, res) => {
    const eventId = req.query.eventId

    sql = "SELECT *, DATE_FORMAT(eventStartDate, '%d-%m-%Y') as eventStartDate, DATE_FORMAT(eventEndDate, '%d-%m-%Y') as eventEndDate FROM heroku_61b7c6ae4a0075c.event WHERE eventId = ?"
    db.query(
        sql,
        [eventId],
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result[0])
            }
        }
    )

})


/* POST REQUESTS */

/* PUT REQUESTS */


//listen backend requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});