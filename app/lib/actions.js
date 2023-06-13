"use server";

import prisma from "./prisma";

// Sanitize the title and content before saving to the database (to avoid XSS attacks)
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// List all documents in the database (for the sidebar)
export async function listDocuments() {
  const documents = await prisma.document.findMany();
  return documents;
}
// Create a new document in the database (or update an existing one), depending on whether an id is provided
export async function saveOrUpdateDocument(id, title, content) {
  let document;
  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedContent = DOMPurify.sanitize(content);

  if (!title || title.trim() === "" || !content || content.trim() === "") {
    throw new Error("Title and/or content cannot be empty");
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
  // returning doc as we need the id in header for the save logic (had a previous bug re new docs).
  return document;
}

// Delete a document from the database
export async function deleteDocument(id) {
  await prisma.document.delete({
    where: {
      id: id,
    },
  });
}
