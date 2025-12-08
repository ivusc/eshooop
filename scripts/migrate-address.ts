import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI as string;

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    address: Array,
  },
  { strict: false }
);

const addressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  label: String,
  fullName: String,
  phoneNumber: String,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  isDefault: Boolean,
});

const User = mongoose.model("User", userSchema, "users");
const Address = mongoose.model("Address", addressSchema, "addresses");

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");

    const users = await User.find();

    for (const user of users) {
      if (!user.address || user.address.length === 0) continue;

      console.log(`Migrating addresses for user: ${user._id}`);

      for (const addr of user.address) {
        const exists = await Address.findOne({
          userId: user._id,
          label: addr.label,
          street: addr.street,
        });

        if (!exists) {
          await Address.create({
            userId: user._id,
            ...addr,
          });
        }
      }

      // Remove address array from user document
      user.address = [];
      await user.save();
    }

    console.log("Migration completed successfully.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();
