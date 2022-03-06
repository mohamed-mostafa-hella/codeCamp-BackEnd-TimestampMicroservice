require('dotenv').config();

var express = require('express');
var app = express();

var cors = require('cors');
const { get } = require('express/lib/response');

app.use(cors({optionsSuccessStatus : 200})); //legacy prowser optionsSuccessStatus = 400

app.use(express.static('public')); // for css request

app.get('/' , (req,res)=>{
    res.sendFile(__dirname+'/views/index.html'); // landing page
});

app.get('/api/hello',(req,res)=>{
    res.json({'name':'hello mohamed from your first get api try to call it'})
})

app.get('/api/:date?' ,(req ,res)=>{
    //get time un suitaple formate
    var date  = req.params.date;

    if(date === undefined){
        return res.json({'unix' : new Date().getTime() , 'utc' : new Date().toUTCString()});
    }

    if(date.search('-') <= 0) // if it is in milliscond  convert it to number;
        var date  = Number(date);
    
    // handel if date is not invalid
    if( new Date(date).toUTCString() === "Invalid Date"){
        return res.json({ error : "Invalid Date" });
    }

    //return the need
    res.json({'unix' : new Date(date).getTime() , 'utc' : new Date(date).toUTCString()});

})

var listener = app.listen(process.env.PORT , ()=>{
    console.log('we are listening from the server right now on port = '+listener.address().port);
})
