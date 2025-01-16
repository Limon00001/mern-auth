/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import mongoose from "mongoose";

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected!`);

        mongoose.connection.on("error", (error) => {
            console.error(`Database connection error: ${error}`);
        })
    } catch (error) {
        console.log(`Database setup failed ${error}`);
        process.exit(1);
    }
};

// Export
export default connectDB;