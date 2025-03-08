const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "firebase-service-account.json"), "utf-8")
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to create an admin user
async function createAdminUser(email, password) {
    try {
        const user = await admin.auth().createUser({
            email,
            password,
        });

        // Set custom claims to make the user an admin
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });

        console.log(`Admin user created successfully! UID: ${user.uid}`);
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
}

// Get email and password from command-line arguments
const [,, email, password] = process.argv;

if (!email || !password) {
    console.error("Usage: ts-node createAdmin.ts <email> <password>");
    process.exit(1);
}

// Call the function to create an admin user
createAdminUser(email, password);
