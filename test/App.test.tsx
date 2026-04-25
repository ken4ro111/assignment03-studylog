import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../src/App'

describe('App', () => {
  it('renders the starter heading and counter button', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: '学習記録一覧' })
    ).toBeInTheDocument()
  })
})
