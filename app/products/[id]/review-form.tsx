'use client'
import { createReview } from '@/actions/review.actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const reviewSchema = z.object({
  rating: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  comment: z
    .string()
    .min(10, {
      message: "Product description must be at least 30 characters.",
    }),
});

export default function ReviewForm({ userId, productId } : { userId: string, productId: string }) {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);

  const createReviewForm = useForm<z.infer<typeof reviewSchema>>({
      resolver: zodResolver(reviewSchema),
      defaultValues: {
        rating: "0",
        comment: ""
      },
    });

  async function onSubmit(values: z.infer<typeof reviewSchema>){
    console.log(values)
    const res = await createReview(userId, productId, Number(values.rating), values.comment);

    if (res.success){
      toast.success("Review created successfully.");
      createReviewForm.reset();
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }
  
  return (
    <Form {...createReviewForm}>
      <form onSubmit={createReviewForm.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className='font-semibold text-lg sm:text-xl'>Leave a Review</h3>
        <FormField
          control={createReviewForm.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={`cursor-pointer transition-colors sm:w-7 sm:h-7 ${
                        (hovered ?? Number(createReviewForm.watch("rating"))) >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => createReviewForm.setValue("rating", star.toString())}
                      {...field}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createReviewForm.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea placeholder="How is the product?" className='w-full' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto">Submit Review</Button>
      </form>
    </Form>
  )
}
