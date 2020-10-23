import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/',
    JWT_SECRET: process.env.JWT_SECRET,
   // PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
}