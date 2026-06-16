import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FolderKanban,
  Images,
  Newspaper,
  HeartHandshake,
  Users,
  ArrowRight,
} from "lucide-react";
import { getAdminId } from "@/app/actions/auth";
import { getPrograms } from "@/lib/programs";
import { getGalleryItems } from "@/lib/gallery";
import { getNews } from "@/lib/news";
import { getTeam } from "@/lib/team";

export default async function AdminDashboardPage() {
  const adminId = await getAdminId();
  if (!adminId) redirect("/admin/login");

  const [programs, gallery, news, team] = await Promise.all([
    getPrograms(),
    getGalleryItems(),
    getNews(),
    getTeam(),
  ]);

  const teamCount =
    team.board.length + team.advisors.length + team.generalMembers.length;

  const cards = [
    {
      title: "Programs",
      description: "Create, edit and remove programs and the page banner.",
      href: "/admin/programs",
      icon: FolderKanban,
      meta: `${programs.length} program${programs.length === 1 ? "" : "s"}`,
    },
    {
      title: "Gallery",
      description: "Upload photos, set captions and link them to programs.",
      href: "/admin/gallery",
      icon: Images,
      meta: `${gallery.length} photo${gallery.length === 1 ? "" : "s"}`,
    },
    {
      title: "News & Notices",
      description: "Publish news, notices, events and stories.",
      href: "/admin/news",
      icon: Newspaper,
      meta: `${news.length} item${news.length === 1 ? "" : "s"}`,
    },
    {
      title: "Donation",
      description: "Edit the QR code, payment details and page copy.",
      href: "/admin/donation",
      icon: HeartHandshake,
      meta: "QR + copy",
    },
    {
      title: "Our Team",
      description: "Manage board members, advisors and general members.",
      href: "/admin/team",
      icon: Users,
      meta: `${teamCount} member${teamCount === 1 ? "" : "s"}`,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Manage the content shown across the CBRS Nepal website.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ title, description, href, icon: Icon, meta }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {meta}
              </span>
            </div>
            <h2 className="mt-4 font-semibold text-foreground">{title}</h2>
            <p className="mt-1 flex-1 text-sm text-muted">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Manage
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
