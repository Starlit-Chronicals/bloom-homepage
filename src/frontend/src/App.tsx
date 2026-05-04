import { useCallback, useEffect, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type FilterTab = "school" | "strict" | "all";

interface AppLink {
  name: string;
  url: string;
  favicon: string;
}

interface Section {
  id: string;
  title: string;
  links: AppLink[];
  tabs: FilterTab[];
}

// ── Data ─────────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: "microsoft",
    title: "Microsoft",
    tabs: ["school", "all"],
    links: [
      {
        name: "Word",
        url: "https://www.office.com/launch/word",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=office.com",
      },
      {
        name: "OneNote",
        url: "https://www.onenote.com",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=onenote.com",
      },
      {
        name: "Teams",
        url: "https://teams.microsoft.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=teams.microsoft.com",
      },
      {
        name: "Outlook",
        url: "https://outlook.office.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=outlook.office.com",
      },
      {
        name: "Excel",
        url: "https://www.office.com/launch/excel",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=office.com",
      },
      {
        name: "PowerPoint",
        url: "https://www.office.com/launch/powerpoint",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=office.com",
      },
      {
        name: "OneDrive",
        url: "https://onedrive.live.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=onedrive.live.com",
      },
    ],
  },
  {
    id: "google",
    title: "Google",
    tabs: ["school", "all"],
    links: [
      {
        name: "Gmail",
        url: "https://mail.google.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=mail.google.com",
      },
      {
        name: "Drive",
        url: "https://drive.google.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=drive.google.com",
      },
      {
        name: "Classroom",
        url: "https://classroom.google.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=classroom.google.com",
      },
      {
        name: "Calendar",
        url: "https://calendar.google.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=calendar.google.com",
      },
      {
        name: "Docs",
        url: "https://docs.google.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=docs.google.com",
      },
    ],
  },
  {
    id: "study",
    title: "Study",
    tabs: ["school", "strict", "all"],
    links: [
      {
        name: "Quizlet",
        url: "https://quizlet.com",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=quizlet.com",
      },
      {
        name: "Desmos",
        url: "https://www.desmos.com",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=desmos.com",
      },
      {
        name: "Wikipedia",
        url: "https://www.wikipedia.org",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org",
      },
      {
        name: "ChatGPT",
        url: "https://chatgpt.com",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com",
      },
    ],
  },
  {
    id: "social",
    title: "Social",
    tabs: ["all"],
    links: [
      {
        name: "YouTube",
        url: "https://www.youtube.com",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com",
      },
      {
        name: "✨ Starlight",
        url: "https://www.youtube.com/@starlight-Chronicals_Lewis",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com",
      },
      {
        name: "Discord",
        url: "https://discord.gg/YjnRjBYAeM",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=discord.com",
      },
      {
        name: "Spotify",
        url: "https://www.spotify.com",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=spotify.com",
      },
      {
        name: "Pinterest",
        url: "https://www.pinterest.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=pinterest.com",
      },
    ],
  },
  {
    id: "games",
    title: "Games",
    tabs: ["all"],
    links: [
      {
        name: "Roblox",
        url: "https://www.roblox.com",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=roblox.com",
      },
      {
        name: "Polytoria",
        url: "https://polytoria.com/home",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=polytoria.com",
      },
      {
        name: "Steam",
        url: "https://store.steampowered.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=store.steampowered.com",
      },
      {
        name: "Minecraft",
        url: "https://www.minecraft.net",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=minecraft.net",
      },
      {
        name: "itch.io",
        url: "https://itch.io",
        favicon: "https://www.google.com/s2/favicons?sz=64&domain=itch.io",
      },
      {
        name: "Epic Games",
        url: "https://www.epicgames.com",
        favicon:
          "https://www.google.com/s2/favicons?sz=64&domain=epicgames.com",
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDateTime(d: Date): string {
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────
function AppCard({ link, index }: { link: AppLink; index: number }) {
  const delayClass = `animate-delay-${Math.min(((index % 5) + 1) * 100, 500)}`;
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid={`app-card.item.${index + 1}`}
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border card-hover cursor-pointer animate-fade-in-up ${delayClass} group`}
      title={link.name}
    >
      <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-muted">
        <img
          src={link.favicon}
          alt={link.name}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span style="font-size:18px;">${link.name[0]}</span>`;
            }
          }}
        />
      </div>
      <span className="text-xs font-quicksand font-semibold text-foreground/80 text-center leading-tight truncate w-full text-center">
        {link.name}
      </span>
    </a>
  );
}

