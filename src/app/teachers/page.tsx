import { auth } from "@/auth";
import { Stat } from "@/components/Stat";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <h2 className="my-10 text-3xl font-bold">Bienvenido {session?.user.username}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat background="bg-sky-500" title="ID" value={session?.user.id ?? 0} />
        <Stat background="bg-rose-500" title="Encargado del grado" value={session?.user.id ?? 0} />
      </div>
      {/* <div className="mt-10">
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
      </div> */}
    </div>
  );
}
