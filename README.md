# ScoreKeeper

A scorekeeping web application for tracking game scores. Add players, adjust scores with +/- buttons, reset scores, or start a new game. Error messages and feedback are shown via toast notifications.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Radix UI** (Toast, Slot, Visually Hidden)
- **class-variance-authority** and **lucide-react** for UI

## Key components

- **ScorekeeperPage** – Main page; composes the form, player list, and footer; holds state and handlers; shows errors via toast.
- **PlayerForm** – Header with app title, player name input, and Add player button.
- **PlayerList** – "Players" section; shows placeholder text when empty or a list of **PlayerListRow**.
- **PlayerListRow** – Single player: name, remove button, minus/score/plus controls.
- **ScorekeeperFooter** – Reset Scores, New Game, and Save Game buttons (Save is placeholder for future use) and copyright.
- **Toaster** – Radix Toast provider and viewport; **useToast()** is used to show error toasts.

Shared types and the **ERROR_MESSAGES** map live in `types/scorekeeper.ts`.

## Built with

This project was built using **Cursor Agent** (Cursor’s AI-assisted development). The implementation plan and refactors were guided by a deep analysis and a stepwise PLAN.md, with changes applied and tested incrementally.
