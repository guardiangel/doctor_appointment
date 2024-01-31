import { Appointment } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";
import { metadata } from "../../layout";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
        where: { doctorId: obj.userId, appointmentDate: obj.appointmentDate },
      });
    return NextResponse.json(appointments);
  } else if (obj.viewBookingFlag) {
    //query booking history
    const appointments: Appointment[] | null =
      await customPrisma.appointment.findMany({
        where: { patientId: obj.userId },
        include: {
          doctor: true,
        },
      });
    console.log("viewBookingFlag appointments", appointments);
    return NextResponse.json(appointments);
  }

  return NextResponse.json(null);
}

export async function POST(req: Request) {
  const {
    appointmentId,
    category,
    doctor,
    appointmentDate,
    timeslot,
    patientId,
  } = await req.json();

  const data = {
    appointmentId: appointmentId,
    doctorId: doctor,
    patientId: patientId,
    categoryId: category,
    timeSlotValue: timeslot,
    appointmentDate: appointmentDate,
  };

  const createAppoinment = await customPrisma.appointment.create({
    data,
  });

  return NextResponse.json(createAppoinment);
}

export async function DELETE(req: Request) {
  const { appointmentId } = await req.json();

  const numAppointmentId = parseInt(appointmentId);

  try {
    const treatment = await customPrisma.treatment.findUnique({
      where: {
        appointmentId: numAppointmentId,
      },
    });

    if (treatment != null) {
      return NextResponse.json({
        status: "9999",
        message: "Have treatment, can't delete",
      });
    }

    await customPrisma.appointment.delete({
      where: {
        appointmentId: numAppointmentId,
      },
    });

    return NextResponse.json({
      status: "8888",
      message: `Successfully delete appointmentId ${appointmentId}`,
    });
  } catch (e: any) {
    return NextResponse.json({ status: "9999", message: e?.meta?.cause });
  }
}
