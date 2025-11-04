"use client";
import { saveProduct } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/models/Product";
import { IUser } from "@/models/User";
import { Save } from "lucide-react";
import { redirect } from "next/navigation";
import React, { FormEvent } from "react";
import { toast } from "sonner";

export default function SaveButton({
  user,
  product,
  saved,
}: {
  user: IUser | null;
  product: IProduct;
  saved: boolean;
}) {
  async function handleSave(e: FormEvent) {
    e.preventDefault();
    console.log("save");
    if (!user) redirect("/login");

    const res = await saveProduct(user._id.toString(), product._id.toString());
    // console.log(res)
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }
  //console.log(saved);

  return (
    <form onSubmit={handleSave}>
      <Button
        size="sm"
        className={`${
          saved
            ? "bg-green-500 hover:bg-green-600"
            : "border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
        } w-full px-6 py-2 rounded-lg cursor-pointer`}
      >
        <Save />
        {saved ? "-" : "+"}
      </Button>
    </form>
  );
}
