import { NextRequest } from "next/server";
import { updateSession } from "@/actions/auth.actions";

export async function middleware(request: NextRequest) {
  //console.log('middleware')
  return await updateSession(request);
}