import dbConnect from "./app/lib/mongodb"; // Adjust the import path

async function testConnection() {
    try {
        const connection = await dbConnect();
        console.log("✅ MongoDB Connection Successful:", connection.connection.host);
        process.exit(0); // Exit the process successfully
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Exit the process with an error
    }
}

testConnection();
