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
        <Button onClick={onResetGame} disabled={!hasPlayers} className="px-4 py-2">
          <RotateCcw className="pr-2" size={28}/>
          Reset Scores
        </Button>
        <Button onClick={onNewGame} className="px-4 py-2">
          <CirclePlay className="pr-2" size={28}/>
          New Game
        </Button>
        <Button onClick={onSaveGame} disabled={!hasPlayers} className="px-4 py-2">
          <Save className="pr-2" size={28}/>
          Save Game
        </Button>
      </div>
      <p className="font-mono text-center text-xs text-muted-foreground">
        &copy; 2026 SuperAwesome Dev Guy.<br />All rights reserved.
      </p>
    </footer>
  )
}
