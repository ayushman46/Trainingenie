import { Router } from "express";

const router = Router();

router.get("/stats", (_req, res) => {
  res.json({
    clientsTrained: 500,
    coursesDelivered: 1200,
    satisfactionRate: 98.2,
    yearsOfExperience: 12,
    citiesCovered: 25,
    expertTrainers: 80,
  });
});

export default router;
