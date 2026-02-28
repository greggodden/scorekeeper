'use client'

import { UserRoundMinus, CirclePlus, CircleMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Player } from '@/types/scorekeeper'

interface PlayerListRowProps {
  player: Player
  onRemove: (id: string) => void
  onAddPoint: (id: string) => void
  onSubtractPoint: (id: string) => void
}

export function PlayerListRow({
  player,
  onRemove,
  onAddPoint,
  onSubtractPoint
}: PlayerListRowProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
        <span className="min-w-0 flex-1 truncate text-base text-card-foreground">
          {player.name}
        </span>
        <Button
          variant="ghost"
          size="default"
          aria-label={`Remove ${player.name}`}
          onClick={() => onRemove(player.id)}
        >
          <UserRoundMinus size={20} />
        </Button>
      </div>
      <div className="flex shrink-0 items-center">
        <Button
          variant="ghost"
          size="default"
          aria-label={`Subtract point from ${player.name}`}
          onClick={() => onSubtractPoint(player.id)}
        >
          <CircleMinus size={20} />
        </Button>
        <span className="w-10 text-center text-2xl text-foreground">
          {player.score}
        </span>
        <Button
          variant="ghost"
          size="default"
          aria-label={`Add point to ${player.name}`}
          onClick={() => onAddPoint(player.id)}
        >
          <CirclePlus size={20} />
        </Button>
      </div>
    </div>
  )
}
