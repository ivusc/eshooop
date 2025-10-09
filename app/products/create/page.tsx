"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import z from 'zod'

const createProductSchema = z.object({
  name: z.string().min(5, { message: "Product name must be at least 5 characters." }),
  description: z.string().min(0, { message: "Product description must be at least 50 characters."}),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  category: z.string(),
  pictures: z.array(z.object({ name: z.string()}))
})

export default function CreateProductPage() {
  const createProductForm = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      pictures: [{ name: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray(
    {
      control: createProductForm.control,
      name: "pictures"
    }
  );

  async function onSubmit(values: z.infer<typeof createProductSchema>){
    console.log('here')
    console.log(values);
  }

  return (
    <main className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold my-12'>Create Product</h1>
      <Form {...createProductForm}>
        <form onSubmit={createProductForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={createProductForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-4">
            <FormLabel>Product Picture</FormLabel>
            {fields.map((field, index) => (
              <div className="flex flex-col space-y-4" key={index}>

                <div key={field.id} className='flex flex-row space-x-4'> 
                  <Input placeholder="Enter picture links" {...createProductForm.register(`pictures.${index}.name`)} />
                  <Button type="button" variant={'destructive'} onClick={() => remove(index)} disabled={index === 0}>
                    -
                  </Button>
                  <Button type="button" onClick={() => append({ name: "" })}>
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>

            <Button
              type='submit'
              className="max-w-2xl"
            >
              Submit
            </Button>
          {/* </div> */}
        </form>
      </Form>
    </main>
  )
}
