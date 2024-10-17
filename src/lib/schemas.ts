import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo invalido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe de tener 8 caracteres como minimo"),
});

export const gradeSchema = z.object({
  grade: z.string().min(1, "El grado es requerido.").min(2, "Minimo 2 caracteres."),
  teacher: z.coerce.number().optional(),
});

export const subjectSchema = z.object({
  subject: z.string().min(1, "El nombre de la materia es requerido."),
});
const emailSchema = z
  .union([z.literal(""), z.string().email()])
  .transform((e) => (e === "" ? null : e));
export const parentEditSchema = z
  .object({
    fatherName: z.string().trim().optional().nullable(),
    fatherLastname: z
      .string({ required_error: "El apellido del padre es requerido." })
      .trim()
      .optional()
      .nullable()
      .transform((e) => (e === "" ? null : e)),
    fatherEmail: emailSchema,
    fatherPhone: z
      .string()
      .optional()
      .nullable()
      .transform((e) => (e === "" ? null : e)),
    motherName: z
      .string({ required_error: "El nombre de la madre es requerido." })
      .optional()
      .transform((e) => (e === "" ? null : e)),
    motherLastname: z
      .string({ required_error: "El apellido de la madre es requerido." })
      .optional()
      .nullable()
      .transform((e) => (e === "" ? null : e)),
    motherEmail: emailSchema,
    motherPhone: z
      .string()
      .optional()
      .nullable()
      .transform((e) => (e === "" ? null : e)),
    username: z
      .string({ required_error: "Usuario es requerido" })
      .min(4, "El usuario debe de tener 4 caracteres como minimo")
      .transform((e) => (e === "" ? null : e)),
    password: z
      .string({ required_error: "La contraseña es requerida" })
      .min(8, "La contraseña debe de tener 8 caracteres como minimo")
      .optional()
      .or(z.literal(""))
      .transform((e) => (e === "" ? null : e)),
  })
  .superRefine((values, ctx) => {
    if (!values.fatherName && !values.motherName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Se requiere un padre o una madre",
        path: ["fatherName"],
      });
    }
    if (values.fatherName && !values.fatherLastname) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Requerido",
        path: ["fatherLastname"],
      });
    }
    if (values.fatherName && !values.fatherEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Requerido",
        path: ["fatherEmail"],
      });
    }
    if (values.fatherName && !values.fatherPhone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Requerido",
        path: ["fatherPhone"],
      });
    }
    if (values.motherName && !values.motherLastname) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Requerido",
        path: ["motherLastname"],
      });
    }
    if (values.motherName && !values.motherEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Requerido",
        path: ["motherEmail"],
      });
    }
    if (values.motherName && !values.motherPhone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Requerido",
        path: ["motherPhone"],
      });
    }
  });

export const parentCreateSchema = z.intersection(
  parentEditSchema,
  z.object({
    password: z
      .string({ required_error: "La contraseña es requerida" })
      .min(8, "La contraseña debe de tener 8 caracteres como minimo")
      .transform((e) => (e === "" ? null : e)),
  }),
);
