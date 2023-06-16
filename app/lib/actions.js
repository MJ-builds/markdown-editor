"use server";

import prisma from "./prisma";

// Sanitize the title and content before saving to the database (to avoid XSS attacks)
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// List all documents in the database (for the sidebar)
export async function listDocuments(userId) {
  let documents;
  if (userId || userId !== null) {
    documents = await prisma.document.findMany({
      where: {
        userId: userId,
      },
    });
    return documents;
  } else {
    documents = await prisma.document.findMany();
    return documents;
  }
}
// Create a new document in the database (or update an existing one), depending on whether an id is provided
export async function saveOrUpdateDocument(id, title, content, userId) {
  let document;
  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedContent = DOMPurify.sanitize(content);

  // user needs to be logged in to both update or create
  if (!userId) {
    throw new Error("Denied - user is not logged in");
  }

  if (!title || title.trim() === "" || !content || content.trim() === "") {
    throw new Error("Title and/or content cannot be empty");
  }

  if (id) {
    // If an id is provided, find the existing document
    const existingDocument = await prisma.document.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("User does not have permission to update this document");
    }

    // If the user is the owner, update the document
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
    // Create a new document
    document = await prisma.document.create({
      data: {
        title: sanitizedTitle,
        content: sanitizedContent,
        userId: userId,
      },
    });
  }
  // returning doc as we need the id in header for the save logic (had a previous bug re new docs).
  return document;
}

// Delete a document from the database
export async function deleteDocument(id, userId) {
  const document = await prisma.document.findUnique({
    where: {
      id: id,
    },
  });
  if (!document) {
    throw new Error("Document not found");
  }
  if (document.userId !== userId) {
    throw new Error("User does not have permission to delete this document");
  }

  await prisma.document.delete({
    where: {
      id: id,
    },
  });
}
