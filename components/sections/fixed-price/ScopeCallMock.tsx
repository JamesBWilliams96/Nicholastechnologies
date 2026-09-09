import { CheckIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------
   Notes from the scope call — the step before a quote. Sits behind
   and beside the proposal for depth. Decorative.
   ------------------------------------------------------------------ */

const notes = ["Goals and audience", "Pages and content", "Bookings and enquiries", "Launch timing"];

export function ScopeCallMock() {
  return (
    <div className="@container">
      <div className="p-[7cqw]">
        <div className="flex items-baseline justify-between gap-[3cqw]">
          <span className="text-[max(0.8125rem,5.4cqw)] font-semibold leading-none tracking-[-0.02em]">
            Scope call
          </span>
          <span className="font-mono text-[max(0.5625rem,3.6cqw)] text-ink-500">Notes</span>
        </div>

        <ul className="mt-[5.5cqw] space-y-[3.4cqw]">
          {notes.map((note) => (
            <li key={note} className="flex items-center gap-[3.2cqw] text-[max(0.6875rem,4.3cqw)] leading-none">
              <span className="flex size-[max(0.875rem,5.6cqw)] shrink-0 items-center justify-center rounded-[1.5cqw] bg-ink-950 text-white">
                <CheckIcon className="size-[64%]" strokeWidth={2.25} />
              </span>
              <span className="font-medium text-ink-800">{note}</span>
            </li>
          ))}
        </ul>

        <div className="mt-[5.5cqw] flex items-center gap-[2.4cqw] border-t border-ink-950/8 pt-[4.5cqw] font-mono text-[max(0.5625rem,3.5cqw)] leading-none text-ink-500">
          <span className="size-[max(0.375rem,2cqw)] rounded-full bg-accent-500" />
          Next · Fixed quote
        </div>
      </div>
    </div>
  );
}
