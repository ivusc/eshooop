import { getFullUserDetails } from "@/actions/user.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSession } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/models/User";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOrdersByUser, getTotalOrders } from "@/actions/order.actions";
import { IOrder } from "@/models/Order";
import OrderCard from "@/app/profile/_components/order-card";
import { getReviewsByUser } from "@/actions/review.actions";
import { IReview } from "@/models/Review";
import SavedItems from "@/app/profile/_components/saved-items";
import AddressList from "@/app/profile/_components/address/address-list";
import { IProduct } from "@/models/Product";
import UserStats from "@/app/profile/_components/user-stats";
import { getAddresses } from "@/actions/address.actions";
import { IAddress } from "@/models/Address";

const userData = {
  profile: {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "AT",
    joinDate: "January 2024",
    verified: true,
    membershipTier: "Gold",
  },
  stats: {
    totalOrders: 47,
    totalSpent: 3250.5,
    savedItems: 23,
    reviewsWritten: 12,
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
      isDefault: true,
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
      isDefault: false,
    },
  ]
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user: IUser = await getFullUserDetails(session.email);
  const addresses: IAddress[] = await getAddresses(session.id);
  console.log(addresses)
  const reviews: IReview[] = await getReviewsByUser(session.id);
  const orders: IOrder[] = await getOrdersByUser(session.id);
  const ordersStats = await getTotalOrders(session.id);
  console.log(user._id)

  //console.log(user)

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
    switch (tier) {
      case "Gold":
        return "from-yellow-400 to-yellow-600";
      case "Silver":
        return "from-gray-300 to-gray-500";
      case "Bronze":
        return "from-orange-400 to-orange-600";
      default:
        return "from-indigo-400 to-purple-400";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="2xl:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Profile Header */}
        <Card className="bg-accent/70 backdrop-blur-sm border-none mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-4xl font-bold">
                  {user.username.slice(0, 2)}
                </div>
                {userData.profile.verified && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center border-2 sm:border-4 border-gray-800">
                    <span className="text-white text-sm sm:text-lg">✓</span>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {user.username}
                  </h1>
                  <Badge
                    className={`bg-gradient-to-r ${getTierColor(
                      userData.profile.membershipTier
                    )} text-white border-0 text-xs sm:text-sm`}
                  >
                    {userData.profile.membershipTier} Member
                  </Badge>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-1 break-all">{user.email}</p>
                <p className="text-sm sm:text-base text-gray-400 mb-3">{user.phone}</p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Member since {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Edit Button */}
              <Link href={`/profile/edit`} className="w-full md:w-auto">
                <Button
                  variant="outline"
                  className="w-full md:w-auto text-white hover:bg-accent"
                >
                  Edit Profile
                </Button>
              </Link>
            </div>

            <UserStats
              totalOrders={ordersStats.count}
              totalSpent={ordersStats.total}
              totalReviews={reviews.length}
              totalSaved={user.savedProducts.length}
            />
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="bg-accent/70 border-none border mb-4 sm:mb-6 w-full overflow-x-auto">
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-purple-600 text-xs sm:text-sm"
            >
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="data-[state=active]:bg-purple-600 text-xs sm:text-sm"
            >
              Addresses
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="data-[state=active]:bg-purple-600 text-xs sm:text-sm"
            >
              Saved Items ({user.savedProducts.length})
            </TabsTrigger>
            {/* <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">Settings</TabsTrigger> */}
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" id="orders">
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard order={order} key={order._id.toString()} />
              ))}
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <AddressList userAddress={addresses} userId={user._id.toString()}/>
          </TabsContent>

          {/* Saved Items Tab */}
          <TabsContent value="saved">
            <SavedItems items={user.savedProducts as IProduct[]} user={user} />
          </TabsContent>

          {/* Settings Tab */}
          {/* <TabsContent value="settings">
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
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
