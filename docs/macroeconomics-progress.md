# Macroeconomics Platform - Implementation Progress

> **Spec Document**: [macroeconomics-spec.md](./macroeconomics-spec.md)
> **Last Updated**: 2026-01-31 (Initial)
> **Target Completion**: 15 weeks from start

---

## Overall Progress

| Phase | Status | Progress |
|-------|--------|---------|
| Phase 1: Foundations (Weeks 1-3) | 🔲 Not Started | 0% |
| Phase 2: Fluctuations & Growth (Weeks 4-6) | 🔲 Not Started | 0% |
| Phase 3: Polish & Testing (Weeks 7-9) | 🔲 Not Started | 0% |
| Phase 4: Monetary & Fiscal Policy (Weeks 10-12) | 🔲 Not Started | 0% |
| Phase 5: International Economics (Weeks 13-15) | 🔲 Not Started | 0% |

**Legend**: 🔲 Not Started | 🟡 In Progress | ✅ Complete | ⏸️ Blocked

---

## Phase 1: Foundations (Weeks 1-3)

**Goal**: Core platform with first 3 modules functional

| Task | Priority | Effort | Status | Notes |
|------|----------|--------|--------|-------|
| Project setup, page structure at `/tools/macroeconomics` | P0 | 1d | 🔲 | Reuse accounting-intro patterns |
| Core layout components (navigation, progress, header) | P0 | 2d | 🔲 | Adapt from accounting-intro |
| Module content framework | P0 | 1d | 🔲 | |
| Module 1 content: Introduction to Macroeconomics | P0 | 2d | 🔲 | Macro goals (with context that targets evolve), circular flow, economic systems |
| Circular Flow Visualizer | P0 | 3d | 🔲 | Animated flow with sectors toggle |
| Economic Systems Comparison Tool | P1 | 2d | 🔲 | Interactive comparison across systems |
| Module 2 content: Measuring the Economy (GDP) | P0 | 3d | 🔲 | GDP components, real vs nominal, **limitations critical thinking section** |
| GDP Calculator | P0 | 3d | 🔲 | All approaches, real/nominal conversion |
| Economic Data Explorer | P0 | 4d | 🔲 | Historical GDP visualization, comparisons |
| Module 3 content: Unemployment | P0 | 2d | 🔲 | Types, measurement, natural rate, **Okun's Law (with coefficient range)** |
| Unemployment Calculator | P0 | 2d | 🔲 | Calculate various measures |
| Jobs Report Analyzer | P1 | 3d | 🔲 | Practice interpreting employment data |
| Knowledge Check quizzes (Modules 1-3) | P0 | 2d | 🔲 | 10-15 questions each |
| Basic progress tracking | P0 | 1d | 🔲 | Reuse Zustand store pattern |
| Responsive layout (desktop + mobile) | P0 | 2d | 🔲 | |

**Phase 1 Deliverable**: Functional platform with Modules 1-3, GDP Calculator, Data Explorer

---

## Phase 2: Fluctuations & Growth (Weeks 4-6)

**Goal**: Complete Part II (Economic Fluctuations and Growth)

| Task | Priority | Effort | Status | Notes |
|------|----------|--------|--------|-------|
| Module 4 content: Business Cycles | P0 | 3d | 🔲 | Phases, indicators, causes |
| Business Cycle Visualizer | P0 | 4d | 🔲 | Historical timeline with recession overlay |
| Leading Indicator Dashboard | P0 | 3d | 🔲 | Track indicators, recession probability |
| Module 5 content: Aggregate Demand and Supply | P0 | 3d | 🔲 | AD-AS model, equilibrium, **interest rate/AD common confusion addressed** |
| AD-AS Simulator | P0 | 5d | 🔲 | Draggable curves, shock analysis |
| Economic Shock Analyzer | P1 | 3d | 🔲 | News event → AD/AS shift prediction |
| Module 6 content: Economic Growth | P0 | 2d | 🔲 | Growth determinants, production function |
| Growth Calculator | P0 | 2d | 🔲 | Project GDP over time, Rule of 70 |
| Country Comparison Dashboard | P1 | 3d | 🔲 | Multi-country growth visualization |
| Knowledge Check quizzes (Modules 4-6) | P0 | 2d | 🔲 | |
| Time series chart components | P0 | 2d | 🔲 | Recharts for macro data |

