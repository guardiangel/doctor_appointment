import { Feedback } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const feedbacks: Feedback[] | null = await customPrisma.feedback.findMany();
  return NextResponse.json(feedbacks);
}

// api/feedback , create feedback
export async function POST(req: Request) {
  const { feedBackUserId, content } = await req.json();
  const data = {
    feedBackUserId: feedBackUserId,
    content: content,
  };
  try {
    await customPrisma.feedback.create({
      data,
    });
  } catch (e: any) {
    return NextResponse.json({ status: "9999", message: e?.meta?.cause });
  }

  return NextResponse.json({
    status: "8888",
    message: "Submit feedback successfully.",
  });
}
