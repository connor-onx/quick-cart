## Quick Cart — Copilot Instructions

Purpose: Help AI coding agents be immediately productive in this repository.

**Big Picture**: This is a Next.js 16 (App Router) TypeScript project using React 19. The app uses `@react-three/fiber` + `three` for 3D rendering and integrates a browser face-tracking library (`facefilter`) to drive 3D models. The main UI lives in the `app/` directory (App Router) and static 3D assets live under `public/models/`.

**How to run (dev/build)**
- `npm install` — install deps.
- `npm run dev` — start Next.js in development (short feedback loop).
- `npm run build` then `npm run start` — production build and serve.
- `npm run lint` — run ESLint.

**Key files to inspect when changing behavior**
- `app/layout.tsx` — global layout, fonts and `globals.css` imports.
- `app/page.tsx` — top-level route (home).
- `app/components/face-filter/canvas.tsx` — client component that wires `facefilter` and React Three Fiber together. Use this when changing AR or tracking behavior.
- `app/components/face-filter/contrib/faceFilter/JeelizThreeFiberHelper.js` — imperative helper that translates face detection states to Three.js transforms. It is plain JS and intentionally minimal; keep edits careful and preserve its API (`init`, `update`, `update_camera`, `create_occluder`).
- `app/types/facefilter.d.ts` — local type declarations for expression and detect state shapes.
- `public/models/` — store GLTF/3D models referenced by `useGLTF('/models/')` in the canvas component.

**Project-specific conventions & patterns**
- App-router + client components: files that use browser-only APIs or `three` will include a top-line `"use client"` (see `canvas.tsx`). Keep server components free of client-only imports.
- Mixed JS/TS: Third-party helpers (e.g., `JeelizThreeFiberHelper.js`) are JS and live next to TSX code. `tsconfig.json` sets `allowJs: true` and `strict: true`. When importing JS modules, prefer adding a `// @ts-expect-error` or add minimal `.d.ts` typings in `app/types/` if you need safer typing.
- Small global state: face tracking uses module-level arrays (e.g., `_faceFollowers`, `_expressions`) to bridge runtime callbacks and React. If refactoring, keep the public shape and lifetime semantics (init -> update -> destroy).

**Integration points & external APIs**
- `facefilter` exposes globals used in `canvas.tsx`: `JEELIZFACEFILTER` and `NN_4EXPR`. Calls: `JEELIZFACEFILTER.init({...})`, `JEELIZFACEFILTER.render_video()`, `JEELIZFACEFILTER.resize()`, possibly `destroy()`.
- `JeelizThreeFiberHelper` expects an `init(spec, threeObjects, detectCallback)` call where `spec.maxFacesDetected` and optionally `videoElement` are provided. It receives `detectStates` and a Three.js camera in `update`.
- Three.js camera manipulation uses `setViewOffset` and projection matrix caching — changes to camera math must preserve view offset behavior for correct overlay alignment.

**Editing guidance (practical examples)**
- When updating face tracking logic: update both `canvas.tsx` (callbacks, lifecycle) and `JeelizThreeFiberHelper.js` (pose math). Example: changing pivot offsets requires touching `_settings.pivotOffsetYZ` in the helper.
- When introducing types for a JS-only lib, add a file under `app/types/` and reference it from the importing TSX file (see `facefilter.d.ts`).
- For UI changes, prefer editing `app/layout.tsx` and route files under `app/`; keep component exports default and avoid breaking server/client boundaries.

**Linting, formatting, and tests**
- Lint via `npm run lint` (uses local `eslint`). There are no repo tests; add focused tests if you add business logic.

**Pull Request & commit style**
- Make small, focused commits. When editing `JeelizThreeFiberHelper.js`, include a brief math/regression test (even as a dev-only page) demonstrating new behavior.
- Preserve backwards compatibility of the helper's public API (`init`, `update`, `update_camera`, `create_occluder`, `destroy` if present).

**Where to look for more context**
- `package.json` — runtime dependencies (Next 16, react-three-fiber, facefilter, three).
- `tsconfig.json` — `allowJs` and path aliases (`@/*` -> `./*`).
- `README.md` — repository-level notes.

If anything here is ambiguous or you want deeper detail (e.g., expected video resolutions that `JeelizThreeFiberHelper` assumes, or preferred Node/npm tooling like `pnpm`), ask and I will update this file accordingly.
