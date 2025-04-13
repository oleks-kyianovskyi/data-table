# 📊 Dynamic Data Explorer

A flexible, performant dashboard-style app that renders dynamic tables based on schema configuration.  
Supports real-time filtering, row editing, dark mode, and large dataset virtualization.

---

## 🧱 Tech Stack

- **Build**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Framework**: React
- **State Management**: Zustand
- **Styling**: Vanilla CSS with CSS Variables
- **Performance**: `react-window` for virtualization

---

## 🚀 Features

-  **Dynamic column rendering** via config schema
-  **Filter panel** for text, number ranges, dates, enums
-  **AND / OR logic** for compound filters
-  **Saved views** stored in `localStorage`
-  **Row editing** with in-place updates
-  **Dark/Light theme** with Context API + CSS variables
-  **Optimized for large datasets** using virtualization

---

## 🧠 Architecture Decisions

- **Modular design**  
  Each major feature (DataTable, FilterPanel, RowEditor) lives in its own directory for scalability and separation of concerns.

- **Schema-driven rendering**  
  The entire table layout and behavior is dictated by a single `ColumnSchema`, making it easily reusable for different datasets.

- **Zustand for row-level state**  
  Prevents full table re-renders when a single row is edited.

- **Context API for theming**  
  Global dark/light mode control, stored in localStorage and applied via `class="theme-dark"`.

- **Performance-first rendering**  
  `react-window` only renders visible rows for snappy performance on large lists.

---

## ⚔️ Challenges

- **Filter logic**  
  `applyFilters()` required careful handling of various data types (strings, numbers, dates, enums) and optional inputs.

- **AND/OR compound logic**  
  Initially caused false positives; required precise filter normalization and early-return logic.

---

## 🔮 Future Improvements

-  Realtime column resizing & reordering
-  Mobile responsiveness (flex/grid layout)
-  Styling framework like Tailwind or ShadCN
-  Global full-text search across rows
-  Deeper modularization of functional components
-  E2E tests with Cypress

---

## 📦 Getting Started

```bash
npm install
npm run dev