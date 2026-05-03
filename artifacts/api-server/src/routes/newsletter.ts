import { Router } from "express";
import { db, newsletterTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter", async (req, res) => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const { email, name } = parsed.data;

  const existing = await db.select().from(newsletterTable).where(
    (await import("drizzle-orm")).eq(newsletterTable.email, email)
  );
  if (existing.length > 0) {
    res.status(400).json({ error: "Email already subscribed" });
    return;
  }

  const [sub] = await db
    .insert(newsletterTable)
    .values({ email, name: name ?? null })
    .returning();

  res.status(201).json({
    id: sub.id,
    email: sub.email,
    name: sub.name,
    subscribedAt: sub.subscribedAt.toISOString(),
  });
});

export default router;
