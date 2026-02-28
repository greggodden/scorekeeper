'use client'

import { UserRoundPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PlayerFormProps {
  playerName: string
  onPlayerNameChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}

export function PlayerForm({
  playerName,
  onPlayerNameChange,
  onSubmit,
  inputRef
}: PlayerFormProps) {
  return (
    <header className="w-full pb-6">
      <h1 className="mb-4 text-3xl font-light italic text-foreground">
        Score<span className="font-bold text-primary">Keeper</span>
      </h1>
      <form className="flex gap-3" onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          value={playerName}
          onChange={(event) => onPlayerNameChange(event.target.value)}
          placeholder="Enter player name"
          aria-label="New player name"
        />
        <Button type="submit" size="default" variant="positive" aria-label="Add player">
          <UserRoundPlus size={28} />
        </Button>
      </form>
    </header>
  )
}
