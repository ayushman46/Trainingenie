import { Router } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const { name, email, company, phone, service, message } = parsed.data;

  const [contact] = await db
    .insert(contactsTable)
    .values({ name, email, company: company ?? null, phone: phone ?? null, service: service ?? null, message })
    .returning();

  res.status(201).json({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    company: contact.company,
    phone: contact.phone,
    service: contact.service,
    message: contact.message,
    createdAt: contact.createdAt.toISOString(),
  });
});

router.get("/contact", async (_req, res) => {
  const contacts = await db.select().from(contactsTable).orderBy(contactsTable.createdAt);
  res.json(
    contacts.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      company: c.company,
      phone: c.phone,
      service: c.service,
      message: c.message,
      createdAt: c.createdAt.toISOString(),
    }))
  );
});

export default router;
