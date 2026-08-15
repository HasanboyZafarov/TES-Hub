import { cn } from "@/lib/utils";
import { COURSE_PERKS, type CoursePerk } from "@/types/course";
import type Pricing from "@/types/pricing";
import { Download, Infinity as InfinityIcon, MessagesSquare } from "lucide-react";
import { Field, inputClass } from "./composerUI";
import { PERK_LABELS, type CourseDraft } from "./courseDraft";

const PERK_ICONS: Record<CoursePerk, typeof Download> = {
  lifetime_access: InfinityIcon,
  expert_forum: MessagesSquare,
  downloadable_resources: Download,
};

const ENROLLMENT_OPTIONS = [
  { value: "", label: "Unlimited Students" },
  { value: "25", label: "25 Students" },
  { value: "50", label: "50 Students" },
  { value: "100", label: "100 Students" },
  { value: "250", label: "250 Students" },
];

interface Props {
  draft: CourseDraft;
  set: <K extends keyof CourseDraft>(key: K, value: CourseDraft[K]) => void;
  errors: Record<string, string>;
}

const TypeCard = ({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`flex-1 rounded-lg border-2 px-4 py-4 text-center cursor-pointer transition-colors ${
      active
        ? "border-[#267320] bg-[#DCFCE7]"
        : "border-[#C1C8C2] bg-white hover:border-[#012D1D]"
    }`}
  >
    <span
      className={`block font-semibold ${active ? "text-[#12351F]" : "text-[#191C1B]"}`}
    >
      {title}
    </span>
    <span className="block text-xs text-[#414844] mt-1">{subtitle}</span>
  </button>
);

const StepPricing = ({ draft, set, errors }: Props) => {
  const isPaid = draft.priceModel === "one_time";
  const limit = String(draft.enrollmentLimit);
  // A course saved with a custom cap still needs its own option to stay selected.
  const enrollmentOptions = ENROLLMENT_OPTIONS.some((o) => o.value === limit)
    ? ENROLLMENT_OPTIONS
    : [...ENROLLMENT_OPTIONS, { value: limit, label: `${limit} Students` }];

  const togglePerk = (perk: CoursePerk) =>
    set(
      "perks",
      draft.perks.includes(perk)
        ? draft.perks.filter((p) => p !== perk)
        : [...draft.perks, perk],
    );

  return (
    <div className="flex flex-col gap-6">
      <Field label="Course Type">
        <div className="flex gap-4">
          <TypeCard
            active={!isPaid}
            title="Free"
            subtitle="Accessible to all users"
            onClick={() => set("priceModel", "free")}
          />
          <TypeCard
            active={isPaid}
            title="Paid"
            subtitle="Premium content"
            onClick={() => set("priceModel", "one_time")}
          />
        </div>
      </Field>

      {isPaid && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Price" required error={errors.amount}>
            <div className="flex gap-2">
              <select
                aria-label="Currency"
                className={cn(inputClass, "w-28")}
                value={draft.currency}
                onChange={(e) =>
                  set("currency", e.target.value as Pricing["currency"])
                }
              >
                <option value="KGS">KGS</option>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
              </select>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={draft.amount}
                onChange={(e) =>
                  set(
                    "amount",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                placeholder="5000"
              />
            </div>
          </Field>

          <Field
            label="Discount / Early Bird"
            hint="Optional percentage off the listed price."
            error={errors.discountPercent}
          >
            <div className="flex items-center gap-2">
              <span className="text-[#6B7280] text-sm">%</span>
              <input
                type="number"
                min={0}
                max={100}
                className={inputClass}
                value={draft.discountPercent}
                onChange={(e) =>
                  set(
                    "discountPercent",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                placeholder="Optional discount"
              />
            </div>
          </Field>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-[#191C1B]">
        <input
          type="checkbox"
          checked={draft.certificate}
          onChange={(e) => set("certificate", e.target.checked)}
        />
        Offer a certificate of completion
      </label>

      <div>
        <span className="text-[#191C1B] text-sm font-semibold">
          What's Included
        </span>
        <div className="flex flex-col gap-3 mt-3">
          {COURSE_PERKS.map((perk) => {
            const Icon = PERK_ICONS[perk];
            const checked = draft.perks.includes(perk);
            return (
              <label
                key={perk}
                className={`flex items-center gap-3 border rounded-lg px-4 h-12 cursor-pointer transition-colors ${
                  checked
                    ? "border-[#267320] bg-[#F2F9F3]"
                    : "border-[#C1C8C2] bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePerk(perk)}
                />
                <Icon size={16} className="text-[#414844]" />
                <span className="text-sm text-[#191C1B]">
                  {PERK_LABELS[perk]}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <Field label="Enrollment Limit" error={errors.enrollmentLimit}>
        <select
          className={inputClass}
          value={String(draft.enrollmentLimit)}
          onChange={(e) =>
            set(
              "enrollmentLimit",
              e.target.value === "" ? "" : Number(e.target.value),
            )
          }
        >
          {enrollmentOptions.map((o) => (
            <option key={o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
};

export default StepPricing;
