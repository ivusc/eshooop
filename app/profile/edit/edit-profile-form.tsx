'use client'
import { updateProfile } from '@/actions/user.actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IUser } from '@/models/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const editProfileSchema = z.object({
  username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters" }),
  email: z.email({ message: "Invalid email address" }),
  phone: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  picture: z.url({ error: "Invalid url." })
});

export default function EditProfileForm({ user } : { user:  IUser }) {
  const router = useRouter();

  const editProfileForm = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user.username || "",
      email: user.email || "",
      phone: user.phone?.toString() || "",
      picture: user.picture || ""
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileSchema>){
    //console.log(values, 39);
    const res = await updateProfile(
      user._id.toString(),
      values.username,
      values.email,
      Number(values.phone),
      values.picture
    );

    if (res.success) {
      toast.success(res.message);
      router.refresh();
      router.push("/profile");
    } else {
      toast.error(res.message);
    }
  }
  
  
  useEffect(() => {
    if (user) {
      editProfileForm.reset();
    }
  }, [user, editProfileForm]);

  return (
    <Form {...editProfileForm}>
      <form
        onSubmit={editProfileForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={editProfileForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editProfileForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editProfileForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editProfileForm.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input placeholder="Enter your profile picture URL" type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button type="submit" className="max-w-2xl">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
