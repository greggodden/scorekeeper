'use client'

import { PlayerListRow } from './PlayerListRow'
import type { Player } from '@/types/scorekeeper'

interface PlayerListProps {
  players: Player[]
  emptyPlaceholder?: string
  onRemovePlayer: (player: Player) => void
  onAddPoint: (id: string) => void
  onSubtractPoint: (id: string) => void
}

export function PlayerList({
  players,
  emptyPlaceholder = 'Add players to begin.',
  onRemovePlayer,
  onAddPoint,
  onSubtractPoint
}: PlayerListProps) {
  return (
    <section className="py-4">
      <h2 className="mb-4 text-2xl font-light italic text-foreground">Players</h2>
      <div className="space-y-4">
        {players.length === 0 ? (
          <p className="text-center text-muted-foreground">{emptyPlaceholder}</p>
        ) : (
          players.map((player) => (
            <PlayerListRow
              key={player.id}
              player={player}
              onRemove={onRemovePlayer}
              onAddPoint={onAddPoint}
              onSubtractPoint={onSubtractPoint}
            />
          ))
        )}
      </div>
    </section>
  )
}
