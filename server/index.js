import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"Server is running"
    })
})

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if(conn){
            console.log("MONGODB connection successfull")
        }
    }
    catch(error){
       console.log("MONGODB connection error",error)
    }
};

app.listen((PORT),()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
})