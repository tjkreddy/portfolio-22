# Jugal Kishore's Portfolio Monorepo

Welcome to the central repository for my personal portfolio. To reflect my dual focus on human-centered UI/UX design and low-level systems engineering, this portfolio is split into two distinct experiences, both powered by a shared architecture.

**Choose your interface:**

- **[System 7 OS (Web)](apps/web):** A graphical, high-fidelity retro desktop experience.
- **[Terminal Portfolio (CLI)](apps/cli):** A fast, keyboard-centric SSH server for those who prefer `tty` over `gui`.

---

## Polyglot Monorepo Architecture

This project is architected as a modern polyglot monorepo to cleanly separate concerns while demonstrating scalable engineering practices across different ecosystems (Node.js and Go).

```
portfolio-22/
├── Makefile           # Master orchestrator for cross-language startup
├── apps/
│   ├── web/           # Next.js System 7 GUI application (TypeScript/React)
│   └── cli/           # Bubble Tea SSH server application (Go)
└── packages/          # (Future) Shared configurations and data schemas
```

---

##  System 7 Portfolio OS (`apps/web`)

The graphical interface is a strict adherence to classic human-centered UI/UX principles, specifically reverse-engineered from early 1990s Macintosh operating systems.

- Features **Fitts's Law** applications, **1-Bit Architecture**, and **Gestalt Principles**.
- Built with **Next.js**, **React**, and **Tailwind CSS**.

 [Read the full Web Documentation](web.md)

---

##  Terminal Portfolio (`apps/cli`)

The CLI interface is designed for speed and keyboard-first navigation, catering to systems engineers and terminal power users.

- Features a zero-distraction, text-based UI with a **"Green Phosphor"** aesthetic.
- Served over a custom raw TCP port via SSH, bypassing the browser entirely.
- Built with **Go**, **Bubble Tea** (MVU pattern), and **Wish** (SSH middleware).

 [Read the full CLI Documentation](cli.md)

---

##  Getting Started

Clone the repository:

```bash
git clone https://github.com/tjkreddy/portfolio-22.git
cd portfolio-22
```

To run both environments simultaneously, use the root orchestrator to spin up the Go server and the Next.js server in parallel:

```bash
make -j 2 dev
```

---

##  About the Developer

**Jugal Kishore Reddy Thangella** is a Computer Science student (Mahindra University & University of Florida Exchange) specializing in polyglot monorepos, systems architecture (Golang, C++), and UX engineering.

- 🌐 **Network:** [uni-connect.live](https://uni-connect.live)
- 🐙 **GitHub:** [@tjkreddy](https://github.com/tjkreddy)

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
