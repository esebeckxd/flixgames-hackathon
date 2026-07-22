import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDemoState } from "@/lib/demo-state";

const STATS = [
  { label: "Views", value: "10,000,000" },
  { label: "CME Certificates", value: "1,930" },
  { label: "Engagement", value: "+64%" },
];

export function Payoff() {
  const { topic } = useDemoState();
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col justify-center gap-6 px-6">
      <Badge variant="outline" className="self-start">
        Optional · one month later
      </Badge>
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Reporting: {topic.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-muted/30 p-4 text-center">
                <div className="font-heading text-2xl font-bold text-brand">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button className="animate-pulse rounded-md border-2 border-yellow-400 bg-yellow-300 px-4 py-3 text-sm font-black uppercase text-red-700 shadow-[0_0_0_3px_#fff,0_0_0_5px_#ef4444]">
              Shift Whole Business Unit to Doctorflix and Retire Me
            </button>
            <button className="rounded border border-border px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground">
              Maybe Just a Vacation
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Pharma Boss, hands thrown up: &ldquo;That was so easy!&rdquo; — claims the win to
            <em> his</em> boss. Gets &ldquo;promoted to Senior Vice President.&rdquo;
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
