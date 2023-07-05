import mongoose from "mongoose";
import config from "./config.js";



mongoose.set('strictQuery', true);

mongoose.connect(`${process.env.MONGO_URI}`, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("conectado a la db")
});