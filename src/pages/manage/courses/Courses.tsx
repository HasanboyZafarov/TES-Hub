import Button from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/confirmDialog";
import { MODERATION_STYLES } from "@/components/ui/sessionBadges";
import useCourses from "@/lib/hooks/useCourses";
import { usePermissions } from "@/lib/hooks/usePermissions";
import { useUser } from "@/lib/hooks/useUser";
import { deleteCourse, setCourseStatus } from "@/lib/service/coursesApi";
import CATEGORIES, { type Category } from "@/types/category";
import type Course from "@/types/course";
import status, { type EntityStatus } from "@/types/status";
import {
  Archive,
  BookOpen,
  Check,
  CirclePlus,
  Clock,
  Eye,
  GraduationCap,
  ListFilter,
  Pencil,
  Search,
  Send,
  Star,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration, LEVEL_LABELS, totalLessons } from "./courseDraft";

const PAGE_SIZE = 8;

/* -------------------------------- stat cards ------------------------------- */

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  hintIcon: typeof Users;
  hintClass?: string;
  icon: typeof Users;
  iconClass: string;
}

const StatCard = ({
  label,
  value,
  hint,
  hintIcon: HintIcon,
  hintClass = "text-[#15803D]",
  icon: Icon,
  iconClass,
}: StatCardProps) => (
  <div className="flex-1 border border-[#C1C8C2] rounded-xl bg-white p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase">
          {label}
        </p>
        <h2 className="text-[#012D1D] text-4xl font-bold mt-2">{value}</h2>
      </div>
      <div className={`p-3 rounded-xl ${iconClass}`}>
        <Icon size={22} />
      </div>
    </div>
    <p className={`flex items-center gap-1.5 text-xs mt-4 ${hintClass}`}>
      <HintIcon size={14} />
      {hint}
    </p>
  </div>
);

const StatCards = ({ courses }: { courses: Course[] }) => {
  // Read the clock once, outside render, so the stats stay a pure derivation.
  const [thirtyDaysAgo] = useState(() => Date.now() - 30 * 24 * 60 * 60 * 1000);

  const stats = useMemo(() => {
    const createdRecently = courses.filter(
      (c) => new Date(c.createdAt).getTime() >= thirtyDaysAgo,
    ).length;

    const enrollments = courses.reduce((sum, c) => sum + c.enrollmentCount, 0);
    const rated = courses.filter((c) => c.reviewCount > 0);
    const rating = rated.length
      ? rated.reduce((sum, c) => sum + c.rating, 0) / rated.length
      : 0;

    const awaiting = courses.filter((c) => c.status === "pending_review");

    return {
      total: courses.length,
      createdRecently,
      enrollments,
      rating,
      awaiting,
    };
  }, [courses, thirtyDaysAgo]);

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      <StatCard
        label="Total Courses"
        value={String(stats.total)}
        hint={`+${stats.createdRecently} from last month`}
        hintIcon={TrendingUp}
        icon={BookOpen}
        iconClass="bg-[#DCFCE7] text-[#15803D]"
      />
      <StatCard
        label="Total Enrollments"
        value={stats.enrollments.toLocaleString()}
        hint={
          stats.rating
            ? `${stats.rating.toFixed(1)} average rating`
            : "No ratings yet"
        }
        hintIcon={Star}
        hintClass="text-[#414844]"
        icon={GraduationCap}
        iconClass="bg-[#DCFCE7] text-[#15803D]"
      />
      <StatCard
        label="Awaiting Review"
        value={String(stats.awaiting.length)}
        hint={
          stats.awaiting.length
            ? `Next: ${stats.awaiting[0].title}`
            : "Nothing in the review queue"
        }
        hintIcon={Clock}
        hintClass="text-[#B45309]"
        icon={Clock}
        iconClass="bg-[#FEF3C7] text-[#B45309]"
      />
    </div>
  );
};

/* --------------------------------- filters -------------------------------- */

interface FiltersProps {
  search: string;
  onSearch: (v: string) => void;
  statusFilter: EntityStatus | "all";
  onStatus: (v: EntityStatus | "all") => void;
  categoryFilter: Category | "all";
  onCategory: (v: Category | "all") => void;
}

