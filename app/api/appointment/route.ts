import { Appointment } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";

//api/appointment
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const obj = Object.fromEntries(searchParams.entries());

  if (obj.getMaxFlag) {
    const appointmentId: Number[] = await customPrisma.$queryRaw<
      Number[]
    >`select MAX(appointmentId) appointmentId from appointment`;

    return NextResponse.json(appointmentId);
  } else if (obj.getConfirmedAppointment) {
    const appointments: Appointment[] | null =
      await customPrisma.appointment.findMany({
        where: { userId: obj.userId, appointmentDate: obj.appointmentDate },
      });
    return NextResponse.json(appointments);
  }

  return NextResponse.json(null);
}
