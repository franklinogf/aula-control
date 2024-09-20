import { getAllSubjectsWithTrash } from "@/actions/subjects";
import { SubjectFormModal } from "@/components/SubjectsFormModal";
import SubjectTable from "./_components/SubjectTable";

export default async function Page() {
  const subjects = await getAllSubjectsWithTrash();

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">Materias</h3>
      <SubjectFormModal />
      <div className="mt-4">
        {subjects ? <SubjectTable subjects={subjects} /> : "No hay materias"}
      </div>
    </div>
  );
}
