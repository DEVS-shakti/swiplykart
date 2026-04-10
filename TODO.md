# SwiplyKart Build TODO

This file is the handoff note for the next developer or agent if work is interrupted.

## Stage 1: Recovery and Planning
- [x] Audit repo state after interruption.
- [x] Review Stitch HTML/screens and local Next 16 docs.
- [x] Install required runtime dependencies.
- [x] Create a staged handoff file.
- [x] Restore the deleted starter home route with the new implementation.

## Stage 2: Shared Foundation
- [x] Replace starter theme with the SwiplyKart dark design system.
- [x] Configure remote image support for Stitch assets.
- [x] Add shared utilities and shadcn-style UI primitives.
- [x] Add Firebase client setup using the provided config.
- [x] Add mock product data and helpers for local prototype flows.
- [x] Add Zustand store for likes, dislikes, recents, and filters.

## Stage 3: Core Routes
- [x] Build `/` home page to match the Stitch hero, trending section, and CTA.
- [x] Build `/swipe` with animated swipe deck, card stack, and preload behavior.
- [x] Build `/products` with vibe filters, masonry layout, and infinite scroll.
- [x] Build `/product/[id]` with gallery, pricing, vibe tags, and related items.
- [x] Build `/auth/login` and `/auth/signup` with email and Google auth flows.
- [x] Build `/dashboard` with liked products, recently viewed, and personalized picks.

## Stage 4: Verification
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Fix any Next 16, TypeScript, or lint issues.
- [x] Update this file with any remaining gaps.

## Current State
- The main route set is implemented: `/`, `/swipe`, `/products`, `/product/[id]`, `/auth/login`, `/auth/signup`, and `/dashboard`.
- Shared components, Zustand state, Firebase client setup, and shadcn-style primitives are in place.
- `npm run lint` passes.
- `npm run build` passes on Next `16.2.3`.

## Remaining Notes
- Product content is currently mock data from `lib/db.ts` so the prototype works locally without Firestore seeding.
- Firebase Auth is wired in the UI, but live authentication still depends on the remote Firebase project configuration and allowed auth methods.
