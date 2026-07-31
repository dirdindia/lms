export default function AITutor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">AI Tutor</h1>
        <p className="text-muted-foreground mt-2">Monitor AI interactions, token usage, and adjust model settings.</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 text-muted-foreground">
          AI Tutor Chat Logs & Analytics (Dummy)
        </div>
      </div>
    </div>
  );
}
