import bycrypt from "bcryptjs";

export async function HashFunction(password, num) {
    return await bycrypt.hash(password, num);
}
