"use server"
import { connectToDatabase } from "@/lib/mongodb";
import Address, { IAddress } from "@/models/Address";
import mongoose from "mongoose";

// 🟦 Add an address
export async function addAddress(
  userId: string,
  newAddress: Omit<IAddress, "_id" | "user">
) {
  //console.log('line 10')
  await connectToDatabase();

  console.log(newAddress);
  const uid = new mongoose.Types.ObjectId(userId);

  // If this is the first address, make it default
  const existing = await Address.countDocuments({ user: uid });
  const shouldBeDefault = existing === 0;

  const address = await Address.create({
    user: uid,
    ...newAddress,
    isDefault: shouldBeDefault,
  });

  //console.log(user)
  return { success: true, address: JSON.parse(JSON.stringify(address)), message: "Address added successfully." };
}

// 🟩 Get all user addresses
export async function getAddresses(userId: string) {
  await connectToDatabase();
  console.log(userId,31)

  const addresses = await Address.find({ user: new mongoose.Types.ObjectId(userId) })
    .sort({ isDefault: -1, createdAt: -1 })
    .lean()

  //console.log(addresses)
  return JSON.parse(JSON.stringify(addresses));
}

// 🟨 Update address
export async function editAddress(
  addressId: string,
  newAddress: Omit<IAddress, "_id" | "user">
) {
  await connectToDatabase();

  const updated = await Address.findByIdAndUpdate(
    new mongoose.Types.ObjectId(addressId),
    newAddress,
    { new: true }
  );

  return {
    success: true,
    address: JSON.parse(JSON.stringify(updated)),
    message: "Address updated successfully.",
  };
}
// 🟪 Set Default Address
export async function setDefaultAddress(userId: string, addressId: string) {
  await connectToDatabase();

  const uid = new mongoose.Types.ObjectId(userId);
  const aid = new mongoose.Types.ObjectId(addressId);

  // Clear all defaults
  await Address.updateMany({ user: uid }, { isDefault: false });

  // Set this one as default
  await Address.findByIdAndUpdate(aid, { isDefault: true });

  return { success: true, message: "Successfully set address as default." };
}

// 🟥 Delete Address
export async function deleteAddress(addressId: string) {
  await connectToDatabase();

  const addr = await Address.findById(addressId);
  if (!addr) return { success: false };

  const userId = addr.user;

  await Address.deleteOne({ _id: addressId });

  // if deleted was default → set first remaining to default
  const remaining = await Address.find({ userId }).sort({ createdAt: 1 });

  if (addr.isDefault && remaining.length > 0) {
    await Address.findByIdAndUpdate(remaining[0]._id, { isDefault: true });
  }

  return { success: true, message: "Address deleted successfully." };
}