**Phase 2 Deliverable**: Modules 1-6 complete with all core interactive tools

---

## Phase 3: Polish & Testing (Weeks 7-9)

**Goal**: Production-ready MVP

| Task | Priority | Effort | Status | Notes |
|------|----------|--------|--------|-------|
| Comprehensive accessibility audit | P0 | 2d | 🔲 | ARIA labels, keyboard nav, screen reader |
| Cross-browser testing | P0 | 2d | 🔲 | Chrome, Firefox, Safari, Edge |
| Performance optimization | P0 | 2d | 🔲 | Lazy loading, bundle size |
| Mobile experience refinement | P0 | 2d | 🔲 | Touch-friendly charts, responsive forms |
| Animation polish (Framer Motion) | P1 | 2d | 🔲 | Circular flow animation, AD-AS transitions |
| Unit tests for interactive components | P0 | 3d | 🔲 | Vitest tests for calculators/simulators |
| Data export functionality | P1 | 2d | 🔲 | Export charts, calculated data |
| Bug fixes and QA | P0 | 3d | 🔲 | |

**Phase 3 Deliverable**: Production-ready MVP with Modules 1-6 ✅

---

## Phase 4: Monetary & Fiscal Policy (Weeks 10-12) — Post-MVP

**Goal**: Complete Part III (Monetary and Fiscal Policy)

| Task | Priority | Effort | Status | Notes |
|------|----------|--------|--------|-------|
| Module 7 content: Money and Banking | P0 | 3d | 🔲 | Money functions, money creation, **equation of exchange (MV=PY)** |
| Money Multiplier Calculator | P0 | 2d | 🔲 | Trace money through banking system |
| Fed Balance Sheet Explorer | P1 | 3d | 🔲 | Understand monetary operations |
| Module 8 content: Monetary Policy | P0 | 3d | 🔲 | Fed tools, transmission mechanism |
| Monetary Policy Simulator | P0 | 4d | 🔲 | Set rates, see economic effects |
| Fed Watcher Game | P1 | 4d | 🔲 | Predict/evaluate Fed decisions |
| Module 9 content: Fiscal Policy | P0 | 3d | 🔲 | Government spending, taxes, multipliers |
| Fiscal Policy Sandbox | P0 | 4d | 🔲 | Adjust taxes/spending, see effects |
| Debt Trajectory Calculator | P1 | 3d | 🔲 | Project future debt levels |
| Module 10 content: Inflation | P0 | 2d | 🔲 | Causes, costs, Phillips Curve |
| Inflation Calculator | P0 | 2d | 🔲 | Real value across time |
| Phillips Curve Explorer | P1 | 3d | 🔲 | Inflation-unemployment trade-off |
| Knowledge Check quizzes (Modules 7-10) | P0 | 2d | 🔲 | |

**Phase 4 Deliverable**: Modules 1-10 complete

---

## Phase 5: International Economics (Weeks 13-15) — Post-MVP

**Goal**: Complete Part IV (International Macroeconomics)

