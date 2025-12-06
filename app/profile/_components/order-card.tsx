import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IOrder, IOrderItem } from '@/models/Order'
import { IProduct } from '@/models/Product'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function OrderCard({ order } : { order: IOrder }) {
  return (
    <Card key={order._id.toString()} className="border-none hover:bg-accent bg-accent/70 p-3 sm:p-4 rounded-xl shadow-sm">
      <Link
        href={`/orders/${order._id.toString()}`}
        className="block hover:bg-muted/30 transition rounded-lg p-2"
      >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <h3 className="font-medium text-sm sm:text-base">Order #{order._id.toString().slice(-6).toUpperCase()}</h3>
          <Badge className={`bg-green-600 text-white border-0 text-xs`}>
            {order.status.toUpperCase()}
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          {new Date(order.createdAt).toLocaleString()}
        </p>
        <ul className="space-y-2">
          {order.items.map((item: IOrderItem) => (
            <li key={item.product._id.toString()} className="flex flex-col sm:flex-row justify-between gap-2">
              <div className='flex justify-start items-center space-x-2 sm:space-x-4'>
                <Image src={(item.product as IProduct).pictures[0]} width={48} height={48} className='bg-zinc-100/90 rounded-lg p-1 w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0' alt={(item.product as IProduct).name} />
                <span className="text-sm sm:text-base">
                  {(item.product as IProduct).name} x {item.quantity}
                </span>
              </div>
              <span className="text-sm sm:text-base font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end space-y-2 mt-3 sm:mt-2">
        <div className="text-base sm:text-lg font-bold w-full flex justify-between">
          <span className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text w-fit text-transparent'>Total</span>
          <span className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text w-fit text-transparent'>${order.total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {order.status === 'paid' && (
            <Button size="sm" className="w-full sm:w-auto">
              Buy Again
            </Button>
          )}
        </div>
      </div>
      </Link>
    </Card>
  )
}
