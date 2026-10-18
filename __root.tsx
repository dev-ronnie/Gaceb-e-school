import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { GacebProvider } from "@/lib/gaceb";
import { Shell } from "@/components/shell";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GACEB Scholar" },
      { name: "description", content: "Uganda curriculum learning for O-Level and A-Level students." },
      { name: "theme-color", content: "#0e5c43" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GACEB Scholar" },
      { property: "og:title", content: "GACEB Scholar" },
      { property: "og:description", content: "Uganda curriculum learning for O-Level and A-Level students." },
      { property: "og:image", content: "/brand/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/brand/icon-192.png" },
      { rel: "apple-touch-icon", href: "/brand/icon-192.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,680&family=Outfit:wght@400;500;600;700&display=swap",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto grid max-w-xl gap-4 py-16 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">Error 404</p>
      <h1 className="font-display text-4xl text-balance text-ink sm:text-5xl">This page could not be found</h1>
      <p className="text-lg text-pretty text-muted">
        The link may be old or mistyped. Head back to the home page or open the study library.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/library" className="btn btn-outline">Open PDF library</Link>
      </div>
    </div>
  ),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <GacebProvider>
          <Shell>
            <Outlet />
          </Shell>
        </GacebProvider>
        <Scripts />
      </body>
    </html>
  ),
});
