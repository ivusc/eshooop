import { clsx, type ClassValue } from "clsx"
import { jwtVerify, SignJWT } from "jose";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

/**
 * Generate random bytes and return as hex string
 * @param length - Number of bytes to generate
 * @returns returns Random hex string
 */
export function randomBytesToHex(length: number) {
  let hex = "";
  for (let i = 0; i < length; i++) {
    const byte = Math.floor(Math.random() * 256);
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}