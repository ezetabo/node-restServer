import mongoose from "mongoose";

const dbConnection = async()=>{
    try {
        mongoose.connect(process.env.MONGODB_CNN,{
            ssl: true,
            sslValidate: false
        });

        console.log('Connecting successfully');

    } catch (error) {
        console.log(error);
        throw new Error("Couldn't connect to Mongo");
    }
}



export{
    dbConnection
}