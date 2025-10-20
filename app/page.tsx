import { getSession } from "@/actions/auth.actions";
import { Hero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  console.log(session)
  
  return (
    <div className="w-full">
      <pre className="text-black">{session?.username}: {session?.email}</pre>
      <Hero/>
    </div>
  );
}
