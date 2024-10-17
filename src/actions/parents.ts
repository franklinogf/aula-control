"use server";

import { Prisma } from "@prisma/client";

import { RoleEnum } from "@/enums";
import { deleteAtDatetime } from "@/lib/utils";
import prisma from "../../prisma/db";
import { getYear } from "./school";
type ParentCreate = Prisma.Args<typeof prisma.parent, "create">["data"];
type ParentSelect = Prisma.Args<typeof prisma.parent, "findFirst">["where"];

export async function getAllParents(where?: ParentSelect) {
  const year = await getYear();
  if (!year) return false;
  try {
    const parents = prisma.parent.findMany({
      where: { year, deleteAt: null, ...where },
      include: { user: true },
    });
    return parents;
  } catch (error) {
    console.log(error);
  }
}
export async function getAllParentsWithTrash(where?: ParentSelect) {
  const year = await getYear();
  if (!year) return false;
  try {
    const parents = prisma.parent.findMany({
      where: { year, ...where },
      include: { user: true },
    });
    return parents;
  } catch (error) {
    console.log(error);
  }
}
type Parent = {
  fatherName?: string | null | undefined;
  fatherEmail?: string | null | undefined;
  fatherLastname?: string | null | undefined;
  fatherPhone?: string | null | undefined;
  motherEmail?: string | null | undefined;
  motherLastname?: string | null | undefined;
  motherName?: string | null | undefined;
  motherPhone?: string | null | undefined;
  username?: string | null | undefined;
  password?: string | null | undefined;
};
// type EditParent =
export async function createParent({
  fatherName,
  fatherEmail,
  fatherLastname,
  fatherPhone,
  motherEmail,
  motherLastname,
  motherName,
  motherPhone,
  username,
  password,
}: Parent) {
  const year = await getYear();
  if (!year) return false;
  try {
    const parent = prisma.parent.create({
      data: {
        fatherName,
        fatherEmail,
        fatherLastname,
        fatherPhone,
        motherEmail,
        motherLastname,
        motherName,
        motherPhone,
        year,
        user: {
          create: {
            username: username!,
            password: password!,
            year,
            roleId: RoleEnum.PARENT,
          },
        },
      },
    });
    return parent;
  } catch (error) {
    console.log(error);
  }
}
export async function editParent({
  parent: {
    fatherName,
    fatherEmail,
    fatherLastname,
    fatherPhone,
    motherEmail,
    motherLastname,
    motherName,
    motherPhone,
    username,
    password,
  },
  id,
}: {
  parent: Parent;
  id: number;
}) {
  try {
    const userData: { username: string; password?: string } = {
      username: username!,
    };
    if (password) {
      userData.password = password;
    }
    const parent = prisma.parent.update({
      where: { id },
      data: {
        fatherName,
        fatherEmail,
        fatherLastname,
        fatherPhone,
        motherEmail,
        motherLastname,
        motherName,
        motherPhone,
        user: {
          update: {
            data: {
              ...userData,
            },
          },
        },
      },
    });
    return parent;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteParent(id: number) {
  try {
    const result = await prisma.parent.update({
      data: { deleteAt: deleteAtDatetime() },
      where: { id },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function forceDeleteParent(id: number) {
  try {
    const result = await prisma.parent.delete({
      where: { id },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function restoreParent(id: number) {
  try {
    const result = await prisma.parent.update({
      data: { deleteAt: null },
      where: { id },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
