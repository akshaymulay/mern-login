const jwt=require("jsonwebtoken");
function auth(req,res,next){
	try{
		const token=req.cookies.token;
		if(!token) return res.status(401).json({errorMessage:"unauthorize"});
		const verified=jwt.verify(token,process.env.JWT_SECRET);
		req.user=verified.user;
		next();
	}
	catch(err){
	console.log(err);
	res.status(401).json({
		errorMessage:"unauthorize"
	});
}
}

module.exports=auth;