import type { Metadata } from "next";
import { MoneyBoyFeed } from "@/components/money-boy/MoneyBoyFeed";

export const metadata: Metadata = {
  title: "#general — Money Boy",
  description: "Slack-Klon-Animation: Money Boy spammt #general im Dauerloop.",
};

export default function MoneyBoyPage() {
  return <MoneyBoyFeed />;
}
