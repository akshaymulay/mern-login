const router=require("express").Router();
const User=require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
//register
router.post("/",async(req,res)=>{
	try{
		const{user,email,phone,password,passwordVerify}=req.body;

		//check
		if(!user||!email||!phone||!password||!passwordVerify)
			return res.status(400).json({errorMessage:"Please Enter All Required Field "});
		if(password.lenght<6)
			return res.status(400).json({errorMessage:"Please Enter password of atleast 6 characters"});
		if(password!==passwordVerify)
			return res.status(400).json({errorMessage:"Please Enter Same Password"});

		const existingUser=await User.findOne({email});
		if(existingUser){

			return res.status(400).json({errorMessage:"An Account with this email is already exists"});
		}
		//hashing the password
		const salt=await bcrypt.genSalt();
		const passwordHash=await bcrypt.hash(password,salt);
		//console.log(passwordHash);

		//save a new user account to database
		const newUser=new User({
			user,email,phone,
			password:passwordHash
		});
		const savedUser=await newUser.save();
		//log the user in
		const token=jwt.sign({
			user:savedUser._id
		},process.env.JWT_SECRET);

		//send token to cookie
		res.cookie("token",token,{
			httpOnly:true,
		}).send();

}
catch(err){
	console.log(err);
	res.status(500).send();
}
});


//log in
router.post("/login",async(req,res)=>{
	try{
		const{email,password}=req.body;

		//validate
		if(!email||!password)
			return res.status(400).json({errorMessage:"Please Enter All Required Field "});

		const existingUser=await User.findOne({email});
		if(!existingUser)
			return res.status(401).json({errorMessage:"Wrong Email And Password "});
		const passwordCorrect=await bcrypt.compare(password,existingUser.password);
		if(!passwordCorrect)
			return res.status(401).json({errorMessage:"Wrong Email And Password "});

			//sign the token
			const token=jwt.sign({
			user:existingUser._id,
		},process.env.JWT_SECRET);

			//send token to cookie
		res.cookie("token",token,{
			httpOnly:true,
		}).send();

	}
	catch(err){
	console.log(err);
	res.status(500).send();
}
});

router.get("/logout",(req,res)=>{
	res.cookie("token","",{
		httpOnly:true,
		expires:new Date(0)
	}).send();
});

router.get("/loggedIn",(req,res)=>{

	try{
		const token=req.cookies.token;
		if(!token) return res.json(false);
		jwt.verify(token,process.env.JWT_SECRET);
		res.send(true);
	}
	catch(err){
	console.log(err);
	res.json(false);
}

});


module.exports=router;
