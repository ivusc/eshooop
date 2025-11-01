/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { createCheckoutSessionForCart } from '@/actions/stripe.actions';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react'

export default function CheckoutButton({ userId } : { userId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = async () => {
    startTransition(async () => {
      try {
        // call server action — returns { url }
        const res = await createCheckoutSessionForCart(userId);
        if (res?.url) {
          // redirect browser to Stripe Checkout
          window.location.href = res.url;
        } else {
          alert("Failed to create checkout session");
        }
      } catch (err: any) {
        console.error("Checkout error:", err);
        alert(err?.message || "Checkout failed");
      }
    });
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <Button className="items-center justify-center" onClick={handleCheckout} disabled={isPending}>
        {isPending ? "Redirecting..." : "Pay with Card"}
      </Button>
    </div>
  );
}

