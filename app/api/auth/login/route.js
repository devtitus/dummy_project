import { NextResponse } from "next/server";
import { MESSAGES, STATUS_CODES } from "@/lib";
import { loginSchema } from "@/lib/validation";
import { loginUserController } from "@/controller";

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

    return NextResponse.json(
      { success: true, message: result.success },
      { status: result.status },
    );
  } catch (err) {
    console.error("Login API Route Issue", err)
    return NextResponse.json(
        {error: MESSAGES.INTERNAL_SERVER_ERROR},
        {status: STATUS_CODES.INTERNAL_SERVER_ERROR}
    )
  }
}
