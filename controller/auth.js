import {
  QueryExecuter,
  HashFunction,
  CompareFunction,
  MESSAGES,
  STATUS_CODES,
} from "@/lib";
import { success } from "zod";

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
    throw new Error(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const loginUserController = async (email, password) => {
  try {
    const existingUser = await QueryExecuter(
      "SELECT email, password_hash FROM users WHERE email = ? ",
      [email],
    );

    if (existingUser.length === 0) {
      return {
        success: false,
        message: MESSAGES.ACCOUNT_NOT_EXIST,
        status: STATUS_CODES.UNAUTHORIZED,
      };
    }
    const user = existingUser[0];
    const isPasswordValid = await CompareFunction(password, user.password_hash);
    if (!isPasswordValid) {
      return {
        success: false,
        message: MESSAGES.PASSWORD_NO_VALID,
        status: STATUS_CODES.UNAUTHORIZED,
      };
    }

    return {
      success: true,
      message: MESSAGES.LOGIN_SUCCESS,
      status: STATUS_CODES.SUCCESS,
    };
  } catch (error) {
    return {
      success: false,
      message: MESSAGES.INTERNAL_SERVER_ERROR,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};
