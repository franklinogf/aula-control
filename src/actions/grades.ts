"use server";

import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";
type GradeSelect = Prisma.Args<typeof prisma.grade, "findFirst">["where"];
export async function createGrade(grade: string, teacher?: number | null) {
  try {
    const result = await prisma.grade.create({ data: { name: grade, teacherId: teacher } });
    return result;
  } catch (error) {
    return false;
  }
}
export async function getAllGrades(where?: GradeSelect) {
  try {
    const result = await prisma.grade.findMany({ where });
    return result;
  } catch (error) {
    console.log(error);
  }
}
