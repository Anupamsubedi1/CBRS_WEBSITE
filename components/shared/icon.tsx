import {
  HeartPulse,
  Briefcase,
  GraduationCap,
  Scale,
  Users,
  Home,
  HandHeart,
  Stethoscope,
  Sprout,
  BookOpen,
  Accessibility,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const REGISTRY: Record<IconName, LucideIcon> = {
  "heart-pulse": HeartPulse,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  scale: Scale,
  users: Users,
  home: Home,
  "hand-heart": HandHeart,
  stethoscope: Stethoscope,
  sprout: Sprout,
  "book-open": BookOpen,
  accessibility: Accessibility,
  handshake: Handshake,
};

export function ThemeIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Cmp = REGISTRY[name] ?? Users;
  return <Cmp className={className} aria-hidden="true" />;
}
