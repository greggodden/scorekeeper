'use client'

import { useRef, useState } from 'react'
import { useToast } from '@/components/ui/toaster'
import type { ToastVariant } from '@/components/ui/toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
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

const ALERT_DEFAULT_TITLE = 'Are you sure?'
const ALERT_DEFAULT_CANCEL = 'Cancel'
const ALERT_DEFAULT_ACTION = 'Confirm'

interface AlertState {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

const initialAlertState: AlertState = {
  open: false,
  title: ALERT_DEFAULT_TITLE,
  description: '',
  onConfirm: () => {},
  onCancel: () => {}
}

export function ScorekeeperPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [playerName, setPlayerName] = useState('')
  const [alertState, setAlertState] = useState<AlertState>(initialAlertState)
  const addPlayerInputRef = useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  function showErrorToast(code: PlayerError['code'], variant: ToastVariant = 'error') {
    const message = getErrorMessage({ error: { code } })
    if (message) addToast(message, variant)
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
    const { player } = args
    setAlertState({
      open: true,
      title: ALERT_DEFAULT_TITLE,
      description: `Remove player: ${player.name}?`,
      onConfirm: () => {
        setAlertState((s) => ({ ...s, open: false }))
        const nextPlayers = players.filter((p) => p.id !== player.id)
        if (nextPlayers.length === players.length) {
          showErrorToast('failedToRemovePlayer')
          return
        }
        setPlayers(nextPlayers)
        addToast(getErrorMessage({ error: { code: 'successPlayerRemoved' } }), 'success')
      },
      onCancel: () => setAlertState((s) => ({ ...s, open: false }))
    })
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
    setAlertState({
      open: true,
      title: ALERT_DEFAULT_TITLE,
      description: 'Points for all players will be reset to 0.',
      onConfirm: () => {
        try {
          setPlayers((current) => current.map((player) => ({ ...player, score: 0 })))
        } catch {
          showErrorToast('failedToResetGame')
        }
        setAlertState((s) => ({ ...s, open: false }))
      },
      onCancel: () => setAlertState((s) => ({ ...s, open: false }))
    })
  }

  function handleNewGame() {
    setAlertState({
      open: true,
      title: ALERT_DEFAULT_TITLE,
      description: 'Starting a new game will remove all players and points.',
      onConfirm: () => {
        setPlayers([])
        setPlayerName('')
        setAlertState((s) => ({ ...s, open: false }))
        requestAnimationFrame(() => addPlayerInputRef.current?.focus())
      },
      onCancel: () => setAlertState((s) => ({ ...s, open: false }))
    })
  }

  function handleSaveGame() {
    if (!players.length) {
      return
    }
    showErrorToast('saveGame', 'info')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleAddPlayer({ name: playerName })
  }

  const hasPlayers = players.length > 0

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
      <AlertDialog open={alertState.open} onOpenChange={(open) => !open && setAlertState((s) => ({ ...s, open: false }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertState.title}</AlertDialogTitle>
            <AlertDialogDescription>{alertState.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onCancel={alertState.onCancel}>{ALERT_DEFAULT_CANCEL}</AlertDialogCancel>
            <AlertDialogAction onConfirm={alertState.onConfirm}>{ALERT_DEFAULT_ACTION}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
          onRemovePlayer={(player) => handleRemovePlayer({ player })}
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
