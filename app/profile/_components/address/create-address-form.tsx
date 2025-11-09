'use client'
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';

const createAddressSchema = z.object({
  label: z
    .string()
    .min(5, { message: "Label must be at least 5 characters." }),
  fullName: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    }),
  phoneNumber: z.string()
    .min(5, {
      message: "Number must be at least 5 characters.",
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
    .min(5,{
      message: "State must at least be 5 characters"
    }),
  postalCode: z.string()
    .min(6,{
      message: "Postal code must at least be 6 characters"
    }),
  country: z.string()
    .min(5,{
      message: "Country must be at least 5 characters"
    }),
  isDefault: z.boolean()
});

export default function CreateAddressForm() {
  const createAddressForm = useForm<z.infer<typeof createAddressSchema>>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      label: "",
      fullName: "",
      phoneNumber: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      isDefault: false
    },
  });

  async function onSubmit(values:z.infer<typeof createAddressSchema>){
    console.log(values)
  }
  
  return (
    <Form {...createAddressForm}>
      <form onSubmit={createAddressForm.handleSubmit(onSubmit)}>
        
      </form>
    </Form>
  )
}
