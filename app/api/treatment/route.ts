import { Treatment } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";

//api/user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const obj = Object.fromEntries(searchParams.entries());
  const { userId } = obj;
  const treatments: Treatment[] | null = await customPrisma.treatment.findMany({
    where: {
      patientId: userId,
    },
  });

  return NextResponse.json(treatments);
}
