import { Card } from '@/components/ui/card'
import React from 'react'

export default function TrustBadges() {
  return (
  <div className="grid grid-cols-3 gap-3 sm:gap-4">
    <Card className="text-center border-none bg-accent/70 hover:bg-accent p-3 sm:p-4 transition-colors">
      <div className="text-2xl sm:text-3xl mb-2">🔒</div>
      <p className="text-xs sm:text-sm text-muted-foreground">Secure Payment</p>
    </Card>
    <Card className="text-center border-none bg-accent/70 hover:bg-accent p-3 sm:p-4 transition-colors">
      <div className="text-2xl sm:text-3xl mb-2">↩️</div>
      <p className="text-xs sm:text-sm text-muted-foreground">Easy Returns</p>
    </Card>
    <Card className="text-center border-none bg-accent/70 hover:bg-accent p-3 sm:p-4 transition-colors">
      <div className="text-2xl sm:text-3xl mb-2">✓</div>
      <p className="text-xs sm:text-sm text-muted-foreground">Quality Guarantee</p>
    </Card>
  </div>
  )
}
