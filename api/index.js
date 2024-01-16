// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('../public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "../views/index.html");
});


// your first API endpoint...




app.get("/api/:date?", function (req, res) {

  try {
    let date = req.params.date

    if (!date) {
      const date = new Date()
      const dateToUnix = Math.floor(date.getTime() / 1000)
      let data = {
        unix: dateToUnix,
        utc: date.toUTCString()
      }
      return res.json(data)

    }



    if (!isNaN(date)) {
      // UNIX

  
      let dateObject = new Date(parseInt(date))
     

      let data = {
        unix: parseInt(req.params.date),
        utc: dateObject.toUTCString(),
      }

      return res.json(data);

    } 
    
    else if (Date.parse(date)) {
      // If its a number and the parse method can return a timestamp


      const parts = date.split("-")

      let unixToDate = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`)
      let dateToUnix = Math.floor(unixToDate.getTime() / 1000)

      let data = {
        unix: parseInt(dateToUnix)  * 1000,
        utc: unixToDate.toUTCString()
      }

      return res.json(data);

    } else {
      res.json({ error: "Invalid Date" })
    }

  } catch (e) {
    res.status(400)
  }



  /* 
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds =  date.getSeconds()
   */


});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port:' + " http://localhost:3000");
});
