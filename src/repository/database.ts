import mongoose from 'mongoose';

// test connection to database
export async function testConnection() { 
    try {
        await connectToDB();
        await disconnectToDB();
        console.log("Testing connecting to database was successful (connection and disconnection)");
    }
    catch (error) {
        console.log("Error while testing connecting to database: " + error);
    }
}

// connect to database
export async function connectToDB() {
    try {
        if (!process.env.DBHOST) {
            throw new Error("DBHOST is not found in environment variables");
        }
        await mongoose.connect(process.env.DBHOST);

        if (mongoose.connection.db) {
            await mongoose.connection.db.admin().command({ ping: 1 });
            // console.log('Connected to database');
        } else {
            throw new Error("Error when connecting to database");
        }
    } catch (error) {
        console.log("Error connecting to database: " + error);
    }
}

// disconnect from database
export async function disconnectToDB() {
    try {
        await mongoose.disconnect();
        // console.log('Disconnected database');
    } catch (error) {
        console.log("Error disconnecting database: " + error);
    }
}