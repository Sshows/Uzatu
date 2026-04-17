---
name: shrift
description: Choose, pair, and implement fonts and typography systems for web or product interfaces. Use when selecting a new type direction, replacing default fonts, defining type scales, checking script/language coverage, or wiring font loading and CSS tokens into an existing codebase.
---

# Shrift

## Overview

Use this skill when the work is primarily about typography: picking better fonts, improving hierarchy, replacing bland defaults, or turning an ad hoc font setup into a consistent system.

Treat typography as both a design and implementation task. The goal is not just "find a nice font", but to land a type system that matches the product's tone, supports the needed languages, and is implemented cleanly in code.

## When to Use It

Use this skill when the user asks to:

- choose a font or font pairing
- improve a site's typography
- replace default/system fonts
- define heading, body, label, and mono roles
- support Latin, Cyrillic, Kazakh, Russian, or mixed-script content
- wire fonts into Next.js, CSS, Tailwind, or a design-token setup
- review whether the current typography feels generic, inconsistent, or hard to read

Do not use this skill when the request is mainly about full visual redesign, layout, or branding and typography is only a minor detail. In those cases, use the broader design or frontend workflow and apply this skill only to the type portion.

## Workflow

### 1. Establish Constraints

Before choosing fonts, determine:

- product tone: editorial, premium, playful, utilitarian, ceremonial, technical, etc.
- content density: short marketing copy, long-form reading, dashboard labels, forms, mixed UI
- script coverage: which languages and alphabets must render well
- performance limits: webfont budget, variable-font support, offline constraints
- current stack: existing CSS variables, Tailwind theme, `next/font`, `@font-face`, or hardcoded styles

If the user did not specify these, infer from the codebase and state the assumption.

### 2. Audit the Existing Setup

Look for:

- current font imports and loaders
- typography tokens or CSS custom properties
- repeated one-off `font-family`, `font-size`, and `font-weight` values
- inconsistent heading/body treatment
- missing fallbacks
- fonts that do not support the required scripts

Preserve existing design-system patterns when they are deliberate. Fix inconsistency before adding novelty.

### 3. Define the Type System

Prefer a small, intentional system over many fonts.

- Pick one body family that is reliable and readable.
- Add a contrasting display family only when it clearly improves the brand.
- Define explicit roles: display, heading, body, UI label, mono.
- Set a scale with clear step sizes instead of arbitrary per-component values.
- Define fallback stacks that match the intended feel and avoid layout jumps.

For multilingual interfaces, prioritize coverage and rhythm over trendiness. A beautiful Latin face that breaks on Cyrillic is not a good fit.

### 4. Implement in Code

Apply the type system at the token level first, then update components.

- Prefer the framework's native font pipeline when available, such as `next/font` in Next.js.
- Centralize font families, sizes, line heights, and weights in one place.
- Replace scattered overrides with shared classes or tokens.
- Keep the number of weights/styles modest.
- Use comments only where the font wiring would otherwise be confusing.

When editing an existing site or app, preserve the established structure and avoid broad visual churn unrelated to typography.

### 5. Validate

Check:

- headings and body copy read clearly on desktop and mobile
- long text blocks have comfortable line length and line height
- buttons, nav, labels, and form inputs remain legible
- mixed-script content renders correctly
- fallback behavior is acceptable if the custom font fails to load
- there is no obvious CLS, FOIT, or FOUT regression introduced by the font setup

## Output Expectations

A strong response or implementation usually includes:

- a short rationale for the chosen type direction
- the exact font roles and where they apply
- the code changes needed to load and apply the fonts
- any script-coverage, licensing, or performance caveats

## Default Heuristics

If the user asks for "better typography" without more direction:

- avoid default-looking system sans stacks unless the product intentionally wants a neutral utility feel
- do not add multiple decorative fonts
- choose readability over novelty for body text
- make hierarchy visible through size, weight, spacing, and contrast, not just bigger numbers
- if the project already has strong branding, support it instead of replacing it

## Example Requests

- "Use `shrift` to replace the generic fonts on this landing page."
- "Use `shrift` to pick a heading/body pairing for a wedding site with Cyrillic support."
- "Use `shrift` to audit this Next.js app and convert typography to shared tokens."
