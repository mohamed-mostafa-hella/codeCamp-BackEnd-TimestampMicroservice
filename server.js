// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//--------------  v1 ---------------------   wrong
// // your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

// app.get('/api/:date?' ,(req ,res)=>{
//   //get time un suitaple formate
//   var date  = req.params.date;

//   if(date === undefined){
//       return res.json({'unix' : new Date().getTime() , 'utc' : new Date().toUTCString()});
//   }

//   if(date.search('-') <= 0) // if it is in milliscond  convert it to number;
//       var date  = Number(date);
  
//   // handel if date is not invalid
//   if( new Date(date).toUTCString() === "Invalid Date"){
//       return res.json({ error : "Invalid Date" });
//   }

//   //return the need
//   res.json({'unix' : new Date(date).getTime() , 'utc' : new Date(date).toUTCString()});

// })


//------------------------- v2 --------- wrong
// app.get('/api/:date?' ,(req ,res)=>{
//   //get time un suitaple formate
//   var strdate  = req.params.date;
//   var date ;
//   if(strdate === undefined){
//       date = new Date()
//   }else{
//       if(strdate.search('-') <= 0) // if it is in milliscond  convert it to number;
//        {
//          date  = new Date(Number(strdate)) ;
//        }else{
//          date  = new Date(strdate) ;
//        }   
//   }
//   // handel if date is not invalid
//   if( date.toUTCString() === "Invalid Date"){
//       return res.json({ error : "Invalid Date" });
//   }
//   //return the need
//   res.json({'unix' : date.valueOf() , 'utc' : date.toGMTString()});

// })

// ----------------------   V3  accepted
app.get('/api/:date' , (req , res)=>{
  var timestamp = req.params.date;
  if(!isNaN(timestamp)){
    timestamp = +timestamp;
  }

  let date = new Date(timestamp);
  if(date.toUTCString() == "Invalid Date"){
    res.json({ error : "Invalid Date" });
  }else{
    res.json({ "unix": date.valueOf(), "utc": date.toGMTString() });
  }

})

app.get('/api' , (req,res)=>{
  let date = new Date();
  res.json({ "unix": date.valueOf(), "utc": date.toGMTString() });
})
////////////////////////////////////////////////////////////////////////
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
