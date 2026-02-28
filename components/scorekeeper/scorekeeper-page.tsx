'use client'

import { useRef, useState } from 'react'
import { useToast } from '@/components/ui/toaster'
import { PlayerForm } from './PlayerForm'
import { PlayerList } from './PlayerList'
import { ScorekeeperFooter } from './ScorekeeperFooter'
import type {
  HandleAddPlayerArgs,
  HandleAdjustPointArgs,
  HandleRemovePlayerArgs,
  Player,
  PlayerError
} from '@/types/scorekeeper'
import { getErrorMessage } from '@/types/scorekeeper'

export function ScorekeeperPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerName, setPlayerName] = useState('')
  const addPlayerInputRef = useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  function showErrorToast(code: PlayerError['code']) {
    const message = getErrorMessage({ error: { code } })
    if (message) addToast(message, 'error')
  }

  function handleAddPlayer(args: HandleAddPlayerArgs) {
    const { name } = args

    if (!name.trim()) {
      showErrorToast('noNameEntered')
      return
    }

    if (name.length > 18) {
      showErrorToast('nameTooLong')
      setPlayerName('')
      return
    }

    const nameAlreadyExists = players.some(
      (player) => player.name.toLowerCase() === name.toLowerCase()
    )

    if (nameAlreadyExists) {
      showErrorToast('existingPlayer')
      return
    }

    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      score: 0
    }

    setPlayers((current) => [...current, newPlayer])
    setPlayerName('')
  }

  function handleRemovePlayer(args: HandleRemovePlayerArgs) {
    const { id } = args
    const nextPlayers = players.filter((player) => player.id !== id)

    if (nextPlayers.length === players.length) {
      showErrorToast('failedToRemovePlayer')
      return
    }

    setPlayers(nextPlayers)
  }

  function handleAddPoint(args: HandleAdjustPointArgs) {
    const { id } = args

    try {
      setPlayers((current) =>
        current.map((player) =>
          player.id === id ? { ...player, score: player.score + 1 } : player
        )
      )
    } catch {
      showErrorToast('failedToAddPoint')
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
    } catch {
      showErrorToast('failedToSubtractPoint')
    }
  }

  function handleResetGame() {
    if (!players.length) {
      return
    }
    setPlayers((current) => current.map((player) => ({ ...player, score: 0 })))
  }

  function handleNewGame() {
    setPlayers([])
    setPlayerName('')
    requestAnimationFrame(() => addPlayerInputRef.current?.focus())
  }

  function handleSaveGame() {
    if (!players.length) {
      return
    }
    showErrorToast('saveGame')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleAddPlayer({ name: playerName })
  }

  const hasPlayers = players.length > 0

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
      <PlayerForm
        playerName={playerName}
        onPlayerNameChange={setPlayerName}
        onSubmit={handleSubmit}
        inputRef={addPlayerInputRef}
      />

      <main className="flex-1">
        <PlayerList
          players={players}
          emptyPlaceholder="Add players to begin."
          onRemovePlayer={(id) => handleRemovePlayer({ id })}
          onAddPoint={(id) => handleAddPoint({ id })}
          onSubtractPoint={(id) => handleSubtractPoint({ id })}
        />
      </main>

      <ScorekeeperFooter
        hasPlayers={hasPlayers}
        onResetGame={handleResetGame}
        onNewGame={handleNewGame}
        onSaveGame={handleSaveGame}
      />
    </div>
  )
}
