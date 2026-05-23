# Crownvo.com Growth OS Presentation

Static documentation-style presentation for Crownvo.com, the email marketing platform built on its own proprietary script foundation.

The project is designed as a polished product and investor presentation rather than a generic slide deck. It explains what is already completed in the platform, what is still in progress, how the future AI operator should work, what the operating budget looks like, how the founders should execute the market plan, and how the free Crownvo Mails Chrome extension supports product-led traction.

## Live preview

https://ai-powered-email-marketing.netlify.app/

## What this presentation covers

- Current Crownvo.com platform positioning and product story
- Current architecture graph for the shipped platform
- Future AI operator architecture with zoomable diagrams
- Chat-to-execution workflow for AI-driven campaign creation
- UI direction for a conversation-first product experience
- Chrome extension traction and validation
- Detailed GBP 20,000 allocation plan and GBP 1,383 monthly burn
- Founder-led marketing plan for Shueb Kamil and Muhammad Salauddin
- Rollout phases for the AI operator release
- Printable investor follow-up packet for Price Capital Group

## Current feature status

### Completed

- Email warmup
- Lead generation
- Email editor
- Campaign engine
- Campaign automation
- Reply, communication, and follow-up handling
- Multiple SMTP support, including personal Gmail
- Analytics
- Owner reporting with daily or weekly summaries
- Crownvo Mails Chrome extension, published free on the Chrome Web Store

### In progress

- AI Chat
- Telegram Command System
- AI Credit Control

## Key roadmap direction

The roadmap in this presentation assumes Crownvo.com moves from a manually operated growth platform toward an AI-assisted operating model.

Planned additions include:

- AI-driven campaign planning and generation
- Telegram-based control for owners and operators
- Credit-gated AI usage so chat and server work stop when no balance remains
- Owner-facing daily or weekly AI analysis reports
- Expanded automation around approvals, replies, and follow-up actions

## Extension traction

Crownvo Mails is published free on the Chrome Web Store:

```text
https://chromewebstore.google.com/detail/crownvo-mails/fnonlngaohhboodpnhkgmnlkihdfbhib?authuser=0&hl=en
```

Founder-reported traction: 200+ regular users. Add a Chrome Web Store developer dashboard screenshot before sending investor materials.

## Budget assumption in the presentation

The cost model is written in GBP and now follows the presented investor deck: Crownvo is seeking GBP 20,000 with a monthly operating burn of GBP 1,383.

The six-month operating plan totals GBP 8,298, leaving GBP 11,702 from the ask for AI operator acceleration, growth experiments, customer onboarding, legal/admin work, and runway reserve after founder confirmation.

## Project structure

- `index.html` - Main presentation page and all presentation content
- `styles.css` - Visual system, responsive layout, tables, cards, and diagram viewer styling
- `app.js` - Mermaid rendering, full-view graph zoom modal, and sidebar navigation behavior
- `investor.html` - Printable investor follow-up packet
- `investor-print.css` - A4 print styling for the investor packet
- `plan.md` - Planning notes for investor follow-up materials
- `README.md` - Project documentation

## Presentation sections

The main page includes these sections:

- Overview
- Current platform
- Current architecture
- AI vision
- Future architecture
- Chat-to-execution flow
- UI updates
- Traction
- Cost model
- Marketing plan
- Rollout plan

## Diagram support

The architecture and workflow diagrams are built with Mermaid.

The page includes:

- Inline Mermaid diagrams
- Full-view diagram modal
- Zoom controls
- Pan support for large graphs

External libraries are loaded from CDN, so an internet connection is required for graph rendering.

## Local preview

Run a local static server from the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Editing notes

- Update presentation copy in `index.html`
- Update layout and visual styling in `styles.css`
- Update diagram behavior and section navigation in `app.js`

## Intended use

This repository is suitable for:

- Internal strategy presentation
- Founder pitch material
- Investor or partner walkthroughs
- Product roadmap communication
- Documentation-style client presentation
