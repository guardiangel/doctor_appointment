import { Treatment } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";

//api/treatment
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

// api/treatment , create treatment
export async function POST(req: Request) {
  const { appointmentId, patientId, dise, note, treatment } = await req.json();
  const data = {
    appointmentId: appointmentId,
    patientId: patientId,
    dise: dise,
    note: note,
    treatment: treatment,
  };
  try {
    await customPrisma.treatment.create({
      data,
    });
    return NextResponse.json({
      status: "8888",
      message: "Submit treatment successfully.",
    });
  } catch (e: any) {
    return NextResponse.json({ status: "9999", message: e?.meta?.cause });
  }
}
