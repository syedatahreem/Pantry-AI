import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/index.js";

const DEV_USER_ID = "00000000-0000-0000-0000-000000000001";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

await prisma.user.upsert({
  where: { id: DEV_USER_ID },
  update: {},
  create: {
    id: DEV_USER_ID,
    email: "reemhub26@gmail.com",
  },
});

console.log("Seeded dev user:", DEV_USER_ID);
await prisma.$disconnect();
