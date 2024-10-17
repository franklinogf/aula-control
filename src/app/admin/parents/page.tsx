import { getAllParentsWithTrash } from "@/actions/parents";
import { ParentsFormModal } from "@/components/ParentsFormModal";
import ParentsTable from "./_components/ParentsTable";

export default async function Page() {
  const parents = await getAllParentsWithTrash();

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">Padres</h3>
      <ParentsFormModal />
      <div className="mt-4">{parents ? <ParentsTable parents={parents} /> : "No hay cuentas"}</div>
    </div>
  );
}
