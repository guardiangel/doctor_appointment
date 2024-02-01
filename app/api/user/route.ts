import { customPrisma } from "../prismaClient";
import { Category, User } from "@prisma/client";
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
  } else if (obj.searchAllDoctorByCategoryId) {
    //get all the doctors
    let doctors: User[] | null = await customPrisma.user.findMany({
      where: {
        type: "2",
        categoryValue: obj.categoryValue,
      },
    });
    return NextResponse.json(doctors);
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
        userId: obj.userId,
      },
      include: {
        treatments: true,
      },
    });
    return NextResponse.json(users);
  } else if (obj.searchDoctorByConditions) {
    let users: User[] = [];
    //Patient searches doctors by name, category, or address.
    //  //1 by name, 2 by categoryId, 3 by address
    switch (obj.searchOptionValue) {
      case "1": //search based on doctor's name
        users = await customPrisma.user.findMany({
          where: {
            userName: obj.doctorName,
            type: "2", //2 means doctor
          },
          include: {
            category: true,
          },
        });

        break;

      case "2": //search based on doctor's category
        users = await customPrisma.user.findMany({
          where: {
            categoryValue: obj.categoryValue,
            type: "2", //2 means doctor
          },
          include: {
            category: true,
          },
        });
        break;
      case "3": //search based on doctor's address
        users = await customPrisma.user.findMany({
          where: {
            address: {
              contains: obj.doctorAddress,
            },
            type: "2", //2 means doctor
          },
          include: {
            category: true,
          },
        });
        break;
    }

    return NextResponse.json(users);
  } else if (obj.adminViewDoctor) {
    //get all the doctor
    const users: User[] = await customPrisma.user.findMany({
      where: {
        type: "2",
      },
      include: {
        category: true,
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

  return NextResponse.json(user);
}

//Modify userInfo
export async function PATCH(req: Request) {
  const { id, userId, userName, address, phone, email, category } =
    await req.json();

  try {
    const data = {
      userId: userId,
      userName: userName,
      address: address,
      phone: phone,
      email: email,
      //type: type ? type : undefined, //1 admin 2 doctor 3 patient
      categoryValue: category ? category : undefined,
    };

    await customPrisma.user.update({
      where: {
        id: id,
      },
      data,
    });
    return NextResponse.json({
      status: "8888",
      message: `modify userId ${userId} Info successfully.`,
    });
  } catch (e: any) {
    return NextResponse.json({ status: "9999", message: e?.meta?.cause });
  }
}

//add new user
export async function POST(req: Request) {
  const {
    userId,
    userName,
    password,
    address,
    phone,
    gender,
    age,
    email,
    type,
    category,
  } = await req.json();

  const existUser: User[] = await customPrisma.user.findMany({
    where: {
      OR: [
        {
          userId: userId,
        },
        {
          email: email,
        },
      ],
    },
  });

  if (existUser.length > 0) {
    return NextResponse.json({
      status: "9999",
      message: `The userid ${userId} or email ${email} already exists in database, can't add.`,
    });
  }

  try {
    const data = {
      userId: userId,
      userName: userName,
      password: password,
      address: address,
      phone: phone,
      email: email,
      gender: gender,
      age: parseInt(age),
      type: type, //1 admin 2 doctor 3 patient
      categoryValue: category ? category : undefined,
    };

    await customPrisma.user.create({
      data,
    });
    return NextResponse.json({
      status: "8888",
      message: `Add user, userId ${userId} successfully.`,
    });
  } catch (e: any) {
    return NextResponse.json({ status: "9999", message: e?.meta?.cause });
  }
}
