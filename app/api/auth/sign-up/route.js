import { NextResponse } from "next/server";
import { QueryExecuter, HashFunction } from "@/lib";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const existingUser = await QueryExecuter(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email Already Registered" },
        { status: 400 },
      );
    }

    const hashPassword = await HashFunction(password, 10);

    await QueryExecuter(
      "INSERT INTO users (email, password_hash) VALUES ( ? , ? )",
      [email, hashPassword],
    );

    return NextResponse.json({
      success: true,
      message: "User Resgistered Successfully!",
    });
  } catch (err) {
    return NextResponse.json(
      console.error(err),
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
