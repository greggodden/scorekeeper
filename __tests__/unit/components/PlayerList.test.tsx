import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlayerList } from '@/components/scorekeeper/PlayerList'
import type { Player } from '@/types/scorekeeper'

const mockPlayers: Player[] = [
  { id: '1', name: 'Alice', score: 3 },
  { id: '2', name: 'Bob', score: 1 },
]

describe('PlayerList', () => {
  it('shows empty placeholder when no players', () => {
    render(
      <PlayerList
        players={[]}
        onRemovePlayer={() => {}}
        onAddPoint={() => {}}
        onSubtractPoint={() => {}}
      />
    )
    expect(screen.getByText('Add players to begin.')).toBeInTheDocument()
  })

  it('shows custom empty placeholder when provided', () => {
    render(
      <PlayerList
        players={[]}
        emptyPlaceholder="No players yet."
        onRemovePlayer={() => {}}
        onAddPoint={() => {}}
        onSubtractPoint={() => {}}
      />
    )
    expect(screen.getByText('No players yet.')).toBeInTheDocument()
  })

  it('renders a row per player with name and score', () => {
    render(
      <PlayerList
        players={mockPlayers}
        onRemovePlayer={() => {}}
        onAddPoint={() => {}}
        onSubtractPoint={() => {}}
      />
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('calls onRemovePlayer when remove button is clicked', async () => {
    const user = userEvent.setup()
    const onRemovePlayer = jest.fn()
    render(
      <PlayerList
        players={mockPlayers}
        onRemovePlayer={onRemovePlayer}
        onAddPoint={() => {}}
        onSubtractPoint={() => {}}
      />
    )
    await user.click(screen.getByRole('button', { name: /Remove Alice/i }))
    expect(onRemovePlayer).toHaveBeenCalledWith('1')
  })

  it('calls onAddPoint when add point button is clicked', async () => {
    const user = userEvent.setup()
    const onAddPoint = jest.fn()
    render(
      <PlayerList
        players={mockPlayers}
        onRemovePlayer={() => {}}
        onAddPoint={onAddPoint}
        onSubtractPoint={() => {}}
      />
    )
    await user.click(screen.getByRole('button', { name: /Add point to Alice/i }))
    expect(onAddPoint).toHaveBeenCalledWith('1')
  })

  it('calls onSubtractPoint when subtract button is clicked', async () => {
    const user = userEvent.setup()
    const onSubtractPoint = jest.fn()
    render(
      <PlayerList
        players={mockPlayers}
        onRemovePlayer={() => {}}
        onAddPoint={() => {}}
        onSubtractPoint={onSubtractPoint}
      />
    )
    await user.click(screen.getByRole('button', { name: /Subtract point from Bob/i }))
    expect(onSubtractPoint).toHaveBeenCalledWith('2')
  })
})
