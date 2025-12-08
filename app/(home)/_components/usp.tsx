import React from 'react'
import { landingPageData } from '@/lib/constants'
import { Card, CardContent } from '@/components/ui/card'
import { NumberTicker } from '@/components/ui/number-ticker'


export default function USP() {
  return (
    <section className="my-12 sm:my-24 md:my-[12em] px-4 sm:px-6">
      <div className="max-w-7xl space-y-8 mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          {landingPageData.usp.title}
        </h2>
        <div className="w-full space-y-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 max-w-5xl w-full mx-auto">
            {landingPageData.usp.items.map((item, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 md:p-8 rounded-xl hover:bg-zinc-800 transition-all duration-200 border-none"
              >
                <CardContent className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0">
                    {item.title === 'Rating' ? '⭐' : '🚚'}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-muted-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xl sm:text-2xl font-bold">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl w-full mx-auto">
            {landingPageData.stats.items.map((item, index) => (
              <Card 
                key={index}
                className="border-none transition-all duration-300 hover:bg-zinc-800"
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <NumberTicker
                    value={item.description}
                    className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter whitespace-pre-wrap bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent w-fit mx-auto"
                  />

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mt-2">
                    {item.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
