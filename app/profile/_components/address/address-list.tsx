"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import CreateAddressForm from "./create-address-form";
import { IAddress } from "@/models/Address";
import { deleteAddress, setDefaultAddress } from "@/actions/address.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddressCard from "./address-card";
import AddAddressCard from "./add-address-card";

export default function AddressList({
  userAddress,
  userId,
}: {
  userAddress: IAddress[];
  userId: string;
}) {
  const [openEditDialogId, setOpenEditDialogId] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const router = useRouter();

  const handleOpenEditDialog = (id: string) => {
    setOpenEditDialogId(id);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialogId(null);
  };

  async function handleSetDefault(aid: string) {
    const res = await setDefaultAddress(userId, aid);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  async function handleDelete(aid: string) {
    const res = await deleteAddress(aid);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {userAddress?.map((address: IAddress) => (
        <AddressCard
          key={address._id.toString()}
          address={address}
          userId={userId}
          isEditDialogOpen={openEditDialogId === address._id.toString()}
          onEditOpen={handleOpenEditDialog}
          onEditClose={handleCloseEditDialog}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />
      ))}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <AddAddressCard />
        <DialogContent className="!max-w-4xl">
          <DialogTitle className="m-4">Add New Address</DialogTitle>
          <CreateAddressForm userId={userId} setOpen={setOpenAdd} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
