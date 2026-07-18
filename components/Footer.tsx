import { navLinks, services, site, stats } from "@/lib/content";
import { Check } from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {site.description}
            </p>

            {/* Social proof — quiet, factual, above the credentials. */}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {stats.slice(0, 2).map((stat) => (
                <li
                  key={stat.label}
                  className="inline-flex items-center gap-1.5 text-sm text-ink-muted"
                >
                  <Check className="h-3.5 w-3.5 text-ink" />
                  <span className="font-medium text-ink">{stat.value}</span>
                  {stat.label.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-eyebrow font-medium uppercase text-ink-muted">
              Company
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline text-sm text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#consultation" className="link-underline text-sm text-ink">
                  Book a consultation
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-eyebrow font-medium uppercase text-ink-muted">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="link-underline text-sm text-ink">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* The details a serious client checks before engaging a firm. */}
          <div>
            <h3 className="text-eyebrow font-medium uppercase text-ink-muted">
              Office
            </h3>
            <address className="mt-4 flex flex-col gap-3 text-sm not-italic text-ink-muted">
              <span>{site.address}</span>
              <a
                href={`mailto:${site.email}`}
                className="link-underline w-fit text-ink"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="link-underline w-fit text-ink"
              >
                {site.phone}
              </a>
              <span>{site.hours}</span>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm text-ink-muted lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{site.firmRegNo}</span>
            <span aria-hidden className="hidden h-3 w-px bg-line lg:block" />
            <span>GSTIN {site.gstin}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
