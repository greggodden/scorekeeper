import {
  getErrorMessage,
  ERROR_MESSAGES,
  type PlayerError,
} from '@/types/scorekeeper'

describe('getErrorMessage', () => {
  it('returns empty string when error is null', () => {
    expect(getErrorMessage({ error: null })).toBe('')
  })

  it('returns the correct message for each error code', () => {
    const codes: PlayerError['code'][] = [
      'noPlayers',
      'noNameEntered',
      'nameTooLong',
      'existingPlayer',
      'failedToAddPlayer',
      'failedToRemovePlayer',
      'failedToAddPoint',
      'failedToSubtractPoint',
      'saveGame',
    ]
    codes.forEach((code) => {
      expect(getErrorMessage({ error: { code } })).toBe(ERROR_MESSAGES[code])
    })
  })

  it('returns a non-empty string for noNameEntered', () => {
    expect(getErrorMessage({ error: { code: 'noNameEntered' } })).toBe(
      'Please enter a valid player name.'
    )
  })

  it('returns a non-empty string for existingPlayer', () => {
    expect(getErrorMessage({ error: { code: 'existingPlayer' } })).toBe(
      'A player with that name already exists. Please try again.'
    )
  })
})
