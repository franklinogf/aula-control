import { getAllGrades } from "@/actions/grades";
import { GradesFormModal } from "@/components/GradesFormModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  const grades = await getAllGrades();
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">Grados</h3>
      <GradesFormModal />
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead>Profesor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades?.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.id}</TableCell>
                <TableCell>{grade.name}</TableCell>
                <TableCell>{grade.teacherId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
