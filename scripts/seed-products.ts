import dotenv from "dotenv";
import mongoose, { Schema, model, models } from "mongoose";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI as string;

// ✅ Product Schema
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    pictures: [{ type: String }],
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in dev
const Product = models.Product || model("Product", ProductSchema);

// ✅ Product Data
const products = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with silent clicks and adjustable DPI.",
    price: 19.99,
    category: "Electronics",
    stock: 45,
    pictures: ["https://cdn-icons-png.flaticon.com/512/686/686589.png"],
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches and metal frame.",
    price: 59.99,
    category: "Electronics",
    stock: 32,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1006/1006363.png"],
  },
  {
    name: "Gaming Headset",
    description: "Over-ear gaming headset with surround sound and noise cancellation.",
    price: 49.99,
    category: "Electronics",
    stock: 28,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1082/1082444.png"],
  },
  {
    name: "Smartphone Stand",
    description: "Adjustable aluminum smartphone stand for desks.",
    price: 14.99,
    category: "Accessories",
    stock: 76,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1149/1149168.png"],
  },
  {
    name: "Bluetooth Speaker",
    description: "Compact Bluetooth speaker with strong bass and long battery life.",
    price: 34.99,
    category: "Electronics",
    stock: 51,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1684/1684375.png"],
  },
  {
    name: "Fitness Tracker",
    description: "Smart fitness band with heart rate and sleep monitoring.",
    price: 39.99,
    category: "Wearables",
    stock: 61,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1864/1864509.png"],
  },
  {
    name: "Laptop Backpack",
    description: "Water-resistant backpack with a padded laptop compartment.",
    price: 44.99,
    category: "Bags",
    stock: 73,
    pictures: ["https://cdn-icons-png.flaticon.com/512/3710/3710659.png"],
  },
  {
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI, SD, and multiple USB ports.",
    price: 24.99,
    category: "Accessories",
    stock: 80,
    pictures: ["https://cdn-icons-png.flaticon.com/512/4144/4144887.png"],
  },
  {
    name: "External SSD",
    description: "Portable 1TB external SSD with high-speed data transfer.",
    price: 129.99,
    category: "Storage",
    stock: 22,
    pictures: ["https://cdn-icons-png.flaticon.com/512/5349/5349335.png"],
  },
  {
    name: "Wireless Charger",
    description: "Qi-certified fast wireless charging pad for smartphones.",
    price: 29.99,
    category: "Electronics",
    stock: 66,
    pictures: ["https://cdn-icons-png.flaticon.com/512/4957/4957491.png"],
  },
  {
    name: "Smartwatch",
    description: "Touchscreen smartwatch with GPS, step tracker, and notifications.",
    price: 89.99,
    category: "Wearables",
    stock: 47,
    pictures: ["https://cdn-icons-png.flaticon.com/512/5349/5349545.png"],
  },
  {
    name: "Wireless Earbuds",
    description: "Bluetooth earbuds with noise reduction and long battery life.",
    price: 69.99,
    category: "Audio",
    stock: 58,
    pictures: ["https://cdn-icons-png.flaticon.com/512/4710/4710563.png"],
  },
  {
    name: "Digital Camera",
    description: "Compact 20MP digital camera with optical zoom and 4K video.",
    price: 199.99,
    category: "Cameras",
    stock: 15,
    pictures: ["https://cdn-icons-png.flaticon.com/512/685/685655.png"],
  },
  {
    name: "Tripod Stand",
    description: "Lightweight, foldable tripod for cameras and smartphones.",
    price: 24.99,
    category: "Photography",
    stock: 39,
    pictures: ["https://cdn-icons-png.flaticon.com/512/2874/2874799.png"],
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with dimmable brightness levels.",
    price: 27.99,
    category: "Home & Office",
    stock: 60,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1829/1829485.png"],
  },
  {
    name: "Coffee Mug",
    description: "Matte-finish ceramic mug perfect for coffee or tea.",
    price: 12.99,
    category: "Kitchen",
    stock: 94,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1005/1005141.png"],
  },
  {
    name: "Notebook",
    description: "Hardcover notebook with 200 ruled pages and elastic closure.",
    price: 9.99,
    category: "Stationery",
    stock: 120,
    pictures: ["https://cdn-icons-png.flaticon.com/512/174/174972.png"],
  },
  {
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle for cold and hot drinks.",
    price: 18.99,
    category: "Outdoors",
    stock: 77,
    pictures: ["https://cdn-icons-png.flaticon.com/512/992/992703.png"],
  },
  {
    name: "Desk Organizer",
    description: "Minimalist desk organizer with compartments for office supplies.",
    price: 15.99,
    category: "Home & Office",
    stock: 83,
    pictures: ["https://cdn-icons-png.flaticon.com/512/2729/2729007.png"],
  },
  {
    name: "Portable Power Bank",
    description: "10,000mAh power bank with dual USB ports and LED display.",
    price: 32.99,
    category: "Electronics",
    stock: 55,
    pictures: ["https://cdn-icons-png.flaticon.com/512/1027/1027678.png"],
  },
];


// ✅ Seed Function
async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🧹 Existing products cleared");

    await Product.insertMany(products);
    console.log(`🌱 Inserted ${products.length} products successfully`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🚪 MongoDB connection closed");
  }
}

seedProducts();
