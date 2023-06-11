"use server";

import prisma from "../lib/prisma";
// import { redirect } from "next/navigation";

export async function listDocuments() {
  const documents = await prisma.document.findMany();
  return documents;
}

export async function saveOrUpdateDocument(id, title, content) {
  let document;

  if (id) {
    // If an id is provided, update the existing document
    document = await prisma.document.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
    });
  } else {
    document = await prisma.document.create({
      data: {
        title: title,
        content: content,
      },
    });
  }
}

export async function deleteDocument(id) {

  await prisma.document.delete({
    where: {
      id: id,
    },
  });
}
