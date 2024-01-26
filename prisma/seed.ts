import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> =
  new PrismaClient();

const users = [
  {
    userId: "1001",
    password: "123456",
    userName: "admin",
    address: "unit 111, 18 Joe road, Toronto",
    phone: "1111111111",
    email: "admin@gmail.com",
    type: "1",
  },
  {
    userId: "2001",
    password: "123456",
    userName: "doctor1",
    address: "unit 333, 24 Uptown Drive, Toronto",
    phone: "9999999999",
    email: "doctor1@gmail.com",
    type: "2",
  },
  {
    userId: "3001",
    password: "123456",
    userName: "user1",
    address: "unit 987, 175 Glendora Ave, Toronto",
    phone: "3333333333",
    email: "user1@gmail.com",
    type: "3",
  },
];

async function main() {
  console.log(`starting seeding...`);
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  console.log(`finish seeding`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
