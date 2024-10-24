import { getAllTeachersWithTrash } from "@/actions/teachers";
import { TeachersFormModal } from "@/components/TeachersFormModal";

import ImportCsv from "@/components/ImportCsv";
import TeachersTable from "./_components/TeachersTable";

export default async function Page() {
  const teachers = await getAllTeachersWithTrash();
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">Profesores</h3>
      <div className="flex justify-between">
        <TeachersFormModal />
        <ImportCsv />
      </div>
      <div className="mt-4">
        {teachers ? <TeachersTable teachers={teachers} /> : "No hay cuentas"}
      </div>
    </div>
  );
}
