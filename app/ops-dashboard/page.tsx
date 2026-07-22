import type { Metadata } from "next";
import { OpsDashboard } from "@/components/ops-dashboard/OpsDashboard";

export const metadata: Metadata = {
  title: "Pipeline Control — Doctorflix",
  description:
    "Animiertes Fake-Dashboard: parallel laufende Kundenprojekte, live steigender Gesamtumsatz.",
};

export default function OpsDashboardPage() {
  return <OpsDashboard />;
}
