import mongoose from 'mongoose';

export const dbConnect = async (): Promise<void> => {
  const DB_URI = process.env.DB_URI || '';
  try {
    await mongoose.connect(DB_URI, {});
    console.log('Connected to database');
  } catch (error) {
    throw new Error(`Error connecting to database: ${error}`);
  }
};
