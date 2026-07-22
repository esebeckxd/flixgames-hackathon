import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  { n: 1, title: "Themenshop", who: "Pharma", desc: "Freigegebene Themen durchstöbern." },
  { n: 2, title: "Angebot & Checkout", who: "Pharma", desc: "Kostenkonfigurator, PayPal (Demo)." },
  { n: 3, title: "Briefing", who: "Pharma", desc: "Pre-Kick-Off-Formular ausfüllen." },
  { n: 4, title: "Slide Builder", who: "Referent", desc: "Präsentation live bauen, einreichen." },
  { n: 5, title: "Video live", who: "Plattform", desc: "Fertiges Video auf der Plattform." },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <Badge variant="secondary" className="mb-4">
        Doctorflix · FlixGames
      </Badge>
      <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
        End-to-End <span className="text-brand">Automated Sales Pipeline</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Vom Themenshop bis zum fertigen Video — mit minimalem menschlichem Input.
        Diese App ist das UI-Fundament (Next.js + shadcn/ui im Doctorflix-Look) für
        den Hackathon-Prototyp.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="accent" size="lg">Demo starten</Button>
        <Button variant="outline" size="lg">Storyboard ansehen</Button>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s) => (
          <Card key={s.n}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.n}
                </span>
                <Badge variant="outline">{s.who}</Badge>
              </div>
              <CardTitle className="mt-3">{s.title}</CardTitle>
              <CardDescription>{s.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="sm" className="px-0 text-brand hover:bg-transparent">
                Details →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
