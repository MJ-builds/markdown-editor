"use server";

import prisma from "../lib/prisma";
// import { redirect } from "next/navigation";

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function listDocuments() {
  const documents = await prisma.document.findMany();
  return documents;
}

export async function saveOrUpdateDocument(id, title, content) {
  let document;
  const sanitizedTitle = DOMPurify.sanitize(title)
  const sanitizedContent = DOMPurify.sanitize(content)

  if (!title || title.trim() === '' || !content || content.trim() === '') {
    throw new Error('Title and/or content cannot be empty');
  }

  if (id) {
    // If an id is provided, update the existing document
    document = await prisma.document.update({
      where: {
        id: id,
      },
      data: {
        title: sanitizedTitle,
        content: sanitizedContent,
      },
    });
  } else {
    document = await prisma.document.create({
      data: {
        title: sanitizedTitle,
        content: sanitizedContent,
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
