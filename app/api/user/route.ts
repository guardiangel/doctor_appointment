import { customPrisma } from "../prismaClient";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

///api/user
export async function GET(req: Request) {
  let user: User | null;

  const { searchParams } = new URL(req.url);
  const obj = Object.fromEntries(searchParams.entries());

  if (obj.viewPersonalFlag) {
    user = await customPrisma.user.findUnique({
      where: {
        id: obj.id,
      },
      include: {
        treatments: true,
      },
    });
  } else if (obj.searchAllDoctor) {
    //get all the doctors
    let doctor: User[] | null = await customPrisma.user.findMany({
      where: {
        type: "2",
      },
      include: {
        treatments: true,
      },
    });
    return NextResponse.json(doctor);
  } else if (obj.viewCustomer) {
    //view customer page,get all the customer(patients)
    const users: User[] = await customPrisma.user.findMany({
      where: {
        type: "3",
      },
    });
    return NextResponse.json(users);
  } else if (obj.viewSingleCustomer) {
    //view customer page,get one customer(patients)
    const users: User[] = await customPrisma.user.findMany({
      where: {
        type: "3",
      },
    });
    return NextResponse.json(users);
  } else {
    const { userId, password, type } = obj;
    user = await customPrisma.user.findFirst({
      where: {
        userId: userId,
        password: password,
        type: type,
      },
      include: {
        treatments: true,
      },
    });
  }

  //Remove the password
  const formatUser = { ...user, password: "" };

  return NextResponse.json(formatUser);
}

//Modify userInfo
export async function PATCH(req: Request) {
  const { id, userId, userName, address, phone, email, type } =
    await req.json();

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
    include: {
      treatments: true,
    },
  });

  return NextResponse.json(updatedUser);
}
