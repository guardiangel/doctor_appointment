import { Appointment, Category } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";

//api/appointment
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const obj = Object.fromEntries(searchParams.entries());

  if (obj.getMaxFlag) {
    const appointmentId: String =
      await customPrisma.$queryRaw<String>`select MAX(appointmentId) appointmentId from appointment`;

    return NextResponse.json(appointmentId);
  }

  return NextResponse.json(null);
}
