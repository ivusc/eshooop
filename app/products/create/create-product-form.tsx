"use client";
import { createProduct } from "@/actions/product.action";
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
import { Textarea } from "@/components/ui/textarea";
import { convertToPictureStringArr } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createProductSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Product name must be at least 5 characters." }),
  description: z
    .string()
    .min(10, {
      message: "Product description must be at least 50 characters.",
    }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  stock: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  category: z.string(),
  pictures: z.array(z.object({ url: z.url({ error: "Invalid url. " }) })),
});

export default function CreateProductForm() {
  const router = useRouter();

  const createProductForm = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      pictures: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray<
    z.infer<typeof createProductSchema>
  >({
    control: createProductForm.control,
    name: "pictures",
  });

  async function onSubmit(values: z.infer<typeof createProductSchema>) {
    //console.log(values);
    const pictures = convertToPictureStringArr(values.pictures);
    //console.log(pictures)
    const res = await createProduct(
      values.name,
      values.description,
      Number(values.price),
      values.category,
      Number(values.stock),
      pictures
    );

    if (res.success) {
      toast.success(`Product ${values.name} created successfully.`);
      router.push("/products");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Form {...createProductForm}>
      <form
        onSubmit={createProductForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
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
                <Input
                  placeholder="Enter product price"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProductForm.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Stock</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product stock"
                  type="number"
                  {...field}
                />
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
              <div key={field.id} className="flex flex-row space-x-4">
                <Input
                  placeholder="Enter picture links"
                  {...createProductForm.register(
                    `pictures.${index}.url` as const,
                    { required: true }
                  )}
                />
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => remove(index)}
                  disabled={index === 0}
                >
                  -
                </Button>
                <Button type="button" onClick={() => append({ url: "" })}>
                  +
                </Button>
              </div>
            </div>
          ))}
          <FormMessage />
        </div>
        <div className="flex justify-center items-center">
          <Button type="submit" className="max-w-2xl">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
