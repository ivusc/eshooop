import { Card, CardContent } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";

export default function AddAddressCard() {
  return (
    <DialogTrigger>
      <Card className="bg-accent/70 backdrop-blur-sm border-dashed hover:border-white/50 transition-all cursor-pointer flex items-center justify-center h-full min-h-[240px]">
        <CardContent className="text-center">
          <div className="text-6xl text-gray-600 mb-4">+</div>
          <p className="text-gray-400">Add New Address</p>
        </CardContent>
      </Card>
    </DialogTrigger>
  );
}