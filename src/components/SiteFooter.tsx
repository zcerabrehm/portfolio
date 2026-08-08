import { ArrowUp, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE } from "../data/portfolioData";
import { mailHref, openInNewTab } from "../lib/links";

const MARQUEE = [
  "FULL STACK",
  "SECURE LOGINS",
  "TEAM PROJECTS",
  "CLEAR UI",
  "REMOTE READY",
  "REAL SYSTEMS",
];

const FOOTER_MOTTO = {
  before: "CODE. OPTIMIZE. ",
  ship: "SHIP.",
  sub: "Built for reality.",
};

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const links = [
    { id: "top", label: "Home", href: "#top", shortcut: "00" },
    ...NAV_LINKS,
  ];

  return (
    <footer
      id="footer"
      className="site-footer relative z-10 overflow-hidden border-t border-white/10 bg-[#030303]"
    >
      {/* marquee first — no dead space above */}
      <div className="relative border-b border-white/10 bg-signal text-void">
        <div className="flex overflow-hidden py-1.5">
          <div className="site-footer__marquee flex w-max gap-8 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-label">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="inline-flex items-center gap-8">
                {item}
                <span className="inline-block h-1 w-1 rounded-full bg-void/50" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 top-8" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(204,255,0,0.08),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.3] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-8 flex flex-col items-center gap-6 border-b border-white/10 pb-8 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-signal">
              Thanks for stopping by
            </p>
            <h2 className="font-display text-[clamp(1.5rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tightest sm:text-[clamp(1.75rem,5.5vw,3.75rem)]">
              <span className="display-stack sm:whitespace-nowrap">
                <span className="display-stack__outline" aria-hidden="true">
                  {FOOTER_MOTTO.before}
                  <span className="text-stroke-signal">{FOOTER_MOTTO.ship}</span>
                </span>
                <span className="display-stack__solid">
                  {FOOTER_MOTTO.before}
                  <span className="text-signal">{FOOTER_MOTTO.ship}</span>
                </span>
              </span>
            </h2>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-label text-mute">
              {FOOTER_MOTTO.sub}
            </p>
            <p className="mx-auto mt-3 max-w-md font-mono text-[12px] leading-relaxed text-mute lg:mx-0">
              {SITE.role}. Open for remote work and side projects.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 lg:items-end">
            <a
              href={mailHref(SITE.email, "Project inquiry from alenguiwan.dev")}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hello"
              onClick={(e) => {
                e.preventDefault();
                openInNewTab(
                  mailHref(SITE.email, "Project inquiry from alenguiwan.dev"),
                );
              }}
              className="group inline-flex items-center gap-3 rounded-full border border-signal bg-signal px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-label text-void transition-shadow hover:shadow-signal"
            >
              <Mail size={14} />
              Email me
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-12">
          <div className="border border-white/10 bg-white/[0.02] p-5 md:col-span-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="label">Navigate</p>
              <span className="font-mono text-[10px] text-signal">
                {String(links.length).padStart(2, "0")} links
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  data-cursor="visit"
                  className="group flex items-center justify-between gap-2 border border-white/10 bg-black/40 px-3 py-3 transition-colors hover:border-signal/45 hover:bg-signal/10"
                >
                  <span className="font-mono text-[11px] uppercase tracking-label text-mute transition-colors group-hover:text-chalk">
                    <span className="mr-1.5 text-signal/80">{link.shortcut}</span>
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="text-white/20 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-5 md:col-span-4 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="label">Connect</p>
              <span className="font-mono text-[10px] text-mute">Online</span>
            </div>
            <div className="space-y-2">
              <a
                href={mailHref(SITE.email)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="copy"
                onClick={(e) => {
                  e.preventDefault();
                  openInNewTab(mailHref(SITE.email));
                }}
                className="group flex items-center justify-between border border-white/10 bg-black/40 px-4 py-3.5 transition-colors hover:border-signal/45 hover:bg-signal/10"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-label text-mute">
                    Email
                  </p>
                  <p className="mt-0.5 font-mono text-[12px] text-chalk transition-colors group-hover:text-signal">
                    {SITE.email}
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-signal" />
              </a>
              <a
                href={SITE.discord.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="discord"
                onClick={(e) => {
                  e.preventDefault();
                  openInNewTab(SITE.discord.href);
                }}
                className="group flex items-center justify-between border border-signal/40 bg-signal/10 px-4 py-3.5 transition-colors hover:border-signal hover:bg-signal hover:text-void"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle
                    size={14}
                    className="text-signal transition-colors group-hover:text-void"
                  />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-label text-signal transition-colors group-hover:text-void/70">
                      Discord
                    </p>
                    <p className="mt-0.5 font-mono text-[12px] text-chalk transition-colors group-hover:text-void">
                      {SITE.discord.handle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-signal transition-colors group-hover:text-void"
                />
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden border border-white/10 bg-black/50 p-5 md:col-span-3 md:p-6">
            <p className="label mb-5">Quick facts</p>
            <dl className="space-y-3 font-mono text-[11px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt className="text-mute">Reply</dt>
                <dd className="text-chalk">Within a day</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt className="text-mute">Location</dt>
                <dd className="text-chalk">Philippines</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt className="text-mute">Timezone</dt>
                <dd className="text-chalk">UTC+8</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mute">Focus</dt>
                <dd className="text-chalk">Full stack</dd>
              </div>
            </dl>
            <a
              href="#top"
              data-cursor="home"
              className="mt-6 flex w-full items-center justify-center gap-2 border border-white/15 bg-white/5 py-3 font-mono text-[10px] uppercase tracking-label text-fog transition-colors hover:border-signal/40 hover:bg-signal hover:text-void"
            >
              <ArrowUp size={12} />
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-label text-mute">
            © {year} Jino Alen Guiwan
          </p>
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-signal sm:w-8" />
            <span className="font-mono text-[9px] uppercase tracking-label text-signal">
              zero fluff
            </span>
            <span className="h-px w-6 bg-signal sm:w-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
