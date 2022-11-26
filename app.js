
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["buy soap","study night"];
let workItems =[]


app.set('view engine', 'ejs');

// for getting name value from from

app.use(bodyParser.urlencoded({extended:true}));

// acessing the css file in the public folder 
app.use(express.static("public"));

// get / is root or home.
app.get("/", function (req, res) {

    let today = new Date();
    
    let options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US",options);
    res.render("listen",{ kindDay:day , newList: items});
    
});

// passing the data from html file to server uisng post request

app.post("/",function(req,res){

    let item  = req.body.newitem;

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");

    }else{
        items.push(item)
        res.redirect("/");
    } 
})

// work root 

app.get("/work",function(req,res){
    res.render("listen",{kindDay:"work list",newList: workItems});
})

app.listen(3000, function () {
    console.log("server running on port 3000");
});