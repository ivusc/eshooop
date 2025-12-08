import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { IAddress } from "@/models/Address";
import { Trash2Icon } from "lucide-react";
import EditAddressForm from "./edit-address-form";

interface AddressCardProps {
  address: IAddress;
  userId: string;
  isEditDialogOpen: boolean;
  onEditOpen: (id: string) => void;
  onEditClose: () => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export default function AddressCard({
  address,
  userId,
  isEditDialogOpen,
  onEditOpen,
  onEditClose,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <Card className="bg-accent/70 border-none backdrop-blur-sm hover:border-purple-500/50 transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            {address.label}
            {address.isDefault && (
              <Badge className="bg-purple-600 text-white border-0">
                Default
              </Badge>
            )}
          </CardTitle>
          <div className="flex flex-row space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => onEditOpen(address._id.toString())}
            >
              Edit
            </Button>
            {!address.isDefault && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(address._id.toString())}
              >
                <Trash2Icon />
              </Button>
            )}
          </div>
          {isEditDialogOpen && (
            <Dialog open={true} onOpenChange={onEditClose}>
              <DialogContent className="!max-w-4xl">
                <DialogTitle className="m-4">Edit Address</DialogTitle>
                <EditAddressForm
                  userId={userId}
                  address={address}
                  handleClose={onEditClose}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-gray-300 space-y-1">
          <p className="font-semibold">{address.fullName}</p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p>{address.country}</p>
        </div>
        {!address.isDefault && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4 text-white hover:bg-gray-800"
            onClick={() => onSetDefault(address._id.toString())}
          >
            Set as Default
          </Button>
        )}
      </CardContent>
    </Card>
  );
}