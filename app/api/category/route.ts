import { Category } from "@prisma/client";
import { customPrisma } from "../prismaClient";
import { NextResponse } from "next/server";

//api/user
export async function GET(req: Request) {
  const categorys: Category[] | null = await customPrisma.category.findMany();

  return NextResponse.json(categorys);
}
