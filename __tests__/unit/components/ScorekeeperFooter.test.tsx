import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ScorekeeperFooter } from '@/components/scorekeeper/ScorekeeperFooter'

describe('ScorekeeperFooter', () => {
  it('renders Reset Scores, New Game, and Save Game buttons', () => {
    render(
      <ScorekeeperFooter
        hasPlayers={false}
        onResetGame={() => {}}
        onNewGame={() => {}}
        onSaveGame={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: /Reset Scores/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /New Game/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Save Game/i })).toBeInTheDocument()
  })

  it('disables Reset and Save when hasPlayers is false', () => {
    render(
      <ScorekeeperFooter
        hasPlayers={false}
        onResetGame={() => {}}
        onNewGame={() => {}}
        onSaveGame={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: /Reset Scores/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Save Game/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /New Game/i })).not.toBeDisabled()
  })

  it('enables Reset and Save when hasPlayers is true', () => {
    render(
      <ScorekeeperFooter
        hasPlayers={true}
        onResetGame={() => {}}
        onNewGame={() => {}}
        onSaveGame={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: /Reset Scores/i })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: /Save Game/i })).not.toBeDisabled()
  })

  it('calls onResetGame when Reset Scores is clicked', async () => {
    const user = userEvent.setup()
    const onResetGame = jest.fn()
    render(
      <ScorekeeperFooter
        hasPlayers={true}
        onResetGame={onResetGame}
        onNewGame={() => {}}
        onSaveGame={() => {}}
      />
    )
    await user.click(screen.getByRole('button', { name: /Reset Scores/i }))
    expect(onResetGame).toHaveBeenCalledTimes(1)
  })

  it('calls onNewGame when New Game is clicked', async () => {
    const user = userEvent.setup()
    const onNewGame = jest.fn()
    render(
      <ScorekeeperFooter
        hasPlayers={true}
        onResetGame={() => {}}
        onNewGame={onNewGame}
        onSaveGame={() => {}}
      />
    )
    await user.click(screen.getByRole('button', { name: /New Game/i }))
    expect(onNewGame).toHaveBeenCalledTimes(1)
  })

  it('calls onSaveGame when Save Game is clicked', async () => {
    const user = userEvent.setup()
    const onSaveGame = jest.fn()
    render(
      <ScorekeeperFooter
        hasPlayers={true}
        onResetGame={() => {}}
        onNewGame={() => {}}
        onSaveGame={onSaveGame}
      />
    )
    await user.click(screen.getByRole('button', { name: /Save Game/i }))
    expect(onSaveGame).toHaveBeenCalledTimes(1)
  })
})
