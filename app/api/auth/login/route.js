import { NextResponse } from "next/server";
import { hashPassword, QueryExecuter } from "@/lib";

export async function POST(request) {
    const {email, password} = await request.json();
}