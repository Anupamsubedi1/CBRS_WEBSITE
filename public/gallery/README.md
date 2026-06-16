# Gallery photos

The gallery and the programs are interrelated: every photo is tagged with a
program (`programSlug`) in `lib/data/gallery.ts`, so it appears both in the
gallery (filtered by that program) and on the program's own page.

## How to add real photos

1. Drop the photo into the matching folder below.
2. In `lib/data/gallery.ts`, add (or update) an entry and set:
   - `slug`  → the program it belongs to (see mapping below)
   - `title` → a short caption
   - `src`   → `/gallery/<folder>/<file>.jpg`

Until a `src` is set, a branded placeholder is shown (never a broken image).

## Your folders → program mapping

| Folder                          | Program (`programSlug`)                          |
| ------------------------------- | ------------------------------------------------ |
| `device-making-and-delivery/`   | Rehabilitation and Health (`rehabilitation-health`) |
| `igp-support/`                  | Livelihood (`livelihood-development`)            |
| `shg-formation-and-programs/`   | Rights, Empowerment and Social Inclusion (`rights-social-inclusion`) |
| `special-programs/`             | Rights, Empowerment and Social Inclusion (`rights-social-inclusion`) |
| `supported-by-local-government/`| Community Development (`community-development`)  |

Programs without a dedicated folder (Inclusive Education, Human Resource
Development and Research) can use any folder; what matters is the `slug` set on
the entry in `gallery.ts`.

Recommended: web-friendly JPGs, around 1600px on the long edge, < 600 KB each.
