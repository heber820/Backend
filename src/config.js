import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    gmail_user:process.env.GMAIL_USER,
    gmail_password:process.env.GMAIL_PASSWORD,
    twilio_phone_number:process.env.TWILIO_PHONE_NUMBER,
    twilio_sid:process.env.TWILIO_SID,
    twilio_auth_token:process.env.TWILIO_AUTH_TOKEN
}