type Project = {
  name: string;
  tagline: string;
  href: string;
  repo: string;
  screenshot: string;
};

const projects: Project[] = [
  {
    name: "Agentdrop",
    tagline:
      "Artifact hosting for AI agents — images, video, HTML, PDF, and Markdown with shareable links.",
    href: "https://drop.l92-labs.com",
    repo: "https://github.com/L92-Labs/agentdrop",
    screenshot: "/screenshots/agentdrop-home.webp",
  },
  {
    name: "Flarecrawl",
    tagline:
      "A Cloudflare-native scrape, crawl, map, and extract API with a public playground.",
    href: "https://crawl.l92-labs.com/playground",
    repo: "https://github.com/L92-Labs/flarecrawl",
    screenshot: "/screenshots/flarecrawl-home.webp",
  },
  {
    name: "Domain Idea Agent",
    tagline:
      "Turn a one-line idea into ranked, available domain names and a brand kit — usable by humans and agents over MCP.",
    href: "https://domainagent-web.loiu92.workers.dev",
    repo: "https://github.com/L92-Labs/domain-idea-agent",
    screenshot: "/screenshots/domain-idea-agent-home.png",
  },
  {
    name: "AI Smart Router",
    tagline:
      "OpenAI-compatible routing that picks the cheapest eligible model per request — policy, experiments, and adaptive control on Cloudflare.",
    href: "https://dev-ai-smart-router-web.yaoxin-yu-intelligent-technology.workers.dev",
    repo: "https://github.com/L92-Labs/ai-smart-router",
    screenshot: "/screenshots/ai-smart-router-home.webp",
  },
];

export default function Page() {
  return (
    <main>
      <div className="wrap">
        <nav className="nav">
          <a className="brand" href="/">
            <img src="/logo.png" alt="" />
            L92 LABS
          </a>
          <div className="nav-links">
            <a href="https://github.com/L92-Labs">GitHub</a>
          </div>
        </nav>

        <section className="hero">
          <img className="hero-logo" src="/logo.png" alt="L92 Labs" />
          <h1>Cloudflare-native tools for AI agents</h1>
          <p>
            Small, sharp products that agents and the people who run them can
            reach for directly — artifact hosting, web crawling, domain naming,
            and model routing, all built on Cloudflare Workers.
          </p>
        </section>

        <section className="projects">
          {projects.map((p) => (
            <article className="card" key={p.name}>
              <a className="card-shot" href={p.href}>
                <img src={p.screenshot} alt={`${p.name} screenshot`} />
              </a>
              <div className="card-body">
                <h2>{p.name}</h2>
                <p>{p.tagline}</p>
                <div className="card-links">
                  <a className="primary" href={p.href}>
                    Open →
                  </a>
                  <a className="secondary" href={p.repo}>
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} L92 Labs</span>
          <a href="https://github.com/L92-Labs">github.com/L92-Labs</a>
        </footer>
      </div>
    </main>
  );
}
