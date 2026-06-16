import { HandHeart, GraduationCap, Briefcase, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";

/** The four headline services — icon tint matches the brand (2 blue, 2 teal). */
const pillars = [
  {
    icon: HandHeart,
    label: "Rehabilitation Services",
    desc: "Therapy & assistive devices",
    tint: "bg-primary",
  },
  {
    icon: GraduationCap,
    label: "Inclusive Education",
    desc: "Classrooms & learning support",
    tint: "bg-primary",
  },
  {
    icon: Briefcase,
    label: "Livelihood Development",
    desc: "Skills, training & enterprise",
    tint: "bg-accent",
  },
  {
    icon: Users,
    label: "Community Empowerment",
    desc: "Rights, advocacy & inclusion",
    tint: "bg-accent",
  },
];

/**
 * "What we offer" cards — pulled up so they overlap the lower edge of the
 * hero photo, bridging the hero into the page below (a common professional
 * landing-page pattern) instead of sitting as a flat, separate band.
 */
export function ServicePillars() {
  return (
    <section
      className="relative z-20 -mt-20 sm:-mt-24 lg:-mt-32"
      aria-label="Our core services"
    >
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {pillars.map(({ icon: Icon, label, desc, tint }) => (
            <StaggerItem key={label} className="h-full">
              <div className="group flex h-full flex-col items-center gap-4 rounded-3xl bg-surface px-5 py-7 text-center shadow-float ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover lg:py-8">
                <span
                  className={`grid size-16 place-items-center rounded-full ${tint} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 lg:size-[4.5rem]`}
                >
                  <Icon className="size-8 lg:size-9" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{label}</h3>
                  <p className="mt-1.5 text-sm text-muted">{desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
