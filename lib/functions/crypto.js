import bycrypt from "bcryptjs";

export async function HashFunction(password, num) {
    return await bycrypt.hash(password, num);
}

export async function CompareFunction(plainText, passwordHash) {
    return await bycrypt.compare(plainText, passwordHash)
}