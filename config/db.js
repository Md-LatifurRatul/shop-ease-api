import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log('DB connected');
        });
        const mongoURI = `${process.env.MONGO_URI}/Shop-ease`;

        await mongoose.connect(mongoURI);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;
