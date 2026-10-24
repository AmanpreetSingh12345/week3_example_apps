# Notes: Week 3 - Tic-Tac-Toe Vue.js Implementation

Completed the Week 3 lecture on State Management and Vue Components.

Key Takeaways:
- Reactivity vs Vanilla JS: Vue handles reactivity through a declarative pattern where the UI reflects state automatically instead of manually manipulating the DOM with getElementById or innerHTML.
- Declarative flow: Rules for header messages and cell outputs are pre-defined using computed properties (headmsg, result) that recalculate on user clicks and state shifts.
- Component Architecture:
  - First implementation defined <tic> as a child component mounted inside an HTML table.
  - Second implementation refactored the design: HTML only requires the <board></board> tag. Vue templates, child <tick> components, and flexbox handle layout and rendering.
- Encapsulation & Reusability: Using a factory function for component state (`data: function() { return { ... } }`) allows dropping multiple <board></board> tags into the DOM, running side-by-side games with completely isolated memory.
- Scope: High-level UI and platforms like Chess.com fit declarative component models well, whereas performance-critical software (physics engines, 3D racing/fighting games) requires low-level game loops and compiled languages (C++, WebGL/WebGPU) over DOM abstraction.