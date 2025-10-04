import { getSession } from "@/actions/auth.actions";

export default async function Home() {
  const session = await getSession();
  console.log(session)
  
  return (
    <div className="">
      <pre>{session?.name}: {session?.email}</pre>
    </div>
  );
}
