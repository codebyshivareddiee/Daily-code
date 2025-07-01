const express=require("express");

const app=express();

app.get("/",function (req,res){
req.json({
	message:"hello"
});
});

app.listen(3000);

