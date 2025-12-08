"use client";
import { editAddress } from "@/actions/address.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IAddress } from "@/models/Address";
import { zodResolver } from "@hookform/resolvers/zod";
import mongoose from "mongoose";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const editAddressSchema = z.object({
  label: z.string().min(2, { message: "Label must be at least 5 characters." }),
  fullName: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  phoneNumber: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  street: z.string().min(5, {
    message: "Street must at least be 5 characters.",
  }),
  city: z.string().min(5, {
    message: "City must at least be 5 characters",
  }),
  state: z.string().min(2, {
    message: "State must at least be 5 characters",
  }),
  postalCode: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  country: z.string().min(5, {
    message: "Country must be at least 5 characters",
  }),
  isDefault: z.boolean(),
});

export default function EditAddressForm({
  userId,
  handleClose,
  address,
}: {
  userId: string;
  handleClose: () => void
  address: IAddress;
}) {
  const router = useRouter();
  const editAddressForm = useForm<z.infer<typeof editAddressSchema>>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: {
      label: address.label || "",
      fullName: address.fullName || "",
      phoneNumber: address.phoneNumber || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      postalCode: address.postalCode || "",
      country: address.country || "",
      isDefault: address.isDefault || false,
    },
  });

  async function onSubmit(values: z.infer<typeof editAddressSchema>) {
    console.log(values);
    const res = await editAddress(address._id.toString(), {
      city: values.city,
      country: values.country,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      postalCode: values.postalCode,
      street: values.street,
      state: values.state,
      label: values.label,
    });
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      router.push("/profile");
      editAddressForm.reset();
      handleClose();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Form {...editAddressForm}>
      <form
        onSubmit={editAddressForm.handleSubmit(onSubmit)}
        className="space-y-6 m-2"
      >
        <FormField
          control={editAddressForm.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Enter address label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editAddressForm.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editAddressForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 w-full gap-6">
          <FormField
            control={editAddressForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editAddressForm.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <FormField
            control={editAddressForm.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter postal code"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editAddressForm.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={editAddressForm.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Enter street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="max-w-2xl">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
