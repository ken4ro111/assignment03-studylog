import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Page404 } from '../src/components/pages/Page404'

describe('Page404', () => {
  it('renders not found message and link to login page', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'ページが見つかりません' })
    ).toBeInTheDocument()

    const loginLink = screen.getByRole('link', { name: 'ログイン' })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/')
  })
})
