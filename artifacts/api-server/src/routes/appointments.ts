import { Router } from "express";
import { db, appointmentsTable, insertAppointmentSchema } from "@workspace/db";
import { eq, desc, sql, gte } from "drizzle-orm";

const router = Router();

router.get("/appointments", async (req, res) => {
  const appointments = await db
    .select()
    .from(appointmentsTable)
    .orderBy(desc(appointmentsTable.createdAt));
  res.json(appointments.map(apptToJson));
});

router.post("/appointments", async (req, res) => {
  const parsed = insertAppointmentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed: " + parsed.error.message });
    return;
  }

  const [created] = await db
    .insert(appointmentsTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(apptToJson(created));
});

router.get("/appointments/stats/summary", async (req, res) => {
  const rows = await db
    .select({
      status: appointmentsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(appointmentsTable)
    .groupBy(appointmentsTable.status);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [recentRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(appointmentsTable)
    .where(gte(appointmentsTable.createdAt, sevenDaysAgo));

  const stats = {
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    recentCount: recentRow?.count ?? 0,
  };

  for (const row of rows) {
    stats.total += row.count;
    const key = row.status as keyof typeof stats;
    if (key in stats) {
      (stats as any)[key] = row.count;
    }
  }

  res.json(stats);
});

router.get("/appointments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [appt] = await db
    .select()
    .from(appointmentsTable)
    .where(eq(appointmentsTable.id, id));

  if (!appt) {
    res.status(404).json({ error: "Appointment not found" });
    return;
  }

  res.json(apptToJson(appt));
});

function apptToJson(appt: typeof appointmentsTable.$inferSelect) {
  return {
    id: appt.id,
    name: appt.name,
    phone: appt.phone,
    email: appt.email,
    query: appt.query,
    serviceType: appt.serviceType,
    status: appt.status,
    createdAt: appt.createdAt.toISOString(),
  };
}

export default router;
