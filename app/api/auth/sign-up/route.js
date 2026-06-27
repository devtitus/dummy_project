import { NextResponse } from "next/server";
import { QueryExecuter, HashFunction, ERROR_MESSAGES, STATUS_CODES } from "@/lib";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const existingUser = await QueryExecuter(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED },
        { status: STATUS_CODES.BAD_REQUEST },
      );
    }

    const hashPassword = await HashFunction(password, 10);

    await QueryExecuter(
      "INSERT INTO users (email, password_hash) VALUES ( ? , ? )",
      [email, hashPassword],
    );

    return NextResponse.json({
      success: true,
      message: ERROR_MESSAGES.USER_REGISTERED_SUCCESS,
    });
  } catch (err) {
    return NextResponse.json(
      console.error(err),
      { error: "Internal Server Error" },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR },
    );
  }
}
