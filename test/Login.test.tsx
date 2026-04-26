import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../src/components/pages/Login'

describe('Login', () => {
  it('renders login form and navigates to study records when clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/study-records"
            element={<h1>Study Records Screen</h1>}
          />
        </Routes>
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: '学習管理アプリ' })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ユーザーID')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }))

    expect(
      await screen.findByRole('heading', { name: 'Study Records Screen' })
    ).toBeInTheDocument()
  })
})
