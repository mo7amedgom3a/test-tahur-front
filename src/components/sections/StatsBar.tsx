const stats = [
  { value: "+500", label: "طبيب معتمد" },
  { value: "+100k", label: "استشارة منجزة" },
  { value: "+25", label: "تخصصاً طبياً" },
  { value: "4.9", label: "تقييم متوسط" },
];

export function StatsBar() {
  return (
    <section className="container mx-auto px-4 lg:px-8 -mt-10 relative z-10">
      <div className="bg-background rounded-3xl shadow-glow border border-border/50 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-border/60 overflow-hidden">
        {stats.map((s, i) => (
          <div key={i} className="px-6 py-6 lg:py-7 text-center">
            <div className="font-display text-3xl lg:text-4xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
