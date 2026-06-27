import { QueryExecuter, HashFunction, MESSAGES, STATUS_CODES } from "@/lib";

export const registerUserController = async (email, password) => {
  try {
    const existingUser = await QueryExecuter(
      "SELECT id FROM users WHERE email = ? ",
      [email],
    );

    if (existingUser.length > 0) {
      return {
        success: false,
        error: MESSAGES.EMAIL_ALREADY_REGISTERED,
        status: STATUS_CODES.BAD_REQUEST,
      };
    }
    const hashPassword = await HashFunction(password, 10);

    await QueryExecuter(
      "INSERT INTO users (email, password_hash) VALUES ( ? , ? )",
      [email, hashPassword],
    );

    return {
      success: true,
      message: MESSAGES.USER_REGISTERED_SUCCESS,
      status: STATUS_CODES.SUCCESS,
    };
  } catch (error) {
    console.error("Error in registerUserController", error);
    throw new Error(MESSAGES.INTERNAL_SEVER_ERROR);
  }
};
