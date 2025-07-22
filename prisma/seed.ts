import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.test2.create({ data: u });
  }
}

main();
