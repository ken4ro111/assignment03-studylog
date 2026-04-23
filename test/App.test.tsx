import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'

describe('App', () => {
  it('renders the starter heading and counter button', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Get started' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /count is 0/i })
    ).toBeInTheDocument()
  })
})
