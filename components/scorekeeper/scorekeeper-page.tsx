'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { 
  UserRoundPlus,
  UserRoundMinus,
  CirclePlus,
  CircleMinus,
  RotateCcw,
  Save,
  CirclePlay,
} from 'lucide-react'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ScorekeeperPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerName, setPlayerName] = useState('')
  const [error, setError] = useState<PlayerError | null>(initialError)

  function handleAddPlayer(args: HandleAddPlayerArgs) {
    const { name } = args

    if (!name.trim()) {
      setError({ code: 'noNameEntered' })
      return
    }

    if (name.length > 18) {
      setError({ code: 'nameTooLong' })
      setPlayerName('')
      return
    }

    const nameAlreadyExists = players.some((player) => player.name.toLowerCase() === name.toLowerCase())

    if (nameAlreadyExists) {
      setError({ code: 'existingPlayer' })
      return
    }

    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      score: 0
    }

    const nextPlayers = [...players, newPlayer]

    if (!nextPlayers.length) {
      setError({ code: 'failedToAddPlayer' })
      return
    }

    setPlayers(nextPlayers)
    setPlayerName('')
    setError(null)
  }

  function handleRemovePlayer(args: HandleRemovePlayerArgs) {
    const { id } = args
    const nextPlayers = players.filter((player) => player.id !== id)

    if (nextPlayers.length === players.length) {
      setError({ code: 'failedToRemovePlayer' })
      return
    }

    setPlayers(nextPlayers)

    if (!nextPlayers.length) {
      setError({ code: 'noPlayers' })
    }
  }

  function handleAddPoint(args: HandleAdjustPointArgs) {
    const { id } = args

    try {
      setPlayers((current) =>
        current.map((player) =>
          player.id === id ? { ...player, score: player.score + 1 } : player
        )
      )
      setError(null)
    } catch {
      setError({ code: 'failedToAddPoint' })
    }
  }

  function handleSubtractPoint(args: HandleAdjustPointArgs) {
    const { id } = args

    try {
      setPlayers((current) =>
        current.map((player) =>
          player.id === id ? { ...player, score: player.score - 1 } : player
        )
      )
      setError(null)
    } catch {
      setError({ code: 'failedToSubtractPoint' })
    }
  }

  function handleResetGame() {
    if (!players.length) {
      setError({ code: 'noPlayers' })
      return
    }

    setPlayers((current) => current.map((player) => ({ ...player, score: 0 })))
    setError(null)
  }

  function handleNewGame() {
    setPlayers([])
    setPlayerName('')
    setError({ code: 'noPlayers' })
  }

  function handleSaveGame() {
    if (!players.length) {
      setError({ code: 'noPlayers' })
      return
    }

    setError({ code: 'saveGame' })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleAddPlayer({ name: playerName })
  }

  const hasPlayers = players.length > 0
  const errorMessage = getErrorMessage({ error })

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
      <header className="w-full pb-6">
        <h1 className="mb-4 text-3xl font-light italic text-foreground">
          Score<span className="font-bold text-primary">Keeper</span>
        </h1>
        <form className="flex gap-3" onSubmit={handleSubmit}>
          <Input
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Enter player name"
            aria-label="New player name"
          />
          <Button type="submit" size="default" aria-label="Add player">
            <UserRoundPlus size={28} />
          </Button>
        </form>
      </header>

      <main className="flex-1">
        <section className="py-4">
          <h2 className="mb-4 text-2xl font-light italic text-foreground">Players</h2>

          <AlertDialog open={!!errorMessage} onOpenChange={(open) => !open && setError(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <VisuallyHidden>
                  <AlertDialogTitle>Notice</AlertDialogTitle>
                </VisuallyHidden>
                <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setError(null)}>
                  OK
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="space-y-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex flex-row items-center gap-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
                  <span className="min-w-0 flex-1 truncate text-base text-card-foreground">
                    {player.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="default"
                    aria-label={`Remove ${player.name}`}
                    onClick={() => handleRemovePlayer({ id: player.id })}
                  >
                    <UserRoundMinus size={20} />
                  </Button>
                </div>
                <div className="flex shrink-0 items-center">
                  <Button
                    variant="ghost"
                    size="default"
                    aria-label={`Subtract point from ${player.name}`}
                    onClick={() => handleSubtractPoint({ id: player.id })}
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
                    onClick={() => handleAddPoint({ id: player.id })}
                  >
                    <CirclePlus size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-8 border-border bg-background py-4">
        <div className="flex flex-wrap items-center justify-center gap-3 pb-2">
          <Button onClick={handleResetGame} disabled={!hasPlayers} variant="gapped">
            <RotateCcw />
            Reset Scores
          </Button>
          <Button onClick={handleNewGame} variant="gapped">
            <CirclePlay />
            New Game
          </Button>
          <Button onClick={handleSaveGame} disabled={!hasPlayers} variant="gapped">
            <Save />
            Save Game
          </Button>
        </div>
        <p className="font-mono text-center text-xs text-muted-foreground">
          &copy; 2026 SuperAwesome Dev Guy.<br />All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function getErrorMessage(args: GetErrorMessageArgs) {
  const { error } = args

  if (!error) {
    return ''
  }

  switch (error.code) {
    case 'noPlayers':
      return 'Add players to begin.'
    case 'noNameEntered':
      return 'Please enter a valid player name.'
    case 'nameTooLong':
      return 'Player name cannot exceed 18 characters.'
    case 'existingPlayer':
      return 'A player with that name already exists. Please try again.'
    case 'failedToAddPlayer':
      return 'Failed to add player. Please try again.'
    case 'failedToRemovePlayer':
      return 'Failed to remove player. Please try again.'
    case 'failedToAddPoint':
      return 'Failed to add point. Please try again.'
    case 'failedToSubtractPoint':
      return 'Failed to remove point. Please try again.'
    case 'saveGame':
      return 'This feature is still in development. Please try again later.'
    default:
      return ''
  }
}

const initialError: PlayerError | null = {
  code: 'noPlayers'
}

interface Player {
  id: string
  name: string
  score: number
}

interface PlayerError {
  code:
    | 'noPlayers'
    | 'noNameEntered'
    | 'nameTooLong'
    | 'existingPlayer'
    | 'failedToAddPlayer'
    | 'failedToRemovePlayer'
    | 'failedToAddPoint'
    | 'failedToSubtractPoint'
    | 'saveGame'
}

interface HandleAddPlayerArgs {
  name: string
}

interface HandleRemovePlayerArgs {
  id: string
}

interface HandleAdjustPointArgs {
  id: string
}

interface GetErrorMessageArgs {
  error: PlayerError | null
}

