import { IUser } from "@/models/User";
import ReviewAvatar from "./review-avatar";

interface ReviewHeaderProps {
  user: IUser;
  createdAt: Date;
}

export default function ReviewHeader({ user, createdAt }: ReviewHeaderProps) {
  return (
    <div className="space-x-3 sm:space-x-4 flex items-center">
      <ReviewAvatar user={user} />
      <div className="flex flex-col">
        <p className="font-medium text-sm sm:text-base">
          {user.username || "Anonymous"}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(createdAt).toLocaleString('en-SG')}
        </p>
        {/* <p>{user._id.toString()}</p> */}
      </div>
    </div>
  );
}