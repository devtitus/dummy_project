import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSessionToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d") // 1 Day
    .sign(encodedKey);
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify token.");
    return null;
  }
}
