import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlayerForm } from '@/components/scorekeeper/PlayerForm'

describe('PlayerForm', () => {
  it('renders the title and form elements', () => {
    render(
      <PlayerForm
        playerName=""
        onPlayerNameChange={() => {}}
        onSubmit={() => {}}
      />
    )
    expect(screen.getByText(/Score/)).toBeInTheDocument()
    expect(screen.getByText(/Keeper/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter player name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Add player/i })).toBeInTheDocument()
  })

  it('displays the current player name in the input', () => {
    render(
      <PlayerForm
        playerName="Alice"
        onPlayerNameChange={() => {}}
        onSubmit={() => {}}
      />
    )
    const input = screen.getByLabelText(/New player name/i)
    expect(input).toHaveValue('Alice')
  })

  it('calls onPlayerNameChange when input value changes', async () => {
    const user = userEvent.setup()
    const onPlayerNameChange = jest.fn()
    render(
      <PlayerForm
        playerName=""
        onPlayerNameChange={onPlayerNameChange}
        onSubmit={() => {}}
      />
    )
    const input = screen.getByLabelText(/New player name/i)
    await user.type(input, 'Bob')
    expect(onPlayerNameChange).toHaveBeenCalled()
  })

  it('calls onSubmit when form is submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <PlayerForm
        playerName="Charlie"
        onPlayerNameChange={() => {}}
        onSubmit={onSubmit}
      />
    )
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
