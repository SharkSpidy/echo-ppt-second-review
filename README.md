# ECHO — Problem Statement, Methodology & System Workflow

A focused Vite + React + TypeScript slideshow cut from the ECHO Phase I second-review deck
(*ECHO: AI-Powered Navigation Assistant for Visually Impaired Users*).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run preview
```

## Slides (7)

| # | Slide | Source |
|---|-------|--------|
| 1 | Problem Statement | Carried over unchanged |
| 2 | Methodology | Carried over unchanged |
| 3 | Workflow Overview — Kinect → Vision Agent → Message Broker → Haptic / Voice → wearable output | New (Proposed System, Fig 4.1, Modules) |
| 4 | A Navigation Session — the six swim-lanes | New (Activity diagram, Fig 4.4) |
| 5 | Obstacle to Alert — Input → Process → Output for each agent | New (Modules slides) |
| 6 | Two Loops — guidance loop and obstacle loop, plus Stop | New (Sequence + Activity diagrams) |
| 7 | Source Diagrams — Fig 4.3 and Fig 4.4 | Original figures |

No new facts were added: every label comes from the original deck.

## Navigation

Arrow keys / PageUp / PageDown, the ‹ › buttons, the dots, or swipe. Home / End jump to the first / last slide.

## Where things live

- `src/data/slides.tsx` – the slide list
- `src/data/workflow.ts` – overview nodes, swim-lanes and loop steps
- `src/data/agents.ts` – the three agents' pipelines (used on slide 5)
- `src/components/workflow.tsx` – the five workflow slide components
- `public/images/` – Fig 4.3 and Fig 4.4
