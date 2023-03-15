import mongoose from "mongoose";

const URL =
  "mongodb+srv://heber_820:Capitan2022@cluster0.bmndadr.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connect(URL, (error)=>{
    if (error){
        console.log ('Error de conexion a base de datos', error)
    }else{
        console.log('Conectado a base de datos')
    }
})
