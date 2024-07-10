import mongoose, { connect } from "mongoose"; // mongoose will connect with the database 

import {DB_NAME} from '../constants';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected  !! DB Host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)                           // when you got error you exit with the help of procces 
    }
}
export default connectDB;