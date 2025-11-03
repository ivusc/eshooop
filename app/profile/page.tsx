import { getUser } from "@/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getSession } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/models/User";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { getOrdersByUser } from "@/actions/order.actions";
import { IOrder } from "@/models/Order";
import OrderCard from "./_components/order-card";
import { getReviewsByUser } from "@/actions/review.actions";
import { IReview } from "@/models/Review";

const userData = {
  profile: {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "AT",
    joinDate: "January 2024",
    verified: true,
    membershipTier: "Gold"
  },
  stats: {
    totalOrders: 47,
    totalSpent: 3250.50,
    savedItems: 23,
    reviewsWritten: 12
  },
  addresses: [
    {
      id: 1,
      label: "Home",
      name: "Alex Thompson",
      street: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
      isDefault: true
    },
    {
      id: 2,
      label: "Work",
      name: "Alex Thompson",
      street: "456 Business Ave, Suite 200",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
      isDefault: false
    }
  ],
  orders: [
    {
      id: "ORD-2024-1234",
      date: "Nov 1, 2024",
      status: "Delivered",
      total: 199.99,
      items: 2,
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-2024-1233",
      date: "Oct 28, 2024",
      status: "In Transit",
      total: 89.99,
      items: 1,
      trackingNumber: "TRK987654321"
    },
    {
      id: "ORD-2024-1232",
      date: "Oct 15, 2024",
      status: "Delivered",
      total: 249.99,
      items: 3,
      trackingNumber: "TRK456789123"
    }
  ],
  savedItems: [
    { id: 1, name: "Smart Watch Ultra", price: 399.99, image: "⌚" },
    { id: 2, name: "Wireless Earbuds", price: 149.99, image: "🎧" },
    { id: 3, name: "Fitness Tracker", price: 79.99, image: "📱" }
  ]
};


export default async function ProfilePage() {
  const session = await getSession();
  const user : IUser = await getUser(session.email);
  const reviews: IReview[] = await getReviewsByUser(session.id);
  const orders : IOrder[] = await getOrdersByUser(session.id);

  if (!user) redirect('/login');

  // const getStatusColor = (status:string) => {
  //   switch(status) {
  //     case 'Delivered': return 'bg-green-600';
  //     case 'In Transit': return 'bg-blue-600';
  //     case 'Processing': return 'bg-yellow-600';
  //     case 'Cancelled': return 'bg-red-600';
  //     default: return 'bg-gray-600';
  //   }
  // };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-300 to-gray-500';
      case 'Bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-indigo-400 to-purple-400';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="bg-accent/70 backdrop-blur-sm border-none mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {user.username.slice(0,2)}
                </div>
                {userData.profile.verified && (
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-gray-800">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                  <Badge className={`bg-gradient-to-r ${getTierColor(userData.profile.membershipTier)} text-white border-0`}>
                    {userData.profile.membershipTier} Member
                  </Badge>
                </div>
                <p className="text-gray-400 mb-1">{user.email}</p>
                <p className="text-gray-400 mb-3">{userData.profile.phone}</p>
                <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleString()}</p>
              </div>

              {/* Edit Button */}
              <Link href={`/profile/edit`}>
                <Button
                  variant="outline"
                  className=" text-white hover:bg-accent"
                >
                  Edit Profile
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <Separator className="bg-zinc-900 my-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
                  {orders.length}
                </div>
                <div className="text-sm text-gray-400 mt-1">Total Orders</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
                  ${userData.stats.totalSpent}
                </div>
                <div className="text-sm text-gray-400 mt-1">Total Spent</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 w-fit bg-clip-text text-transparent">
                  {userData.stats.savedItems}
                </div>
                <div className="text-sm text-gray-400 mt-1">Saved Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {reviews.length}
                </div>
                <div className="text-sm text-gray-400 mt-1">Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-accent/70 border-none border  mb-6">
            <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600">Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-purple-600">Addresses</TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-purple-600">Saved Items ({userData.savedItems.length})</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">Settings</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" id='orders'>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard order={order} key={order._id.toString()}/>
              ))}
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="grid md:grid-cols-2 gap-6">
              {userData.addresses.map((address) => (
                <Card key={address.id} className="bg-accent/70 border-none backdrop-blur-sm  hover:border-purple-500/50 transition-all">
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
              <Card className="bg-accent/70 backdrop-blur-sm  border-dashed hover:border-purple-500/50 transition-all cursor-pointer flex items-center justify-center min-h-[250px]">
                <CardContent className="text-center">
                  <div className="text-6xl text-gray-600 mb-4">+</div>
                  <p className="text-gray-400">Add New Address</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Saved Items Tab */}
          <TabsContent value="saved">
            <div className="grid md:grid-cols-3 gap-6">
              {userData.savedItems.map((item) => (
                <Card key={item.id} className="bg-accent/70 border-none backdrop-blur-sm  hover:border-purple-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg p-8 mb-4 flex items-center justify-center h-40">
                      <div className="text-6xl">{item.image}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        ${item.price}
                      </span>
                      <Button size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="bg-accent/70 border-none backdrop-blur-sm ">
                <CardHeader>
                  <CardTitle className="text-white">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
                    <Input 
                      defaultValue={userData.profile.name}
                      className="bg-gray-900  text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Email</label>
                    <Input 
                      defaultValue={userData.profile.email}
                      className="bg-gray-900  text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Phone</label>
                    <Input 
                      defaultValue={userData.profile.phone}
                      className="bg-gray-900  text-white"
                    />
                  </div>
                  <Button className="">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-accent/70 border-none backdrop-blur-sm ">
                <CardHeader>
                  <CardTitle className="text-white">Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full  text-white hover:bg-gray-800">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full  text-white hover:bg-gray-800">
                    Enable Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-accent/70 border-none backdrop-blur-sm ">
                <CardHeader>
                  <CardTitle className="text-white">Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b ">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive order updates via email</p>
                    </div>
                    <Button variant="outline" size="sm" className=" text-white">
                      On
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b ">
                    <div>
                      <p className="text-white font-medium">Marketing Emails</p>
                      <p className="text-sm text-gray-400">Get deals and promotions</p>
                    </div>
                    <Button variant="outline" size="sm" className=" text-white">
                      Off
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-400">Get shipping updates via SMS</p>
                    </div>
                    <Button variant="outline" size="sm" className=" text-white">
                      On
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
