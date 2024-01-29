import { Timeslot } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";

//api/timeslot
export async function GET(req: Request) {
  let timeslots = [];
  timeslots = await customPrisma.timeslot.findMany({
    orderBy: [
      {
        timeSlotOrder: "asc",
      },
    ],
  });
  return NextResponse.json(timeslots);
}
