'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import CreateAddressForm from './create-address-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddressList({ userAddress, userId } : { userAddress: any, userId: string }) {
  const [open, setOpen] = useState(false);
  //console.log(userId)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {userAddress?.map((address:any,i:number) => (
        <Card key={i} className="bg-accent/70 border-none backdrop-blur-sm  hover:border-purple-500/50 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                {address.label}
                {address.isDefault && (
                  <Badge className="bg-purple-600 text-white border-0">Default</Badge>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300 space-y-1">
              <p className="font-semibold">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
              <p>{address.postalCode}</p>
            </div>
            {!address.isDefault && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4  text-white hover:bg-gray-800"
              >
                Set as Default
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Card className="bg-accent/70 backdrop-blur-sm border-dashed hover:border-indigo-500/50 transition-all cursor-pointer flex items-center justify-center h-full min-h-[240px]">
            <CardContent className="text-center">
              <div className="text-6xl text-gray-600 mb-4">+</div>
              <p className="text-gray-400">Add New Address</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className='!max-w-4xl'>
          <DialogTitle className='m-4'>Add New Address</DialogTitle>
            <CreateAddressForm userId={userId} setOpen={setOpen}/>
          </DialogContent>
      </Dialog>
    </div>
  )
}
