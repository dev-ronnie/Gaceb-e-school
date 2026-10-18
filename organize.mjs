// Puts the flat files into the folders the build needs. Runs automatically before dev and build.
import { mkdirSync, existsSync, renameSync } from "node:fs";

const map = {
  "src/routes": ["__root.tsx","index.tsx","about.tsx","announcements.tsx","assistant.tsx","coins.tsx","contact.tsx","courses.tsx","dashboard.tsx","donate.tsx","events.tsx","library.tsx","notices.tsx","planner.tsx","privacy.tsx","quizzes.tsx","terms.tsx"],
  "src/components": ["countdown.tsx","honour-calendar.tsx","latest-notices.tsx","pay-panel.tsx","shell.tsx"],
  "src/lib": ["assistant.ts","board.ts","config.ts","error-component.tsx","format.ts","gaceb.tsx","supabase.ts"],
  "src": ["router.tsx","styles.css"],
  "public/brand": ["gaceb-logo.png","gauge-portrait.jpg","icon-192.png","icon-512.png","og.jpg"],
  "public": ["manifest.webmanifest"],
};

for (const [dir, files] of Object.entries(map)) {
  for (const f of files) {
    if (!existsSync(f)) continue; // missing or already placed
    mkdirSync(dir, { recursive: true });
    renameSync(f, `${dir}/${f}`);
  }
}
