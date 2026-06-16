import { Home, Search } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-brand-hero text-white">
      <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-7xl font-extrabold text-white/90 sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-white/80">
          Sorry, the page you&rsquo;re looking for doesn&rsquo;t exist or has
          been moved. Let&rsquo;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="white">
            <Home /> Back to Home
          </Button>
          <Button href="/contact" variant="outline-white">
            <Search /> Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