const AdvancedFilters = ({
  search,
  onSearch,
  statusFilter,
  onStatus,
  categoryFilter,
  onCategory,
}: FiltersProps) => {
  function formatStatus(s: string) {
    return s.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3 px-6 pb-5 border-b border-[#E5E7EB]">
      <div className="border border-[#C1C8C2] px-4 h-11 bg-white text-[#191C1B] rounded-md flex items-center gap-2 flex-1">
        <Search size={18} className="text-[#6B7280]" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          type="text"
          className="outline-none w-full text-sm"
          placeholder="Search courses"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatus(e.target.value as EntityStatus | "all")}
        className="px-4 h-11 outline-none border border-[#C1C8C2] bg-white text-[#191C1B] rounded-md text-sm"
      >
        <option value="all">All Status</option>
        {status.map((s) => (
          <option key={s} value={s}>
            {formatStatus(s)}
          </option>
        ))}
      </select>
      <select
        value={categoryFilter}
        onChange={(e) => onCategory(e.target.value as Category | "all")}
        className="px-4 h-11 outline-none border border-[#C1C8C2] bg-white text-[#191C1B] rounded-md text-sm"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

/* --------------------------------- workflow -------------------------------- */

interface ActionDef {
  icon: typeof Send;
  label: string;
  next: EntityStatus;
  className: string;
}

const WORKFLOW: Partial<Record<EntityStatus, ActionDef[]>> = {
  draft: [
    {
      icon: Send,
      label: "Submit for review",
      next: "pending_review",
      className: "text-[#2563EB] hover:bg-[#EFF6FF]",
    },
  ],
  pending_review: [
    {
      icon: Check,
      label: "Approve & publish",
      next: "published",
      className: "text-[#15803D] hover:bg-[#DCFCE7]",
    },
    {
      icon: X,
      label: "Reject",
      next: "rejected",
      className: "text-[#DC2626] hover:bg-[#FEE2E2]",
    },
  ],
  rejected: [
    {
      icon: Send,
      label: "Resubmit for review",
      next: "pending_review",
      className: "text-[#2563EB] hover:bg-[#EFF6FF]",
    },
  ],
  published: [
    {
      icon: Archive,
      label: "Archive",
      next: "archived",
      className: "text-[#B45309] hover:bg-[#FEF3C7]",
    },
  ],
  archived: [
    {
      icon: Send,
      label: "Restore to review",
      next: "pending_review",
      className: "text-[#2563EB] hover:bg-[#EFF6FF]",
    },
  ],
};

const IconButton = ({
  icon: Icon,
  label,
  className,
  onClick,
}: {
  icon: typeof Send;
  label: string;
  className: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    onClick={onClick}
    className={`p-2 rounded-md transition-colors cursor-pointer ${className}`}
  >
    <Icon size={18} />
  </button>
);

/* ---------------------------------- rows ---------------------------------- */

const AuthorCell = ({ authorId }: { authorId: string }) => {
  const { user } = useUser(authorId);

  return (
    <div className="flex items-center gap-2">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.displayName}
          className="h-8 w-8 rounded-full object-cover bg-[#E6E9E7]"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-[#E6E9E7] flex items-center justify-center text-[10px] font-bold text-[#012D1D]">
          {user?.displayName?.[0] ?? "?"}
        </div>
      )}
      <span className="text-[#191C1B] font-medium text-sm">
        {user?.displayName ?? "—"}
      </span>
    </div>
  );
};

const StatusBadge = ({ status }: { status: EntityStatus }) => {
  const style = MODERATION_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
};

interface RowProps {
  course: Course;
  canModerate: boolean;
  onStatus: (course: Course, next: EntityStatus) => void;
  onDelete: (course: Course) => void;
}

const TableRow = ({ course, canModerate, onStatus, onDelete }: RowProps) => {
  const navigate = useNavigate();
  const lessons = totalLessons(course.sections);
  const moderation = canModerate ? (WORKFLOW[course.status] ?? []) : [];

  return (
    <tr className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB]">
      <td className="px-6 py-5 align-top max-w-xs">
        <span
          onClick={() => navigate(`/manage/courses/${course.slug}`)}
          className="block text-[#191C1B] text-base font-semibold hover:underline cursor-pointer"
        >
          {course.title}
        </span>
        <span className="text-[#414844] text-xs mt-1 block">
          {course.category} • {LEVEL_LABELS[course.level]}
        </span>
      </td>
      <td className="px-6 py-5 align-top whitespace-nowrap">
        <AuthorCell authorId={course.authorId} />
      </td>
      <td className="px-6 py-5 align-top text-[#191C1B] text-sm whitespace-nowrap">
        {course.sections.length} module{course.sections.length === 1 ? "" : "s"}
        <span className="block text-[#414844] text-xs mt-0.5">
          {lessons} lesson{lessons === 1 ? "" : "s"} •{" "}
          {formatDuration(Math.round(course.estimatedDurationHours * 60))}
        </span>
      </td>
      <td className="px-6 py-5 align-top">
        <StatusBadge status={course.status} />
      </td>
      <td className="px-6 py-5 align-top text-[#191C1B] text-sm whitespace-nowrap">
        {course.enrollmentCount.toLocaleString()}
        <span className="block text-[#414844] text-xs mt-0.5">
          {course.pricing.model === "free"
            ? "Free"
            : `${course.pricing.currency} ${course.pricing.amount ?? 0}`}
        </span>
      </td>
      <td className="px-6 py-5 align-top">
        <div className="flex items-center gap-1">
          <IconButton
            icon={Pencil}
            label="Edit course"
            className="text-[#414844] hover:bg-[#F2F4F2]"
            onClick={() => navigate(`/manage/courses/${course.slug}`)}
          />
          <IconButton
            icon={Eye}
            label="View public page"
            className="text-[#414844] hover:bg-[#F2F4F2]"
            onClick={() => navigate(`/academy/courses/${course.slug}`)}
          />
          {moderation.map((a) => (
            <IconButton
              key={a.next}
              icon={a.icon}
              label={a.label}
              className={a.className}
              onClick={() => onStatus(course, a.next)}
            />
          ))}
          <IconButton
            icon={Trash2}
            label="Delete course"
            className="text-[#DC2626] hover:bg-[#FEE2E2]"
            onClick={() => onDelete(course)}
          />
        </div>
      </td>
    </tr>
  );
};

