export function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 text-center">
      <div className="px-6 text-sm font-medium text-muted-foreground">
        [ Video: {label} ]
      </div>
    </div>
  );
}
