import { getUser } from "@/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getSession } from "@/actions/auth.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/models/User";

export default async function ProfilePage() {
  const session = await getSession();
  const user : IUser = await getUser(session.email);

  if (!user) redirect('/login');

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-none bg-background">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.username}`}
              alt={user.username}
            />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{user.username}</CardTitle>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </CardHeader>

        <Separator className="my-2" />

        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="">Joined</span>
            <span className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="">Status</span>
            <span className="font-medium text-green-600">Active</span>
          </div>

          <div className="flex justify-between">
            <span className="">User ID</span>
            <span className="font-mono text-sm text-muted-foreground">
              {user._id.toString().slice(-6).toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="">Role</span>
            <span className="font-mono text-sm text-muted-foreground">
              {user.role}
            </span>
          </div>

          <div className="pt-4">
            <Link href='/profile/edit'>
              <Button variant="default" className="w-full">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
