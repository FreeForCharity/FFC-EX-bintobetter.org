export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-4xl font-semibold text-emerald sm:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-sm text-ink/70">{label}</div>
    </div>
  );
}
