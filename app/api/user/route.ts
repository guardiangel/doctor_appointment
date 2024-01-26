import { customPrisma } from "../prismaClient";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

///api/user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const obj = Object.fromEntries(searchParams.entries());
  const { userId, password, type } = obj;
  const user: User | null = await customPrisma.user.findFirst({
    where: {
      userId: userId,
      password: password,
      type: type,
    },
  });

  //Remove the password
  const formatUser = { ...user, password: "" };

  return NextResponse.json(formatUser);
}

//Modify userInfo
export async function PATCH(req: Request) {
  const { id, userId, userName, address, phone, email, type } =
    await req.json();

  console.log("parameter==", id, userId, userName, address, phone, email);

  const data = {
    userId: userId,
    userName: userName,
    address: address,
    phone: phone,
    email: email,
  };

  const updatedUser = await customPrisma.user.update({
    where: {
      id: id,
    },
    data,
  });

  return NextResponse.json(updatedUser);
}
