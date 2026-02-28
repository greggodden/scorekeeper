'use client'

import { RotateCcw, CirclePlay, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ScorekeeperFooterProps {
  hasPlayers: boolean
  onResetGame: () => void
  onNewGame: () => void
  onSaveGame: () => void
}

export function ScorekeeperFooter({
  hasPlayers,
  onResetGame,
  onNewGame,
  onSaveGame
}: ScorekeeperFooterProps) {
  return (
    <footer className="mt-8 border-border bg-background py-4">
      <div className="flex flex-wrap items-center justify-center gap-3 pb-2">
        <Button onClick={onResetGame} disabled={!hasPlayers} variant="gapped">
          <RotateCcw />
          Reset Scores
        </Button>
        <Button onClick={onNewGame} variant="gapped">
          <CirclePlay />
          New Game
        </Button>
        <Button onClick={onSaveGame} disabled={!hasPlayers} variant="gapped">
          <Save />
          Save Game
        </Button>
      </div>
      <p className="font-mono text-center text-xs text-muted-foreground">
        &copy; 2026 SuperAwesome Dev Guy.<br />All rights reserved.
      </p>
    </footer>
  )
}
