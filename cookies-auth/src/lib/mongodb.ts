import mongoose from "mongoose";

const { MONGODB_URL } = process.env;

if (!MONGODB_URL) {
  throw new Error("Invalid env variable: MONGODB_URL");
}

export const connectToMongoDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    // already connect  ถ้ามีการเชื่อมต่ออยู่แล้ว (readyState ไม่ใช่ 0) จะออกจากฟังก์ชันทันที
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URL);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    Promise.reject(error);
  }
};
