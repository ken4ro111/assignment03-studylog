import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { StudyRecord } from '../src/domain/studyRecord'
import { StudyRecords } from '../src/components/pages/StudyRecords'
import { getAllStudyRecords } from '../src/utils/supabaseFunction'

vi.mock('../src/utils/supabaseFunction', () => ({
  getAllStudyRecords: vi.fn().mockResolvedValue([
    new StudyRecord(1, 'React', 60, '2026-04-26T00:00:00Z'),
    new StudyRecord(2, 'TypeScript', 45, '2026-04-25T00:00:00Z'),
  ]),
}))

describe('StudyRecords', () => {
  it('fetches study records and renders table rows', async () => {
    render(<StudyRecords />)

    expect(await screen.findByText('React')).toBeInTheDocument()
    expect(screen.getByText('60')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('45')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '新規作成' })).toBeInTheDocument()
    expect(getAllStudyRecords).toHaveBeenCalledTimes(1)
  })
})
