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
  res.redirect("/api/")
});


const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"


app.get("/api/:date?", function (req, res) {
  try {

    let date = new Date(parseInt(req.params.date))
    

    if (!req.params.date) {
      res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString()
      })

      return
    }

    if (isInvalidDate(date)) {
      date = new Date(parseInt(req.params.date))
    }

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })

    if (isInvalidDate(date)) {
      res.json({ error: "Invalid Date" })
      return
    }

  } catch (e) {
    res.status(400)
    return
  }



});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port:' + " http://localhost:3000");
});
