import { customPrisma } from "../prismaClient";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, password, type } = await req.json();
  const user: User | null = await customPrisma.user.findFirst({
    where: {
      userId: userId,
      password: password,
      type: type,
    },
  });
  console.log("user..........", user);
  return NextResponse.json(user);
}
