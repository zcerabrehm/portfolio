import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  FolderGit2,
  Link2,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import { SITE } from "../data/portfolioData";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../lib/motion";
import LivingBackground from "./LivingBackground";
import { openInNewTab } from "../lib/links";
import { playUiTick } from "../lib/uiSound";

interface Props {
  toast?: string | null;
  onCopyEmail?: (email: string) => void;
}

type Status = "idle" | "sending" | "sent" | "error";

export default function FooterTerminal({ toast }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError("Please fill in name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setStatus("sending");
    playUiTick("tap");

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            _subject: `Portfolio message from ${trimmedName}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!res.ok) throw new Error("send failed");

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      playUiTick("copy");
    } catch {
      setStatus("error");
      setError("Could not send right now. Try again or email me directly.");
    }
  };

  const fieldClass =
    "w-full rounded-sm border border-white/10 bg-black/50 px-3 py-3 font-mono text-[13px] text-chalk outline-none transition-colors placeholder:text-mute/50 focus:border-signal/50";

  return (
    <section
      id="contact"
      className="snap-section relative isolate flex flex-col justify-center border-t border-white/10"
    >
      <LivingBackground variant="void" />

      <div className="section-frame z-[2]" aria-hidden="true">
        <span className="section-frame__corner tl" />
        <span className="section-frame__corner tr" />
        <span className="section-frame__corner bl" />
        <span className="section-frame__corner br" />
      </div>
      <motion.span
        className="giant-index bottom-8 right-0 z-[1] opacity-20"
        aria-hidden="true"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 0.2, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        05
      </motion.span>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="text-center lg:col-span-5 lg:text-left">
            <motion.p
              variants={staggerItem}
              className="section-kicker justify-center lg:justify-start"
            >
              <span className="signal-dot" />
              05 · Contact
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="mb-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tightest"
            >
              <span className="display-stack">
                <span className="display-stack__outline" aria-hidden="true">
                  Get in touch
                </span>
                <span className="display-stack__solid">Get in touch</span>
              </span>
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="mx-auto max-w-md text-pretty font-mono text-[12px] leading-relaxed text-mute sm:text-[13px] lg:mx-0"
            >
              Send a short note with your name, email, and what you need help
              with. I usually reply within a&nbsp;day. Full-time hours are
              5pm–2am&nbsp;PH — Discord, GitHub, and LinkedIn are&nbsp;open too.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2 lg:mx-0"
            >
              <a
                href={SITE.discord.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="discord"
                onClick={(e) => {
                  e.preventDefault();
                  openInNewTab(SITE.discord.href);
                }}
                className="group flex w-full items-center justify-between gap-4 border border-signal/50 bg-signal/15 px-4 py-4 shadow-signal transition-colors hover:border-signal hover:bg-signal hover:text-void"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-signal/40 bg-black/30 text-signal transition-colors group-hover:border-void/20 group-hover:bg-void/10 group-hover:text-void">
                    <MessageCircle size={18} />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-label text-signal transition-colors group-hover:text-void/70">
                      Quick chat
                    </span>
                    <span className="mt-0.5 block font-display text-lg font-bold tracking-tight text-chalk transition-colors group-hover:text-void">
                      Discord · {SITE.discord.handle}
                    </span>
                  </span>
                </span>
                <ExternalLink
                  size={16}
                  className="shrink-0 text-signal transition-colors group-hover:text-void"
                />
              </a>

              <a
                href={SITE.github.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="github"
                onClick={(e) => {
                  e.preventDefault();
                  openInNewTab(SITE.github.href);
                }}
                className="group flex w-full items-center justify-between gap-4 border border-white/10 bg-black/40 px-4 py-3.5 transition-colors hover:border-signal/45 hover:bg-signal/10"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center border border-white/10 text-signal">
                    <FolderGit2 size={16} />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-label text-mute">
                      Code
                    </span>
                    <span className="mt-0.5 block font-mono text-[13px] text-chalk transition-colors group-hover:text-signal">
                      GitHub · {SITE.github.handle}
                    </span>
                  </span>
                </span>
                <ExternalLink
                  size={14}
                  className="shrink-0 text-mute transition-colors group-hover:text-signal"
                />
              </a>

              {SITE.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="linkedin"
                  onClick={(e) => {
                    e.preventDefault();
                    openInNewTab(social.href);
                  }}
                  className="group flex w-full items-center justify-between gap-4 border border-white/10 bg-black/40 px-4 py-3.5 transition-colors hover:border-signal/45 hover:bg-signal/10"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center border border-white/10 text-signal">
                      <Link2 size={16} />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-label text-mute">
                        Profile
                      </span>
                      <span className="mt-0.5 block font-mono text-[13px] text-chalk transition-colors group-hover:text-signal">
                        {social.label} · {social.handle}
                      </span>
                    </span>
                  </span>
                  <ExternalLink
                    size={14}
                    className="shrink-0 text-mute transition-colors group-hover:text-signal"
                  />
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-label text-mute">
                <span className="signal-dot" />
                {SITE.availability}
              </span>
              <span className="inline-flex items-center border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-label text-mute">
                Hours · 5pm–2am PH
              </span>
              <span className="inline-flex items-center border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-label text-mute">
                {SITE.location}
              </span>
            </motion.div>
          </div>

          <motion.form
            variants={staggerItem}
            onSubmit={handleSubmit}
            className="border border-white/10 bg-black/40 p-5 backdrop-blur-md sm:p-6 lg:col-span-7"
            noValidate
          >
            {status === "sent" ? (
              <div className="flex min-h-[280px] flex-col items-start justify-center gap-3">
                <p className="font-display text-2xl font-bold tracking-tight text-chalk">
                  Message sent
                </p>
                <p className="max-w-sm font-mono text-[12px] leading-relaxed text-mute">
                  Thanks. I will get back to you at the email you left.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 font-mono text-[11px] uppercase tracking-label text-signal transition-opacity hover:opacity-80"
                >
                  Send another
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-label text-mute">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={fieldClass}
                      disabled={status === "sending"}
                      required
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-label text-mute">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className={fieldClass}
                      disabled={status === "sending"}
                      required
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-label text-mute">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What are you building?"
                    className={`${fieldClass} min-h-[120px] resize-y`}
                    disabled={status === "sending"}
                    required
                  />
                </label>

                {error ? (
                  <p className="font-mono text-[11px] text-red-400" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="font-mono text-[10px] text-mute">
                    Goes to {SITE.email}
                  </p>
                  <button
                    type="submit"
                    data-cursor="engage"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-full border border-signal bg-signal px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-label text-void transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send message
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.form>
        </motion.div>
      </div>

      {toast ? (
        <div
          role="status"
          className="pointer-events-none fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-signal/40 bg-black/90 px-4 py-2 font-mono text-[11px] uppercase tracking-label text-signal shadow-signal backdrop-blur-md"
        >
          {toast}
        </div>
      ) : null}
    </section>
  );
}
