const express = require("express");
const bp = require("body-parser");
const request = require("request");
const https = require("https");
var fs = require("fs");

const {
    urlencoded
} = require("body-parser");

const app = express();


app.use(express.static("public"));
app.use(bp.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields :{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }

        ]
    };
    const jsonData =JSON.stringify(data);
    
    const url ="https://us1.api.mailchimp.com/3.0/lists/677b9a6dc3";
    const options = {
            method:"POST",
            auth : "lalit0506:xxxxxxxxxxxxxxxxxxxxxx"
            
        }


    const request = https.request(url, options, function(response){
           if (response.statusCode=== 200){
                res.sendFile(__dirname+"/success.html");
           }
           else{
            res.sendFile(__dirname+"/failure.html");
           }
        
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
    })
    request.write(jsonData);
    request.end();


})
app.listen(process.env.PORT, function () {
    console.log("Server is running")
})
