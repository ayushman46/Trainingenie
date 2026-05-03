import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";

const router = Router();

router.get("/testimonials", async (_req, res) => {
  const testimonials = await db.select().from(testimonialsTable);
  res.json(
    testimonials.map((t) => ({
      id: t.id,
      clientName: t.clientName,
      clientRole: t.clientRole,
      clientCompany: t.clientCompany,
      quote: t.quote,
      rating: t.rating,
      industry: t.industry,
      avatarUrl: t.avatarUrl,
    }))
  );
});

export default router;
