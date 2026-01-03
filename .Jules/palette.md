# Palette's Journal

## 2025-02-24 - Accessibility in Interactive Tools
**Learning:** Interactive simulations often lack basic accessible structure (labels, live regions) because they are treated as "games" rather than "forms". Adding `role="status"` to dynamic feedback areas makes them usable for screen readers without changing the visual design.
**Action:** Always check dynamic feedback areas in tools/simulations and wrap them in live regions. Ensure "game-like" inputs (ranges) have explicit labels.
## 2025-02-24 - Range Input Accessibility
**Learning:** Native HTML range inputs only announce numerical values by default. Using `aria-valuetext` allows us to present formatted values (like currency or units) to screen readers, matching the visual labels.
**Action:** Always add `aria-valuetext` to range inputs when the value has a unit or specific format.
