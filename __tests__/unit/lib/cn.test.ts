import { cn } from '@/lib/cn'

describe('cn', () => {
  it('joins multiple class names with spaces', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('filters out falsy values', () => {
    expect(cn('a', undefined, 'b', null, false, 'c')).toBe('a b c')
  })

  it('returns empty string when all values are falsy', () => {
    expect(cn(undefined, null, false)).toBe('')
  })

  it('returns single class when one argument is truthy', () => {
    expect(cn('only')).toBe('only')
  })
})
