import mongoose from "mongoose";

async function connectdb() {
    try {

        mongoose.connection.on("connected", () => {
            console.log(" Database connected successfully");
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/SchoolBit`)

    } catch (err) {
        console.log('database connection error', err)
    }
}
export default connectdb