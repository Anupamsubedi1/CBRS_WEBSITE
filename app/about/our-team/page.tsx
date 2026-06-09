"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Award, Users2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Media } from "@/components/shared/media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MembersTable } from "@/components/team/members-table";
import { DonateBand } from "@/components/layout/donate-band";
import { boardMembers, advisors, generalMembers } from "@/lib/data/team";

export default function OurTeamPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The People Behind CBRS Nepal"
        description="A dedicated board, experienced advisors and a network of members and volunteers — united by a commitment to inclusion and dignity."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "Our Team" },
        ]}
      />

      {/* Board of Directors */}
      <section className="py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Board of Directors"
              description="Elected representatives who steward CBRS Nepal's mission and governance."
            />
          </Reveal>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {boardMembers.map((m) => (
              <motion.div key={m.id} variants={itemVariants}>
                <article className="group h-full overflow-hidden rounded-3xl border border-primary/10 bg-surface shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-2">
                  <div className="overflow-hidden">
                    <Media
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      seed={m.id}
                      ratio="aspect-[4/3]"
                      className="transition-transform duration-500 group-hover:scale-110"
                      icon={<Users2 className="size-7" aria-hidden="true" />}
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="primary" size="sm" className="transition-all duration-300 group-hover:bg-secondary">
                      {m.position}
                    </Badge>
                    <h3 className="mt-3 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {m.name}
                    </h3>
                    <dl className="mt-3 space-y-2.5 text-sm text-muted">
                      <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-foreground">
                        <MapPin className="size-4 shrink-0 text-accent transition-colors duration-300" aria-hidden="true" />
                        <dt className="sr-only">Ward</dt>
                        <dd>{m.ward}</dd>
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300 group-hover:text-foreground">
                        <Mail className="size-4 shrink-0 text-accent transition-colors duration-300" aria-hidden="true" />
                        <dt className="sr-only">Contact</dt>
                        <dd>
                          <a 
                            href={`mailto:${m.contact}`} 
                            className="transition-all duration-300 hover:text-accent hover:underline"
                          >
                            {m.contact}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Advisors */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Guidance"
              title="Our Advisors"
              description="Experts who lend their knowledge across medicine, education, law and community development."
            />
          </Reveal>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {advisors.map((a) => (
              <motion.div key={a.id} variants={itemVariants}>
                <article className="group flex h-full flex-col items-center rounded-3xl border border-primary/10 bg-surface p-6 text-center shadow-card transition-all duration-500 hover:shadow-2xl hover:border-accent/50 hover:-translate-y-2 hover:bg-accent/5">
                  <div className="transition-all duration-500 group-hover:scale-110">
                    <Media
                      src={a.photo}
                      alt={`Portrait of ${a.name}`}
                      seed={a.id}
                      ratio="aspect-square"
                      rounded="rounded-full"
                      className="size-24 transition-all duration-500"
                      icon={<Award className="size-6" aria-hidden="true" />}
                    />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {a.name}
                  </h3>
                  <p className="text-sm font-medium text-accent transition-colors duration-300 group-hover:text-secondary">
                    {a.position}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                    <Award className="size-3.5" aria-hidden="true" />
                    {a.expertise}
                  </p>
                  <a
                    href={`mailto:${a.contact}`}
                    className="mt-3 text-xs text-muted transition-all duration-300 hover:text-accent hover:underline"
                  >
                    {a.contact}
                  </a>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* General Members */}
      <section className="py-20 lg:py-24">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              eyebrow="Our Network"
              title="General Members & Volunteers"
              description="The wider CBRS family across Pokhara and beyond. Search by name, role or ward."
            />
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-card">
                {/* Table Header Background */}
                <div className="bg-linear-to-r from-primary/5 to-accent/5 px-6 py-4 lg:px-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                      Members Directory
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                      {generalMembers.length} members
                    </span>
                  </div>
                </div>
                
                {/* Table Container with Enhanced Styling */}
                <div className="overflow-x-auto">
                  <MembersTable members={generalMembers} />
                </div>
              </div>
            </Reveal>
          </motion.div>
        </Container>
      </section>

      <DonateBand />
    </>
  );
}