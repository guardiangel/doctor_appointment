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
    console.log("doctors.obj.categoryValue=", obj.categoryValue);
    //get all the doctors
    let doctors: User[] | null = await customPrisma.user.findMany({
      where: {
        type: "2",
        categoryValue: obj.categoryValue,
      },
    });
    console.log("doctors=", doctors);
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
        console.log("user2===", users);
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
