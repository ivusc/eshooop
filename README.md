# eshooop: E-Commerce Platform

![Thumbnail Image](/public/images/preview.png)

A modern, full-stack e-commerce platform built with Next.js, TypeScript, and MongoDB.

## Features

- **User Authentication** - Secure user registration and login
- **Product Catalog** - Browse and search products with filtering
- **Shopping Cart** - Add/remove items with real-time updates
- **Order Management** - Track orders and order history
- **Address Management** - Save and manage multiple delivery addresses
- **Product Reviews** - Leave ratings and reviews on products
- **User Profiles** - Manage account settings and preferences
- **Responsive Design** - Mobile-friendly interface

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js App Router, Server Actions
- **Database:** MongoDB with Mongoose
- **UI Components:** Custom shadcn/ui components
- **Notifications:** Sonner (Toast notifications)
- **Icons:** Lucide React

## Project Structure

```
eshooop/
├── app/
│   ├── profile/           # User profile pages
│   │   └── _components/   # Profile sub-components
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   └── actions/           # Server actions
├── components/            # Reusable UI components
├── models/                # MongoDB schemas
├── lib/                   # Utility functions
└── public/                # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd eshooop
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Add your MongoDB connection string and other config
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

### Address Management
- Add multiple delivery addresses
- Set default address
- Edit and delete addresses

### Product Reviews
- Rate products (1-5 stars)
- Leave detailed comments
- Edit and delete your reviews

### Shopping Cart
- Add/remove items
- Real-time quantity updates
- Persistent cart state

### Order Tracking
- View order history
- Track order status
- Download invoices

## API Routes

### Address Actions
- `POST /api/address` - Create new address
- `PUT /api/address/:id` - Update address
- `DELETE /api/address/:id` - Delete address

### Review Actions
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Edit review
- `DELETE /api/reviews/:id` - Delete review

## Database Models

- **User** - User account information
- **Product** - Product details and inventory
- **Review** - Product reviews and ratings
- **Address** - User delivery addresses
- **Order** - Order information and status

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email ivuschua.code@gmail.com or open an issue on GitHub.