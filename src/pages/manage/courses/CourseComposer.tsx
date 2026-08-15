import Button from "@/components/ui/button";
import useAuth from "@/lib/hooks/useAuth";
import usePermissions from "@/lib/hooks/usePermissions";
import { createCourse, updateCourse } from "@/lib/service/coursesApi";
import useCourse from "@/lib/service/useCourse";
import { slugify } from "@/lib/utils/session";
import CATEGORIES from "@/types/category";
import type Course from "@/types/course";
import { COURSE_LEVELS } from "@/types/course";
import type { EntityStatus } from "@/types/status";
import axios from "axios";
import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { Card, Stepper, type StepDef } from "./composerUI";
import StepBasics from "./StepBasics";
import StepCurriculum from "./StepCurriculum";
import StepPricing from "./StepPricing";
import StepReview, { type ChecklistItem } from "./StepReview";
import {
  buildCoursePayload,
  draftFromCourse,
  EMPTY_DRAFT,
  formatDuration,
  totalLessons,
  totalMinutes,
  type CourseDraft,
} from "./courseDraft";

const STEPS: StepDef[] = [
  { key: "basics", label: "Basics" },
  { key: "curriculum", label: "Curriculum" },
  { key: "pricing", label: "Pricing" },
  { key: "review", label: "Review" },
];

const STEP_HEADINGS = [
  {
    title: "Create New Course",
    subtitle:
      "Fill in the fundamental details to structure your agricultural knowledge module.",
  },
  {
    title: "Course Composer",
    subtitle:
      "Structure your agricultural training program by organizing modules and lessons.",
  },
  {
    title: "Set Course Pricing",
    subtitle: "Decide how learners get access to this course.",
  },
  {
    title: "Review Course",
    subtitle: "Final check before submitting your course for expert review.",
  },
];

const BasicsSchema = z.object({
  title: z.string().trim().min(1, "Course title is required."),
  shortDescription: z
    .string()
    .trim()
    .min(1, "A short description is required."),
  category: z.enum(CATEGORIES, { error: "Please select a category." }),
  level: z.enum(COURSE_LEVELS, { error: "Please select a difficulty level." }),
});

const PricingSchema = z
  .object({
    priceModel: z.enum(["free", "one_time"]),
    amount: z.union([z.number(), z.literal("")]),
    discountPercent: z.union([z.number(), z.literal("")]),
  })
  .refine((v) => v.priceModel === "free" || Number(v.amount) > 0, {
    message: "Paid courses need a price above zero.",
    path: ["amount"],
  })
  .refine(
    (v) =>
      v.discountPercent === "" ||
      (Number(v.discountPercent) >= 0 && Number(v.discountPercent) <= 100),
    {
      message: "Discount must be between 0 and 100.",
      path: ["discountPercent"],
    },
  );

function issuesToErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    fieldErrors[issue.path[0] as string] = issue.message;
  });
  return fieldErrors;
}

function validateCurriculum(draft: CourseDraft): Record<string, string> {
  if (!draft.sections.length) {
    return { sections: "Add at least one module before continuing." };
  }
  if (draft.sections.some((s) => !s.title.trim())) {
    return { sections: "Every module needs a title." };
  }
  if (draft.sections.some((s) => !s.lessons.length)) {
    return { sections: "Every module needs at least one lesson." };
  }
  if (
    draft.sections.some((s) => s.lessons.some((l) => !l.title.trim()))
  ) {
    return { sections: "Every lesson needs a title." };
  }
  return {};
}

function validateStep(step: number, draft: CourseDraft): Record<string, string> {
  if (step === 0) {
    const parsed = BasicsSchema.safeParse(draft);
    return parsed.success ? {} : issuesToErrors(parsed.error);
  }
  if (step === 1) return validateCurriculum(draft);
  if (step === 2) {
    const parsed = PricingSchema.safeParse(draft);
    return parsed.success ? {} : issuesToErrors(parsed.error);
  }
  return {};
}

