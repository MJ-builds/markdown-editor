// actions.js

'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function listDocuments() {
  const documents = await prisma.document.findMany();
  return documents;
}