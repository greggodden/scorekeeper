export interface Player {
  id: string
  name: string
  score: number
}

export interface PlayerError {
  code:
    | 'noPlayers'
    | 'noNameEntered'
    | 'nameTooLong'
    | 'existingPlayer'
    | 'failedToAddPlayer'
    | 'failedToRemovePlayer'
    | 'failedToAddPoint'
    | 'failedToSubtractPoint'
    | 'failedToResetGame'
    | 'saveGame'
    | 'successPlayerRemoved'
}

export interface HandleAddPlayerArgs {
  name: string
}

export interface HandleRemovePlayerArgs {
  player: Player
}

export interface HandleAdjustPointArgs {
  id: string
}

export interface GetErrorMessageArgs {
  error: PlayerError | null
}

export const ERROR_MESSAGES: Record<PlayerError['code'], string> = {
  noPlayers: 'Add players to begin.',
  noNameEntered: 'Please enter a valid player name.',
  nameTooLong: 'Player name cannot exceed 18 characters.',
  existingPlayer: 'A player with that name already exists. Please try again.',
  failedToAddPlayer: 'Failed to add player. Please try again.',
  failedToRemovePlayer: 'Failed to remove player. Please try again.',
  failedToAddPoint: 'Failed to add point. Please try again.',
  failedToSubtractPoint: 'Failed to remove point. Please try again.',
  failedToResetGame: 'Failed to reset game. Please try again.',
  saveGame: 'This feature is still in development. Please try again later.',
  successPlayerRemoved: 'Player removed successfully.'
}

export function getErrorMessage(args: GetErrorMessageArgs): string {
  const { error } = args
  if (!error) return ''
  return ERROR_MESSAGES[error.code] ?? ''
}
