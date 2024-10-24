import { getYear } from "@/actions/school";
import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma/db";
type TeacherRow = Prisma.TeacherCreateManyUserInput & { username: string; password: string };
export async function POST(request: Request) {
  const data: { roleId?: string | null; rows: TeacherRow[] } = await request.json();

  const year = await getYear();
  if (data.roleId === undefined || data.roleId === null) {
    return new Response("Missing roleId", { status: 400 });
  }
  const role = data.roleId;
  data.rows.forEach(async (row) => {
    if (
      !row.username ||
      !row.password ||
      !row.name ||
      !row.email ||
      !row.dob ||
      !row.phone ||
      !row.lastname
    ) {
      return;
    }
    await prisma.teacher.create({
      data: {
        year,
        name: row.name,
        email: row.email,
        dob: new Date(row.dob),
        knownSubjects: JSON.parse(row.knownSubjects as string),
        phone: `+${row.phone}`,
        lastname: row.lastname,
        user: {
          create: {
            username: row.username,
            roleId: role,
            password: row.password,
            year,
          },
        },
      },
    });
  });
  console.log(data);
  return new Response("CSV imported successfully", { status: 200 });
}