/* ------------------------------- pagination ------------------------------- */

interface PaginationProps {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}

const Pagination = ({ page, totalPages, onPage }: PaginationProps) => {
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i <= 3 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-md border border-[#E5E7EB] text-sm text-[#414844] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB]"
      >
        Prev
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="px-2 text-[#9CA3AF]">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={`h-9 w-9 rounded-md text-sm ${
              p === page
                ? "bg-[#012D1D] text-white"
                : "border border-[#E5E7EB] text-[#414844] hover:bg-[#F9FAFB]"
            }`}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-md border border-[#E5E7EB] text-sm text-[#414844] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB]"
      >
        Next
      </button>
    </div>
  );
};

/* ---------------------------------- page ---------------------------------- */

const ManageCourses = () => {
  const { courses, isLoading, error } = useCourses();
  const { can } = usePermissions();
  const canModerate = can("moderateContent");
  const canCreate = can("createCourse");
  const navigate = useNavigate();

  // Optimistic edits layered over the fetched list, so nothing has to be
  // copied into state on load.
  const [patches, setPatches] = useState<Record<string, Partial<Course>>>({});
  const [removed, setRemoved] = useState<string[]>([]);

  const items = useMemo(
    () =>
      (courses ?? [])
        .filter((c) => !removed.includes(c.id))
        .map((c) => (patches[c.id] ? { ...c, ...patches[c.id] } : c)),
    [courses, patches, removed],
  );

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<EntityStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<Course | null>(null);

  function patchItem(id: string, patch: Partial<Course>) {
    setPatches((p) => ({ ...p, [id]: { ...p[id], ...patch } }));
  }

  async function handleStatus(course: Course, next: EntityStatus) {
    const prev = course.status;
    patchItem(course.id, { status: next });
    try {
      await setCourseStatus(course.slug, next);
    } catch {
      patchItem(course.id, { status: prev });
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    const course = pendingDelete;
    setPendingDelete(null);
    setRemoved((list) => [...list, course.id]);
    try {
      await deleteCourse(course.slug);
    } catch {
      setRemoved((list) => list.filter((id) => id !== course.id));
    }
  }

  const filtered = useMemo(() => {
    return items.filter((c) => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || c.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [items, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  function resetPage<T>(fn: (v: T) => void) {
    return (v: T) => {
      fn(v);
      setPage(1);
    };
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <nav className="text-sm text-[#6B7280]">
            Content Management <span className="mx-1">/</span>
            <span className="text-[#012D1D] font-semibold">Courses</span>
          </nav>
          <h1 className="text-[#012D1D] text-4xl lg:text-5xl font-bold mt-2">
            Course Management
          </h1>
        </div>
        {canCreate && (
          <Button
            className="rounded-md! h-12 gap-2"
            onClick={() => navigate("/manage/courses/new")}
          >
            <CirclePlus size={20} />
            Create New Course
          </Button>
        )}
      </header>

      <StatCards courses={items} />

      <div className="mt-8 border border-[#C1C8C2] rounded-xl overflow-hidden bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
          <h3 className="text-[#012D1D] text-lg font-semibold">All Courses</h3>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 text-sm text-[#414844] hover:text-[#012D1D] cursor-pointer"
          >
            <ListFilter size={16} />
            Advanced Filters
          </button>
        </div>

        {showFilters && (
          <AdvancedFilters
            search={search}
            onSearch={resetPage(setSearch)}
            statusFilter={statusFilter}
            onStatus={resetPage(setStatusFilter)}
            categoryFilter={categoryFilter}
            onCategory={resetPage(setCategoryFilter)}
          />
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
              <tr className="text-left text-xs font-semibold tracking-wider text-[#6B7280]">
                <th className="px-6 py-4">Course &amp; Category</th>
                <th className="px-6 py-4">Expert / Author</th>
                <th className="px-6 py-4">Curriculum</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Enrollments</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((c) => (
                <TableRow
                  key={c.id}
                  course={c}
                  canModerate={canModerate}
                  onStatus={handleStatus}
                  onDelete={setPendingDelete}
                />
              ))}
              {!pageItems.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-[#6B7280] text-sm"
                  >
                    {isLoading
                      ? "Loading courses…"
                      : error
                        ? `Could not load courses: ${error}`
                        : "No courses match these filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#E5E7EB] bg-white">
          <p className="text-sm text-[#414844]">
            {filtered.length === 0
              ? "No entries"
              : `Showing ${start + 1}-${Math.min(
                  start + PAGE_SIZE,
                  filtered.length,
                )} of ${filtered.length} courses`}
          </p>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPage={setPage}
          />
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete course"
        message={`"${pendingDelete?.title}" will be removed permanently, along with its curriculum. This cannot be undone.`}
        confirmLabel="Delete course"
        cancelLabel="Keep it"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default ManageCourses;
