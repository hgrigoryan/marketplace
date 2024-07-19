import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/marketplace';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectToDB;