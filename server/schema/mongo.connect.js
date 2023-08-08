import mongoose, { connect } from 'mongoose';

//surprass deprication warning
mongoose.set('strictQuery', false);

export const mongoConnect = async () => {
  // const connectionString = process.env.DB;
  const connectionString =
    process.env.MONGODB_PROTO +
    process.env.MONGODB_USER +
    ':' +
    process.env.MONGODB_PASSWORD +
    '@' +
    process.env.MONGODB_URL +
    '/' +
    process.env.MONGODB_DATABASE;
  try {
    // console.log('connection');
    await connect(connectionString);
  } catch (error) {
    throw new Error(String(error));
  }
};
