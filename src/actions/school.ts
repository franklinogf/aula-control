"use server";

import prisma from "../../prisma/db";

export async function getYear() {
  try {
    const result = await prisma.school.findFirst({ select: { year: true } });
    return result?.year;
  } catch (error) {
    return "24-25";
  }
}
