import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlayerListRow } from '@/components/scorekeeper/PlayerListRow'
import type { Player } from '@/types/scorekeeper'

const player: Player = { id: 'p1', name: 'Test Player', score: 5 }

describe('PlayerListRow', () => {
  it('renders player name and score', () => {
    render(
      <PlayerListRow
        player={player}
        onRemove={() => {}}
        onAddPoint={() => {}}
        onSubtractPoint={() => {}}
      />
    )
    expect(screen.getByText('Test Player')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('calls onRemove with player when remove is clicked', async () => {
    const user = userEvent.setup()
    const onRemove = jest.fn()
    render(
      <PlayerListRow
        player={player}
        onRemove={onRemove}
        onAddPoint={() => {}}
        onSubtractPoint={() => {}}
      />
    )
    await user.click(screen.getByRole('button', { name: /Remove Test Player/i }))
    expect(onRemove).toHaveBeenCalledWith(player)
  })

  it('calls onAddPoint with player id when add point is clicked', async () => {
    const user = userEvent.setup()
    const onAddPoint = jest.fn()
    render(
      <PlayerListRow
        player={player}
        onRemove={() => {}}
        onAddPoint={onAddPoint}
        onSubtractPoint={() => {}}
      />
    )
    await user.click(screen.getByRole('button', { name: /Add point to Test Player/i }))
    expect(onAddPoint).toHaveBeenCalledWith('p1')
  })

  it('calls onSubtractPoint with player id when subtract is clicked', async () => {
    const user = userEvent.setup()
    const onSubtractPoint = jest.fn()
    render(
      <PlayerListRow
        player={player}
        onRemove={() => {}}
        onAddPoint={() => {}}
        onSubtractPoint={onSubtractPoint}
      />
    )
    await user.click(screen.getByRole('button', { name: /Subtract point from Test Player/i }))
    expect(onSubtractPoint).toHaveBeenCalledWith('p1')
  })
})
