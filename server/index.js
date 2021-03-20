const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const cors=require("cors");
dotenv.config();
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
	console.log(`Server Started On ${PORT}`);
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin:["http://localhost:3000"],
	credentials:true,
}));
//connection to mongodb
mongoose.connect(process.env.MONGO_CONNECT,
{
	useNewUrlParser:true,
	useUnifiedTopology:true
},(err)=>{
	if(err){
		console.log("error during connection");
	}
	console.log("connected to mongodb");
});

//set up access
app.use("/auth",require("./routers/userRouter"));
app.use("/customer",require("./routers/customerRouter"));