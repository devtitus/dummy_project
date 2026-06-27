import { NextResponse } from "next/server";
import { MESSAGES, STATUS_CODES } from "@/lib";
import { registerUserController } from "@/controller";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: MESSAGES.EMAIL_IS_REQUIRED },
        { status: STATUS_CODES.BAD_REQUEST },
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: MESSAGES.PASSWORD_IS_REQUIRED },
        { status: STATUS_CODES.BAD_REQUEST },
      );
    }

    const result = await registerUserController(email, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
      },
      { status: result.status },
    );
  } catch (err) {
    console.error("API Route Issue: ", err);
    return NextResponse.json(
      { error: MESSAGES.INTERNAL_SERVER_ERROR },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR },
    );
  }
}
