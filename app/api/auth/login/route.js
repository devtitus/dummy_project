import { NextResponse } from "next/server";
import { MESSAGES, STATUS_CODES } from "@/lib";
import { loginSchema } from "@/lib/validation";
import { loginUserController } from "@/controller";
import { createSessionToken } from "@/lib";

export async function POST(request) {
  try {
    const body = await request.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      const errors = {};
      validation.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });

      return NextResponse.json({ errors }, { status: STATUS_CODES.BAD_REQUEST });
    }

    const { email, password } = validation.data;

    const result = await loginUserController(email, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: result.status },
      );
    }

    // Set Cookie Expiration 1 Day from now 
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const sessionToken = await createSessionToken({
      user: result.user,
      expires
    })

    const response = NextResponse.json(
      { success: true, message: result.success },
      { status: result.status },
    );

    response.cookies.set({
      name: "session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // uses https in production
      sameSite: "lax",
      path: "/", // Available for whole app
      expires: expires
    })

    return response;
   
  } catch (err) {
    console.error("Login API Route Issue", err)
    return NextResponse.json(
        {error: MESSAGES.INTERNAL_SERVER_ERROR},
        {status: STATUS_CODES.INTERNAL_SERVER_ERROR}
    )
  }
}
