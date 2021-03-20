const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({

	user:{type:String,require:true},
	email:{type:String,require:true,unique: true},
	phone:{type:Number,require:true},
	password:{type:String,require:true},

	// name, email, phone, password
});

const User=mongoose.model("user",userSchema);//(collection,scheme) it creates collection with schema
module.exports=User;