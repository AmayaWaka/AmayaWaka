const express = require("express");
const app = express();
app.use(express.static(__dirname + '/public'));
const https = require("https");


const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req, res){

  const firstname = req.body.fName;
  const lastname = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/9f8f3eaf9a"

  const options = {
    method: "POST",
    auth: "brad:f4de58cc3d5677423d87083359e8a321-us14"
  }


  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    // response.on("data", function(data){
    //   console.log(JSON.parse(data));
    // })
  })

  request.write(jsonData);
  request.end();

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server Started On Port 3000");
})




//f4de58cc3d5677423d87083359e8a321-us14

//https://us14.admin.mailchimp.com/lists/settings?id=24403

//list ID : 9f8f3eaf9a
