import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const roles = await prisma.role.createMany({
    data: [
    {type: 'admin'},
    {type: 'teacher'},
    {type: 'parent'},
    {type: 'secretary'},
    {type: 'student'}
  ]
})
  const attendaceOptions = await prisma.attendanceOption.createMany({
    data: [
      {name: 'p',description:'Presente'},
      {name: 'a',description:'Ausente'},
      {name: 't',description:'Tarde'},
      {name: 'e',description:'Excusa'},
    ]
  })
  
  console.log({ roles, attendaceOptions})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })