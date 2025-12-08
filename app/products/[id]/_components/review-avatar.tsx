import { IUser } from "@/models/User";

interface ReviewAvatarProps {
  user: IUser;
}

export default function ReviewAvatar({ user }: ReviewAvatarProps) {
  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold flex-shrink-0">
      {user.username.charAt(0)}
    </div>
  );
}