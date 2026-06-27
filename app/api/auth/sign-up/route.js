import { NextResponse } from "next/server";
import { MESSAGES, STATUS_CODES } from "@/lib";
import { registerUserController } from "@/controller";
import { signUpSchema } from "@/lib/validation";

export async function POST(request) {
  try {
    const body = await request.json();

    const validation = signUpSchema.safeParse(body);

    if (!validation.success) {
      const errors = {};
      validation.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });

      return NextResponse.json(
        { errors },
        { status: STATUS_CODES.BAD_REQUEST },
      );
    }

    const { email, password } = validation.data;

    const result = await registerUserController(email, password);

    if (!result.success) {
      return NextResponse.json(
        { errors: { email: result.error } },
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
