export const navLinks = [
  { label: 'Products', link: '/products', sublinks: [{ link: '/products/create', label: 'Create +' }, { link: '/categories', label: 'Categories'}] },
]

export const landingPageData = {
  about: {
    title: "About eShooop",
    tagline: 'Discover millions of products from trusted sellers worldwide. Get the best deals, fastest shipping, and premium quality—all in one place.',
    description: `
      eShooop isn't just another online store — it's a digital reflection of desire.<br/><br/>
      A place where familiarity meets innovation, and every product feels like something you've already dreamed of owning.<br/><br/>
      We believe shopping should feel less like consumption, and more like recognition — the quiet moment when you see something and think, *this was meant for me*.<br/><br/>
      Welcome to eShooop — where everything feels like a copy, of a copy, of something you once loved.
    `
  },

  usp: {
    title: "What Makes Us Unique",
    items: [
      { title: 'Rating', description: '4.9/5' },
      { title: 'Fast Delivery', description: '2 - 3 Days' },
    ]
  },

  stats: {
    title: "Used by Millions",
    items: [
      { title: 'Products (Millions)', description: 10 },
      { title: 'Sellers (Thousands)', description: 500 },
      { title: 'Satisfied Customers (Millions)', description: 12 },
    ]
  },

  benefits: {
    title: "Why eShooop",
    items: [
      {
        title: "Curated with Intention",
        description: "Every item is chosen for its design, emotion, and story — not just its price tag."
      },
      {
        title: "Effortless Experience",
        description: "Built with simplicity in mind. Browse, click, and own — in just a heartbeat."
      },
      {
        title: "Minimal & Modern",
        description: "A clean interface that lets the products speak. No clutter, no noise, just presence."
      },
      {
        title: "Sustainably Conscious",
        description: "We partner with ethical brands and ensure every order moves with purpose."
      }
    ]
  },

  testimonials: {
    title: "What People Are Saying",
    reviews: [
      {
        name: "Alyssa M.",
        comment: "It feels like something I've owned in a dream. Quality's great, shipping was fast.",
        rating: 5
      },
      {
        name: "Riku S.",
        comment: "Minimal, functional, and weirdly nostalgic. The packaging was almost too perfect.",
        rating: 4
      },
      {
        name: "Lara N.",
        comment: "I didn't need it, but somehow it feels essential now. That's Eshooop's magic.",
        rating: 5
      },
      {
        name: "Kai W.",
        comment: "Cool concept but the item quality didn't match the price.",
        rating: 2
      }
    ]
  },

  discover: {
    title: "Discover What Feels Familiar",
    description: `
      Explore a collection of modern essentials, design pieces, and digital-daydream objects.  
      From your workspace to your daily rituals, every product in Eshooop exists to make the ordinary feel cinematic again.  
      Rediscover what you've been missing — or maybe what you've always known.
    `,
    cta: "Start Discovering"
  }
}

export const footerData = {
  brand: {
    name: "eshooop",
    tagline: "Discover millions of products from trusted sellers worldwide."
  },
  links: {
    shop: [
      { label: "All Products", href: "/products" },
      { label: "Best Sellers", href: "#" },
      { label: "New Arrivals", href: "#" },
      { label: "Deals", href: "#" }
    ],
    company: [
      { label: "About Us", href: "/#about" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" }
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Shipping Info", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Track Order", href: "/orders" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" }
    ]
  },
  social: [
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" }
  ]
};