| Task | Priority | Effort | Status | Notes |
|------|----------|--------|--------|-------|
| Module 11 content: International Trade | P0 | 3d | 🔲 | Comparative advantage, trade policy |
| Comparative Advantage Calculator | P0 | 3d | 🔲 | Find optimal specialization |
| Tariff Impact Analyzer | P1 | 3d | 🔲 | Model trade policy effects |
| Module 12 content: Exchange Rates | P0 | 3d | 🔲 | Determination, regimes, crises |
| Exchange Rate Modeler | P0 | 3d | 🔲 | Predict currency movements |
| Currency Crisis Simulator | P1 | 4d | 🔲 | Experience speculative attacks |
| Glossary page implementation | P1 | 2d | 🔲 | |
| Resources hub (data sources, references) | P0 | 2d | 🔲 | Links to FRED, BLS, etc. |
| Knowledge Check quizzes (Modules 11-12) | P0 | 1d | 🔲 | |
| Final polish and documentation | P1 | 2d | 🔲 | |

**Phase 5 Deliverable**: All 12 modules complete ✅

---

## MVP Checklist

Core deliverables for initial release (Phases 1-3):

### Modules
- [ ] Module 1: Introduction to Macroeconomics
- [ ] Module 2: Measuring the Economy (GDP)
- [ ] Module 3: Unemployment
- [ ] Module 4: Business Cycles
- [ ] Module 5: Aggregate Demand and Aggregate Supply
- [ ] Module 6: Economic Growth

### Core Interactive Tools
- [ ] Circular Flow Visualizer
- [ ] GDP Calculator
- [ ] Economic Data Explorer
- [ ] Unemployment Calculator
- [ ] Business Cycle Visualizer
- [ ] Leading Indicator Dashboard
- [ ] AD-AS Simulator
- [ ] Growth Calculator

### Platform Features
- [ ] Progress tracking (localStorage)
- [ ] Knowledge Check quizzes
- [ ] Chart/data export
- [ ] Responsive design (desktop/tablet/mobile)

### Downloadable Resources
- [ ] Macroeconomics Key Concepts Summary
- [ ] Circular Flow Model Diagram
- [ ] GDP Components Quick Guide
- [ ] Economic Indicators Quick Guide
- [ ] AD-AS Model Summary
- [ ] Growth Accounting Framework

---

## Blockers & Issues

| Issue | Severity | Status | Resolution |
|-------|----------|--------|------------|
| *None yet* | — | — | — |

---

## Dependencies

```bash
# Same as accounting-intro (already installed)
# Core: @astrojs/react, react, react-dom
# Charts: recharts
# Animation: framer-motion
# State: zustand
# Icons: lucide-react

# Consider for macro-specific needs:
# Real-time data: API integration (FRED, World Bank) — Post-MVP
```

---

## Notes & Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-31 | MVP scope: Modules 1-6 only | Covers foundations + business cycles + growth |
| 2026-01-31 | Reuse accounting-intro patterns | Consistent UX, faster development |
| 2026-01-31 | localStorage for progress | No backend required for MVP |
| 2026-01-31 | Focus on data visualization | Macro relies heavily on time series data |
| 2026-01-31 | Simulated data for MVP | Real API integration deferred to post-MVP |
| 2026-01-31 | Fixed AD shifter table | Corrected error: lower interest rates increase (not decrease) AD |
| 2026-01-31 | Added Okun's Law coefficient range | Modern estimates 1.5-2.0, varies by country/period |
| 2026-01-31 | Added natural rate context | Note that 4-5% is current estimate; was 6-7% in 1980s |
| 2026-01-31 | Added velocity of money to Module 7 | MV=PY foundational for monetary theory |

---

## Data Sources (for reference/future integration)

| Source | Data Available | API |
|--------|----------------|-----|
| **FRED** | GDP, unemployment, inflation, rates | Yes |
| **BLS** | Employment, CPI, wages | Yes |
| **BEA** | GDP components, trade | Yes |
| **World Bank** | Cross-country data | Yes |
| **IMF** | International data | Yes |
| **OECD** | Developed country data | Yes |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-31 | Initial progress tracker created |
| 2026-01-31 | Updated to reflect spec revisions: fixed AD shifter error, added Okun's Law range, natural rate context, GDP critical thinking, velocity of money preview |
