# 1
git clone <repository-url>
cd <repository-folder>

# 2
npm run build

# 3 
Configure MongoDB Connection

Go to the .env file in the root directory (if it doesn't exist, create one).
Add your MongoDB connection string by replacing the placeholder process.env.MONGO_URI with your MongoDB URI:
MONGO_URI=<your-mongo-db-connection-string>

# 4
Start the application Run the following command to start the server:
npm run start
