# Desktop UI/UX V2 — QA checklist

## Scope
Branch: `feature/ui-ux-improvements-v1`. This checklist covers the shared desktop workspace, uploader, resize, background removal, format conversion and target compression. The changes are UI-only; do not alter processing algorithms.

## Viewport matrix
- [ ] 390 × 844 — mobile: no horizontal overflow; actions reachable.
- [ ] 768 × 1024 — tablet: panels stack and remain usable.
- [ ] 1024 × 768 — small desktop: image/settings split, no clipped controls.
- [ ] 1366 × 768 — desktop: preview usable and sticky sidebar doesn't overlap header.
- [ ] 1440 × 900 — desktop: toolbar, preview, settings and actions align.
- [ ] 1920 × 1080 — wide desktop: preview has priority; batch results use two columns.
- [ ] 2560 × 1440 — ultrawide: images preserve aspect ratio and text remains readable.

## Core flows
- [ ] Drag/drop and file picker work with single and multiple images.
- [ ] Unsupported file type / oversize file shows accessible error.
- [ ] Selecting another image updates the selected file and preview.
- [ ] Resize: aspect ratio lock, invalid dimensions, result preview, zoom/fit, adjust again and download.
- [ ] Background removal: threshold/softness, before-after comparison, adjust again, download PNG.
- [ ] Convert: manual and automatic conversion, quality settings, batch progress, failed file states, individual and ZIP download.
- [ ] Target compression: selected file summary, in-progress states, target-met/best-effort labels, individual and ZIP download.
- [ ] Preview zoom at 25%, 100%, 400% uses native pixel dimensions; Fit keeps image contained.

## Accessibility and resilience
- [ ] Keyboard-only navigation: dropzone, sliders, toggles, zoom, download.
- [ ] Focus rings visible in light and dark modes.
- [ ] Errors announced with `role=alert`; status announced without flooding screen readers.
- [ ] Long filenames wrap/truncate without pushing actions offscreen.
- [ ] Transparent PNG checkerboard visible; no image stretching.
- [ ] Loading/disabled buttons prevent accidental double submission.
- [ ] Object URLs released when changing files or unmounting.
- [ ] Slow processing, per-file failures and retry/adjust flows behave correctly.

## Engineering verification
- [ ] Install dependencies with the repository's lockfile and package manager.
- [ ] Run TypeScript validation and lint.
- [ ] Run existing automated tests and production build.
- [ ] Perform manual visual regression in Chromium and Safari.
- [ ] Verify no changes to API payloads, algorithms or download filenames.

> This document is a checklist, **not** evidence that these checks have passed.
