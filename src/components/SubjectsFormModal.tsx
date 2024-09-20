"use client";
import { createSubject, editSubject } from "@/actions/subjects";
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
import { subjectSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subject } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CustomFormField, FormFieldType } from "./CustomFormField";
interface SubjectFormModalProps {
  mode?: "new" | "edit";
  id?: number;
  subjectToEdit?: Subject;
}
export function SubjectFormModal({
  mode = "new",
  id,
  subjectToEdit: itemToEdit,
}: SubjectFormModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      subject: itemToEdit ? itemToEdit.name : "",
    },
  });
  async function onSubmit({ subject }: z.infer<typeof subjectSchema>) {
    let result;
    if (mode === "new") {
      result = await createSubject({ subject });
    } else {
      if (!itemToEdit) return;
      result = await editSubject({ subject, id: itemToEdit.id });
    }
    if (result) {
      toast.success(mode === "new" ? "Materia agregada!" : "Materia editada!");
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "new" ? "Agregar materia" : "Editar materia"}</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <CustomFormField
                control={form.control}
                name="subject"
                fieldType={FormFieldType.INPUT}
              />
              <div className="flex justify-center">
                <Button type="submit">{mode === "new" ? "Agregar" : "Editar"}</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
