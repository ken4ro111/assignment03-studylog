import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { StudyRecord } from '../src/domain/studyRecord'

vi.mock('../src/utils/supabaseFunction', () => ({
  getAllStudyRecords: vi.fn().mockResolvedValue([
    new StudyRecord(1, 'React', 60, '2026-04-26T00:00:00Z'),
  ]),
}))

import App from '../src/App'

describe('App', () => {
  it('renders the heading and fetched study records', async () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: '学習記録一覧' })
    ).toBeInTheDocument()

    expect(await screen.findByText('React : 60')).toBeInTheDocument()
  })
})
