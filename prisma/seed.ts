import { RoleEnum } from "@/enums";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const status = await prisma.status.createMany({
    data: [
      { description: "Activo", status: "A" },
      { description: "Inactivo", status: "I" },
    ],
  });
  const genders = await prisma.gender.createMany({
    data: [
      { description: "Masculino", statusId: 1 },
      { description: "Femenino", statusId: 1 },
    ],
  });
  const roles = await prisma.role.createMany({
    data: Object.values(RoleEnum).map((role) => ({ type: role })),
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
      username: "admin",
      password: "12345678",
      roleId: RoleEnum.ADMIN,
    },
  });
  const schoolInfo = await prisma.school.create({
    data: {
      name: "Colegio Aula Control",
      year: "24-25",
    },
  });

  console.log({ roles, attendaceOptions, adminUser, schoolInfo, status, genders });
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
