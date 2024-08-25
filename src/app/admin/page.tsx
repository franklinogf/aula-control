import { getAllUsers } from "@/actions/users";
import { Stat } from "@/components/Stat";
import { Button } from "@/components/ui/button";
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
  const users = await getAllUsers();
  const teacherUsers = await getAllUsers({ roleId: RoleEnum.TEACHER });
  const parentUsers = await getAllUsers({ roleId: RoleEnum.PARENT });

  return (
    <div className="flex min-h-screen">
      <aside className="max-w-[200px] bg-admin text-center">
        <h3 className="my-3 text-4xl font-semibold text-admin-foreground">Admin Panel</h3>
        <div className="mx-4 flex flex-col gap-4">
          <Button variant="outline" className="bg-admin text-admin-foreground">
            Home
          </Button>
          <Button variant="outline" className="bg-admin text-admin-foreground">
            Padres
          </Button>
          <Button variant="outline" className="bg-admin text-admin-foreground">
            Profesores
          </Button>
          <Button variant="outline" className="bg-admin text-admin-foreground">
            Grados
          </Button>
          <Button variant="destructive" className="hover:bg-red-600">
            Cerrar sesion
          </Button>
        </div>
      </aside>
      <div className="grow px-4">
        <h2 className="my-10 text-3xl font-bold">Bienvenido.</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            background="bg-sky-500"
            title="Cantidad de padres"
            value={parentUsers?.length ?? 0}
          />
          <Stat
            background="bg-lime-700"
            title="Cantidad de profesores"
            value={teacherUsers?.length ?? 0}
          />
          <Stat background="bg-amber-800" title="Cantidad de usuarios" value={users?.length ?? 0} />
          <Stat background="bg-purple-500" title="Cantidad de grados" value={0} />
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
    </div>
  );
}
