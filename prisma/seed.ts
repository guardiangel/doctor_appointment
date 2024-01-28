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

const treatments = [
  {
    userId: "3001",
    dise: "Bone",
    treatment: "Pills",
    note: "Normal",
  },
  {
    userId: "3001",
    dise: "ABC",
    treatment: "Operations",
    note: "Minor Operation",
  },
];

const categories = [
  {
    categoryValue: "1",
    categoryName: "General Physician",
  },
  {
    categoryValue: "2",
    categoryName: "Bone",
  },
  {
    categoryValue: "3",
    categoryName: "Heart",
  },
  {
    categoryValue: "4",
    categoryName: "Dentist",
  },
  {
    categoryValue: "5",
    categoryName: "Neurologist",
  },
  {
    categoryValue: "6",
    categoryName: "Kidney",
  },
  {
    categoryValue: "7",
    categoryName: "Cardiologist",
  },
  {
    categoryValue: "8",
    categoryName: "Plastic Surgeon",
  },
];

const timeslots = [
  {
    timeSlotValue: "9:00 - 9:30",
  },
  {
    timeSlotValue: "9:30 - 10:00",
  },
  {
    timeSlotValue: "10:00 - 10:30",
  },
  {
    timeSlotValue: "10:30 - 11:00",
  },
  {
    timeSlotValue: "11:00 - 11:30",
  },
  {
    timeSlotValue: "11:30 - 12:00",
  },
  {
    timeSlotValue: "1:30 - 2:00",
  },
  {
    timeSlotValue: "2:00 - 2:30",
  },
  {
    timeSlotValue: "2:30 - 3:00",
  },
  {
    timeSlotValue: "3:00 - 3:30",
  },
  {
    timeSlotValue: "3:30 - 4:00",
  },
  {
    timeSlotValue: "4:00 - 4:30",
  },

  {
    timeSlotValue: "6:00 - 6:30",
  },
  {
    timeSlotValue: "6:30 - 7:00",
  },
  {
    timeSlotValue: "7:00 - 7:30",
  },
  {
    timeSlotValue: "7:30 - 8:00",
  },
  {
    timeSlotValue: "8:00 - 8:30",
  },
  {
    timeSlotValue: "8:30 - 9:00",
  },
];

async function main() {
  console.log(`starting seeding...`);
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  for (const treatment of treatments) {
    await prisma.treatment.create({ data: treatment });
  }

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  for (const timeslot of timeslots) {
    await prisma.timeslot.create({ data: timeslot });
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
