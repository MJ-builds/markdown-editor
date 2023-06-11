// actions.js

"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function listDocuments() {
  const documents = await prisma.document.findMany();
  return documents;
}

export async function saveDocument(title, content) {
  const document = await prisma.document.create({
    data: {
      title: title,
      content: content,
    },
  });
}
