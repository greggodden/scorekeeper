import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ScorekeeperPage } from '@/components/scorekeeper/scorekeeper-page'
import { Toaster } from '@/components/ui/toaster'

function renderWithToaster() {
  return render(
    <>
      <Toaster>
        <ScorekeeperPage />
      </Toaster>
    </>
  )
}

describe('ScorekeeperPage (integration)', () => {
  it('starts with empty player list and add form', () => {
    renderWithToaster()
    expect(screen.getByText('Add players to begin.')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter player name')).toHaveValue('')
  })

  it('adds a player when name is entered and form is submitted', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Alice')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('shows toast when adding player with empty name', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    expect(await screen.findByText('Please enter a valid player name.')).toBeInTheDocument()
  })

  it('shows toast when adding duplicate player name (case-insensitive)', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Bob')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    await user.type(input, 'bob')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    expect(await screen.findByText(/A player with that name already exists/)).toBeInTheDocument()
  })

  it('increments score when add point is clicked', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Charlie')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    await user.click(screen.getByRole('button', { name: /Add point to Charlie/i }))
    await user.click(screen.getByRole('button', { name: /Add point to Charlie/i }))
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('decrements score when subtract point is clicked', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Dana')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    await user.click(screen.getByRole('button', { name: /Add point to Dana/i }))
    await user.click(screen.getByRole('button', { name: /Subtract point from Dana/i }))
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('closing AlertDialog with Cancel keeps player when removing', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Eve')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    await user.click(screen.getByRole('button', { name: /Remove Eve/i }))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Cancel/i }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(screen.getByText('Eve')).toBeInTheDocument()
  })

  it('removes player when remove button is clicked and Confirm is chosen', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Eve')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    expect(screen.getByText('Eve')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Remove Eve/i }))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    expect(screen.getByText(/Remove player: Eve\?/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Confirm/i }))
    expect(screen.queryByText('Eve')).not.toBeInTheDocument()
    expect(screen.getByText('Add players to begin.')).toBeInTheDocument()
  })

  it('resets all scores to zero when Reset Scores is clicked and Confirm is chosen', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Frank')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    await user.click(screen.getByRole('button', { name: /Add point to Frank/i }))
    await user.click(screen.getByRole('button', { name: /Add point to Frank/i }))
    expect(screen.getByText('2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Reset Scores/i }))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Confirm/i }))
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Frank')).toBeInTheDocument()
  })

  it('clears all players when New Game is clicked and Confirm is chosen', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Grace')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    expect(screen.getByText('Grace')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /New Game/i }))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Confirm/i }))
    expect(screen.queryByText('Grace')).not.toBeInTheDocument()
    expect(screen.getByText('Add players to begin.')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('shows toast when Save Game is clicked', async () => {
    const user = userEvent.setup()
    renderWithToaster()
    const input = screen.getByPlaceholderText('Enter player name')
    await user.type(input, 'Henry')
    await user.click(screen.getByRole('button', { name: /Add player/i }))
    await user.click(screen.getByRole('button', { name: /Save Game/i }))
    expect(await screen.findByText(/still in development/)).toBeInTheDocument()
  })
})
