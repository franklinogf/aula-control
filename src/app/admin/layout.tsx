import { auth } from "@/auth";
import { LogOutButton } from "@/components/LogOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
const asideMenu = [
  {
    label: "Home",
    link: "/admin",
  },
  {
    label: "Padres",
    link: "/admin/parents",
  },
  {
    label: "Profesores",
    link: "/admin/teachers",
  },
  {
    label: "Grados",
    link: "/admin/grades",
  },
  {
    label: "Materias",
    link: "/admin/subjects",
  },
];
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session || session.user.roleId !== "admin") {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen">
      <aside className="max-w-[200px] bg-admin text-center">
        <h3 className="my-3 text-4xl font-semibold text-admin-foreground">Admin Panel</h3>
        <div className="mx-4 flex flex-col gap-4">
          {asideMenu.map((item) => (
            <Button key={item.label} variant="outline" className="bg-admin text-admin-foreground">
              <Link href={item.link}>{item.label}</Link>
            </Button>
          ))}
          <LogOutButton />
        </div>
      </aside>
      <div className="grow px-4">{children}</div>
    </div>
  );
}