function AppSection({ section, delay }: { section: Section; delay: number }) {
  const delayStyle = { animationDelay: `${delay}ms`, opacity: 0 };
  return (
    <div
      className="animate-fade-in-up"
      style={delayStyle}
      data-ocid={`section.${section.id}`}
    >
      <h2 className="text-sm font-quicksand font-bold text-muted-foreground uppercase tracking-widest mb-3 pl-1">
        {section.title}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {section.links.map((link, i) => (
          <AppCard key={link.name} link={link} index={i} />
        ))}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = search.trim();
      if (!q) return;
      if (/^https?:\/\//.test(q) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(q)) {
        window.open(q.startsWith("http") ? q : `https://${q}`, "_blank");
      } else {
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(q)}`,
          "_blank",
        );
      }
    },
    [search],
  );

  const visibleSections = SECTIONS.filter((s) => s.tabs.includes(activeTab));
  const greeting = getGreeting();

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "school", label: "At School" },
    { id: "strict", label: "Strict" },
    { id: "all", label: "All" },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient glow background */}
      <div className="glow-ambient" aria-hidden="true" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Date / time pill */}
        <div className="flex justify-center pt-8 pb-2">
          <div
            data-ocid="datetime.pill"
            className="animate-fade-in-up px-5 py-2 rounded-full border border-primary/30 bg-card/60 backdrop-blur-sm text-sm font-quicksand font-semibold text-foreground/80 shadow-md"
          >
            {formatDateTime(now)}
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center px-4 pt-4 pb-2 animate-fade-in-up animate-delay-100">
          <h1
            className="font-fredoka gradient-pink-to-orange text-5xl md:text-7xl font-normal leading-tight mb-3"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            {greeting}, sunshine 🌷
          </h1>
          <p className="font-quicksand text-foreground/60 text-base md:text-lg max-w-xl mx-auto">
            Your soft little corner of the internet — everything for school in
            one place.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mt-5 mb-4 animate-fade-in-up animate-delay-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`filter.tab.${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`font-quicksand font-semibold px-5 py-2 rounded-full text-sm transition-smooth border ${
                activeTab === tab.id
                  ? "bg-primary/20 border-primary/50 text-primary shadow-md"
                  : "bg-card/40 border-border/50 text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center px-4 mb-8 animate-fade-in-up animate-delay-300"
        >
          <div className="relative w-full max-w-xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              data-ocid="search.input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Google or type a URL..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-card/70 border border-border/60 backdrop-blur-sm text-foreground placeholder:text-muted-foreground font-quicksand text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-smooth"
            />
            <button
              type="submit"
              data-ocid="search.submit_button"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-primary/20 border border-primary/40 text-primary font-quicksand text-xs font-semibold hover:bg-primary/30 transition-smooth"
            >
              Go
            </button>
          </div>
        </form>

        {/* App sections */}
        <main
          className="flex-1 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto w-full pb-10 flex flex-col gap-8"
          data-ocid="main.content"
        >
          {visibleSections.map((section, i) => (
            <AppSection
              key={section.id}
              section={section}
              delay={400 + i * 100}
            />
          ))}
        </main>

        {/* Footer */}
        <footer
          className="text-center py-6 px-4 text-xs font-quicksand text-muted-foreground/60 animate-fade-in-up animate-delay-500"
          data-ocid="footer"
        >
          <p className="mb-1">
            made with love · set this page as your browser homepage to bloom
            every morning 🌸
          </p>
        </footer>
      </div>
    </div>
  );
}
