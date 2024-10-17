import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const roles = await prisma.role.createMany({
    data: [
      { type: "admin" },
      { type: "teacher" },
      { type: "parent" },
      { type: "secretary" },
      { type: "student" },
    ],
  });
  const attendaceOptions = await prisma.attendanceOption.createMany({
    data: [
      { name: "p", description: "Presente" },
      { name: "a", description: "Ausente" },
      { name: "t", description: "Tarde" },
      { name: "e", description: "Excusa" },
    ],
  });

  const adminUser = await prisma.user.create({
    data: {
      username: "admin@admin.com",
      password: "12345678",
      year: "24-25",
      roleId: "admin",
    },
  });
  const schoolInfo = await prisma.school.create({
    data: {
      name: "Colegio San Carlos",
      year: "24-25",
    },
  });

  console.log({ roles, attendaceOptions, adminUser, schoolInfo });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
