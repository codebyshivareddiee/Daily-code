const express=require("express");

const app=express();

app.get("/",function (req,res){
req.json({
	message:"hello"
});
});
app.get("/howareyou",function (req,res){
req.json({
        message:"fine what about you ?"
});
});

app.get("/fine",function (req,res){
req.json({
        message:"thats great, what can i help ?"
});
});

app.listen(3000);