const Composer = ({ course }: { course: Course | null }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [draft, setDraft] = useState<CourseDraft>(
    course ? draftFromCourse(course) : EMPTY_DRAFT,
  );
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [step, setStep] = useState(0);
  // An existing course has already cleared every step, so all tabs stay open.
  const [furthest, setFurthest] = useState(course ? STEPS.length - 1 : 0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  /** Set once the course exists on the server, so later steps patch it. */
  const [savedSlug, setSavedSlug] = useState<string | null>(
    course?.slug ?? null,
  );

  function set<K extends keyof CourseDraft>(key: K, value: CourseDraft[K]) {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      // Keep the slug in sync with the title until the course is first saved.
      if (key === "title" && !savedSlug) next.slug = slugify(String(value));
      return next;
    });
  }

  async function persist(status: EntityStatus) {
    const payload = buildCoursePayload(
      {
        ...draft,
        coverImage: coverFile
          ? URL.createObjectURL(coverFile)
          : draft.coverImage,
      },
      status,
      auth?.id ?? "user-tes-admin-1",
    );

    const saved = savedSlug
      ? await updateCourse(savedSlug, payload)
      : await createCourse(payload);

    setSavedSlug(saved.slug);
    setDraft((d) => ({
      ...d,
      slug: saved.slug,
      coverImage: saved.coverImage ?? d.coverImage,
    }));
    setCoverFile(null);
    return saved;
  }

  async function saveAndContinue() {
    const stepErrors = validateStep(step, draft);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) {
      setBanner("Please fix the highlighted fields before continuing.");
      return;
    }

    setBanner(null);
    setSaving(true);
    try {
      await persist(course?.status ?? "draft");
      const next = Math.min(step + 1, STEPS.length - 1);
      setStep(next);
      setFurthest((f) => Math.max(f, next));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setBanner(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ?? err.message)
          : "Could not save the course.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function finish(status: EntityStatus) {
    setSaving(true);
    setBanner(null);
    try {
      await persist(status);
      navigate("/manage/courses");
    } catch (err) {
      setBanner(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ?? err.message)
          : "Could not save the course.",
      );
    } finally {
      setSaving(false);
    }
  }

  function goToStep(next: number) {
    if (next > step) {
      const stepErrors = validateStep(step, draft);
      setErrors(stepErrors);
      if (Object.keys(stepErrors).length) return;
    }
    setBanner(null);
    setStep(next);
  }

  const checklist: ChecklistItem[] = useMemo(() => {
    const lessons = totalLessons(draft.sections);
    const basicsDone = !Object.keys(validateStep(0, draft)).length;
    const curriculumDone = !Object.keys(validateCurriculum(draft)).length;
    const pricingDone = !Object.keys(validateStep(2, draft)).length;

    return [
      {
        label: "Basic Info Completed",
        detail: "Title, description, category, and level",
        done: basicsDone,
      },
      {
        label: "Curriculum Structured",
        detail: `${draft.sections.length} module${
          draft.sections.length === 1 ? "" : "s"
        }, ${lessons} lesson${lessons === 1 ? "" : "s"}, ${formatDuration(
          totalMinutes(draft.sections),
        )}`,
        done: curriculumDone,
      },
      {
        label: "Pricing Configured",
        detail:
          draft.priceModel === "free"
            ? "Free for all learners"
            : `${draft.currency} ${draft.amount || 0}`,
        done: pricingDone,
      },
      {
        label: "Expert Review",
        detail: "Pending submission",
        done: false,
      },
    ];
  }, [draft]);

  const heading = STEP_HEADINGS[step];
  const isReview = step === STEPS.length - 1;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-5 pb-16 max-w-4xl">
      <button
        type="button"
        onClick={() => navigate("/manage/courses")}
        className="flex items-center gap-1 text-sm text-[#414844] hover:text-[#012D1D] cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Courses
      </button>

      <h1 className="text-[#012D1D] text-4xl lg:text-5xl font-bold mt-4">
        {step === 0 && course ? "Edit Course" : heading.title}
      </h1>
      <p className="text-[#414844] text-sm mt-2">{heading.subtitle}</p>

      <Stepper
        steps={STEPS}
        current={step}
        furthest={furthest}
        onSelect={goToStep}
      />

      {banner && (
        <div className="flex gap-3 border-l-4 p-4 border-[#BA1A1A] bg-[#FFDAD6] rounded-lg mt-6">
          <TriangleAlert color="#93000A" size={20} />
          <p className="text-sm text-[#93000A]">{banner}</p>
        </div>
      )}

      <div className="mt-8">
        {step === 0 && (
          <Card>
            <StepBasics
              draft={draft}
              set={set}
              errors={errors}
              coverFile={coverFile}
              setCoverFile={setCoverFile}
            />
          </Card>
        )}

        {step === 1 && (
          <StepCurriculum
            sections={draft.sections}
            onChange={(sections) => set("sections", sections)}
            error={errors.sections}
          />
        )}

        {step === 2 && (
          <Card>
            <StepPricing draft={draft} set={set} errors={errors} />
          </Card>
        )}

        {isReview && (
          <StepReview
            draft={draft}
            checklist={checklist}
            saving={saving}
            onSubmit={() => finish("pending_review")}
            onSaveDraft={() => finish("draft")}
            onEditCurriculum={() => setStep(1)}
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          className="rounded-md! px-5! py-2!"
          disabled={step === 0 || saving}
          onClick={() => goToStep(step - 1)}
        >
          Back
        </Button>

        {!isReview && (
          <Button
            className="rounded-md! px-5! py-2! gap-2"
            disabled={saving}
            onClick={saveAndContinue}
          >
            {saving ? "Saving…" : "Save & Continue"}
            <ArrowRight size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

const CourseComposer = () => {
  const { slug } = useParams();
  const isNew = slug === "new";
  const { can } = usePermissions();
  const { course, isLoading, error } = useCourse(isNew ? "" : (slug ?? ""));

  if (!can("createCourse") && !can("moderateContent")) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <h1 className="text-[#012D1D] text-3xl font-bold">
          You cannot create courses
        </h1>
        <p className="text-[#414844] mt-2">
          Ask a TES administrator for expert access to publish courses.
        </p>
      </div>
    );
  }

  if (!isNew && isLoading) {
    return (
      <div className="container mx-auto px-10 py-20 text-[#414844]">
        Loading course…
      </div>
    );
  }

  if (!isNew && (error || !course)) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <h1 className="text-[#012D1D] text-3xl font-bold">Course not found</h1>
        <p className="text-[#414844] mt-2">{error ?? `No course "${slug}".`}</p>
      </div>
    );
  }

  return <Composer key={slug} course={isNew ? null : course} />;
};

export default CourseComposer;
