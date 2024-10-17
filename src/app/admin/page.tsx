import { getAllGrades } from "@/actions/grades";
import { getAllUsers } from "@/actions/users";
import { auth } from "@/auth";
import { Stat } from "@/components/Stat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoleEnum } from "@/enums";

export default async function page() {
  const session = await auth();

  const [users, teacherUsers, parentUsers, grades] = await Promise.all([
    await getAllUsers(),
    await getAllUsers({ roleId: RoleEnum.TEACHER }),
    await getAllUsers({ roleId: RoleEnum.PARENT }),
    await getAllGrades(),
  ]);

  return (
    <div>
      <h2 className="my-10 text-3xl font-bold">Bienvenido {session?.user.username}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat background="bg-sky-500" title="Cantidad de padres" value={parentUsers?.length ?? 0} />
        <Stat
          background="bg-lime-700"
          title="Cantidad de profesores"
          value={teacherUsers?.length ?? 0}
        />
        <Stat background="bg-amber-800" title="Cantidad de usuarios" value={users?.length ?? 0} />
        <Stat background="bg-purple-500" title="Cantidad de grados" value={grades?.length ?? 0} />
      </div>
      <div className="mt-10">
        <h3 className="mb-4 text-2xl font-semibold">Ultimos Usuarios Agregados</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Rol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.roleId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
