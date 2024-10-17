"use client";
import { createParent, editParent } from "@/actions/parents";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { parentCreateSchema, parentEditSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CustomFormField, FormFieldType } from "./CustomFormField";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
type ParentWithUser = Prisma.ParentGetPayload<{ include: { user: true } }>;
interface ParentsFormModalProps {
  mode?: "new" | "edit";
  id?: number;
  parentToEdit?: ParentWithUser;
}
export function ParentsFormModal({
  mode = "new",
  parentToEdit: itemToEdit,
}: ParentsFormModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isFatherRequired, setIsFatherRequired] = useState<CheckedState>(
    itemToEdit && !itemToEdit.fatherName ? false : true,
  );
  const [isMotherRequired, setIsMotherRequired] = useState<CheckedState>(
    itemToEdit && !itemToEdit.motherName ? false : true,
  );
  const form = useForm<z.infer<typeof parentEditSchema | typeof parentCreateSchema>>({
    resolver: zodResolver(itemToEdit ? parentEditSchema : parentCreateSchema),
    defaultValues: {
      fatherName: itemToEdit ? itemToEdit.fatherName : "",
      fatherLastname: itemToEdit ? itemToEdit.fatherLastname : "",
      fatherEmail: itemToEdit ? itemToEdit.fatherEmail : "",
      fatherPhone: itemToEdit ? itemToEdit.fatherPhone : "",
      motherName: itemToEdit ? (itemToEdit.motherName ? itemToEdit.motherName : "") : "",
      motherLastname: itemToEdit
        ? itemToEdit.motherLastname
          ? itemToEdit.motherLastname
          : ""
        : "",
      motherEmail: itemToEdit ? (itemToEdit.motherEmail ? itemToEdit.motherEmail : "") : "",
      motherPhone: itemToEdit
        ? itemToEdit.motherPhone
          ? itemToEdit.motherPhone
          : itemToEdit
            ? itemToEdit.motherPhone
            : ""
        : "",
      username: itemToEdit ? itemToEdit.user.username : "",
      password: "",
    },
  });
  useEffect(() => {
    if (!isFatherRequired && !itemToEdit) {
      form.reset({ fatherName: "", fatherEmail: "", fatherLastname: "", fatherPhone: "" });
      form.clearErrors(["fatherName", "fatherEmail", "fatherLastname", "fatherPhone"]);
    }
  }, [isFatherRequired, itemToEdit, form]);
  useEffect(() => {
    if (!isMotherRequired && !itemToEdit) {
      form.reset({ motherName: "", motherEmail: "", motherLastname: "", motherPhone: "" });
      form.clearErrors(["motherName", "motherEmail", "motherLastname", "motherPhone"]);
    }
  }, [isMotherRequired, itemToEdit, form]);
  async function onSubmit(parent: z.infer<typeof parentEditSchema>) {
    console.log({ parent });
    let result;
    if (mode === "new") {
      const {
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
      } = parent;
      result = await createParent({
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
      });
    } else {
      if (!itemToEdit) return;
      result = await editParent({ parent, id: itemToEdit.id });
    }
    if (result) {
      toast.success(mode === "new" ? "Cuenta agregada!" : "Cuenta editada!");
      router.refresh();
      form.reset();
      setIsOpen(false);
    } else {
      toast.error("Error al agregar materia");
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={mode === "new" ? "default" : "sm"}>
          {mode === "new" ? "Agregar" : "Editar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === "new" ? "Agregar padre" : "Editar padre"}</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset className="space-y-2">
                <legend className="flex items-center gap-2 border-b-2 border-b-primary">
                  <Checkbox
                    id="father"
                    checked={isFatherRequired}
                    onCheckedChange={(value) => {
                      setIsFatherRequired(value);
                    }}
                  />
                  <Label className="text-lg font-semibold" htmlFor="father">
                    Padre
                  </Label>
                </legend>
                <div className="flex gap-2">
                  <CustomFormField
                    disabled={!isFatherRequired}
                    control={form.control}
                    name="fatherName"
                    label="Nombre"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    disabled={!isFatherRequired}
                    control={form.control}
                    name="fatherLastname"
                    label="Apellido"
                    fieldType={FormFieldType.INPUT}
                  />
                </div>
                <div className="flex gap-2">
                  <CustomFormField
                    disabled={!isFatherRequired}
                    control={form.control}
                    name="fatherEmail"
                    label="Correo electronico"
                    type="email"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    disabled={!isFatherRequired}
                    control={form.control}
                    name="fatherPhone"
                    label="Número de celular"
                    fieldType={FormFieldType.PHONE_INPUT}
                  />
                </div>
              </fieldset>
              <fieldset className="space-y-2">
                <legend className="flex items-center gap-2 border-b-2 border-b-primary">
                  <Checkbox
                    id="mother"
                    checked={isMotherRequired}
                    onCheckedChange={(value) => {
                      setIsMotherRequired(value);
                    }}
                  />
                  <Label className="text-lg font-semibold" htmlFor="mother">
                    Madre
                  </Label>
                </legend>
                <div className="flex gap-2">
                  <CustomFormField
                    disabled={!isMotherRequired}
                    control={form.control}
                    name="motherName"
                    label="Nombre"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    disabled={!isMotherRequired}
                    control={form.control}
                    name="motherLastname"
                    label="Apellido"
                    fieldType={FormFieldType.INPUT}
                  />
                </div>
                <div className="flex gap-2">
                  <CustomFormField
                    disabled={!isMotherRequired}
                    control={form.control}
                    name="motherEmail"
                    label="Correo electronico"
                    type="email"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    disabled={!isMotherRequired}
                    control={form.control}
                    name="motherPhone"
                    label="Número de celular"
                    fieldType={FormFieldType.PHONE_INPUT}
                  />
                </div>
              </fieldset>

              <div>
                <h5 className="text-lg font-semibold">Usuario y contraseña</h5>
                <div className="flex gap-2">
                  <CustomFormField
                    label="Usuario"
                    control={form.control}
                    name="username"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    label="Contraseña"
                    control={form.control}
                    name="password"
                    type="password"
                    fieldType={FormFieldType.INPUT}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {mode === "new" ? "Agregar" : "Editar"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
