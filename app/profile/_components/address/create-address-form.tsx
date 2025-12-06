'use client'
import { addAddress } from '@/actions/user.actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const createAddressSchema = z.object({
  label: z
    .string()
    .min(2, { message: "Label must be at least 5 characters." }),
  fullName: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    }),
  phoneNumber: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  street: z.string()
    .min(5, {
      message: "Street must at least be 5 characters."
    }),
  city: z.string()
    .min(5, {
      message: "City must at least be 5 characters"
    }),
  state: z.string()
    .min(2,{
      message: "State must at least be 5 characters"
    }),
  postalCode: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  country: z.string()
    .min(5,{
      message: "Country must be at least 5 characters"
    }),
  isDefault: z.boolean()
});

export default function CreateAddressForm({ userId, setOpen } : { userId: string, setOpen: Dispatch<SetStateAction<boolean>> }) {
  console.log(userId)
  const router = useRouter();
  const createAddressForm = useForm<z.infer<typeof createAddressSchema>>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      label: "",
      fullName: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false
    },
  });

  async function onSubmit(values:z.infer<typeof createAddressSchema>){
    console.log(values)
    const res = await addAddress(userId,{ city: values.city, country: values.country, fullName: values.fullName, phoneNumber: values.phoneNumber, postalCode: values.postalCode, street: values.street, state: values.state, label: values.label })
    console.log(res)
    if (res.success) {
      toast.success(res.message);
      router.push("/profile");
      createAddressForm.reset();
      setOpen(false);
    } else {
      toast.error(res.message);
    }
  }
  
  return (
    <Form {...createAddressForm}>
      <form onSubmit={createAddressForm.handleSubmit(onSubmit)} className='space-y-6 m-2'>
        <FormField
          control={createAddressForm.control}
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
          control={createAddressForm.control}
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
          control={createAddressForm.control}
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
            control={createAddressForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter city"

                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createAddressForm.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter state"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-6">
          <FormField
            control={createAddressForm.control}
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
            control={createAddressForm.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter country"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={createAddressForm.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter street"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex justify-center items-center">
          <Button type='submit' className="max-w-2xl">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
