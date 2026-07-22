import { Badge } from "@/components/ui/badge";

export function Stinger() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-[#1A2133] px-8 text-center text-white">
      <Badge variant="outline" className="border-white/20 text-white/70">
        Optional stinger · six months later
      </Badge>
      <p className="max-w-lg text-sm text-white/60">
        WhatsApp text on a founder&apos;s phone:
      </p>
      <p className="max-w-xl font-heading text-2xl font-bold sm:text-3xl">
        &ldquo;I don&apos;t think we need any of them anymore.&rdquo;
      </p>
      <p className="max-w-md text-sm text-white/60">
        Cut to the team outside, branded T-shirts their only possession left: &ldquo;we
        probably shouldn&apos;t have presented that at FlixGames.&rdquo;
      </p>
    </div>
  );
}
