"use client";
import { createGrade, editGrade } from "@/actions/grades";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { gradeSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
interface GradesFormModalProps {
  mode?: "new" | "edit";
  id?: number;
  grade?: string;
}
export function GradesFormModal({ mode = "new", id, grade = "" }: GradesFormModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof gradeSchema>>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      grade,
    },
  });
  async function onSubmit({ grade, teacher }: z.infer<typeof gradeSchema>) {
    let result;
    if (mode === "new") {
      result = await createGrade({ grade, teacher });
    } else {
      if (!id) return;
      result = await editGrade({ grade, teacher, id });
    }
    if (result) {
      router.refresh();
      form.reset();
      setIsOpen(false);
    } else {
      toast.error("Error al agregar grado");
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{mode === "new" ? "Agregar" : "Editar"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "new" ? "Agregar grado" : "Editar grado"}</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grado</FormLabel>
                    <FormControl>
                      <Input placeholder="Escribe el nombre del grado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profesor encargado</FormLabel>
                    <FormControl>
                      <Input placeholder="Escribe el nombre del profesor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
