"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoleEnum } from "@/enums";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
export default function ImportCsv() {
  const router = useRouter();
  const [data, setData] = useState<unknown>([]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  };
  const handleSubmit = async () => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/api/csv/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roleId: RoleEnum.TEACHER, rows: data }),
      });

      if (!response.ok) {
        throw new Error("Failed to import CSV");
      }

      // Handle successful import
      console.log("CSV imported successfully");
      toast.success("CSV importado exitosamente");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="grid w-full max-w-xs items-center gap-1.5">
      <Label htmlFor="file">Importar desde archivo csv</Label>
      <Input onChange={handleFileChange} id="file" type="file" />
      <Button onClick={handleSubmit}>Importar</Button>
    </div>
  );
}
