import { ChakraProvider } from '@chakra-ui/react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Header } from '../src/components/organisms/Header'
import { StudyRecord } from '../src/domain/studyRecord'
import { useAllStudyRecord } from '../src/hooks/useAllStudyRecord'
import { useCreateStudyRecord } from '../src/hooks/useCreateStudyRecord'
import { useDeleteStudyRecord } from '../src/hooks/useDeleteStudyRecord'
import { useMessage } from '../src/hooks/useMessage'
import { useUpdateStudyRecord } from '../src/hooks/useUpdateStudyRecord'
import { StudyRecords } from '../src/components/pages/StudyRecords'

vi.mock('../src/hooks/useAllStudyRecord', () => ({
  useAllStudyRecord: vi.fn(),
}))

vi.mock('../src/hooks/useCreateStudyRecord', () => ({
  useCreateStudyRecord: vi.fn(),
}))

vi.mock('../src/hooks/useDeleteStudyRecord', () => ({
  useDeleteStudyRecord: vi.fn(),
}))

vi.mock('../src/hooks/useUpdateStudyRecord', () => ({
  useUpdateStudyRecord: vi.fn(),
}))

vi.mock('../src/hooks/useMessage', () => ({
  useMessage: vi.fn(),
}))

const mockFetchRecords = vi.fn()
const mockOnClickAdd = vi.fn()
const mockOnClickDelete = vi.fn()
const mockOnClickUpdate = vi.fn()
const mockShowMessage = vi.fn()

const studyRecords = [
  new StudyRecord(1, 'React', 60, '2026-04-26T00:00:00Z'),
  new StudyRecord(2, 'TypeScript', 45, '2026-04-25T00:00:00Z'),
]

const renderStudyRecords = () => {
  render(
    <MemoryRouter>
      <ChakraProvider>
        <Header />
        <StudyRecords />
      </ChakraProvider>
    </MemoryRouter>
  )
}

describe('StudyRecords', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockFetchRecords.mockResolvedValue(undefined)
    mockOnClickAdd.mockResolvedValue(true)
    mockOnClickDelete.mockResolvedValue(true)
    mockOnClickUpdate.mockResolvedValue(true)

    vi.mocked(useAllStudyRecord).mockReturnValue({
      fetchRecords: mockFetchRecords,
      loading: false,
      studyRecords,
    })
    vi.mocked(useCreateStudyRecord).mockReturnValue({
      onClickAdd: mockOnClickAdd,
      loading: false,
    })
    vi.mocked(useDeleteStudyRecord).mockReturnValue({
      onClickDelete: mockOnClickDelete,
      deleteLoading: false,
    })
    vi.mocked(useUpdateStudyRecord).mockReturnValue({
      onClickUpdate: mockOnClickUpdate,
      loading: false,
    })
    vi.mocked(useMessage).mockReturnValue({
      showMessage: mockShowMessage,
    })
  })

  it('ローディング画面を表示できる', () => {
    vi.mocked(useAllStudyRecord).mockReturnValue({
      fetchRecords: mockFetchRecords,
      loading: true,
      studyRecords: [],
    })

    renderStudyRecords()

    expect(screen.getByText('Loading.....')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('タイトルと新規登録ボタン、テーブルの一覧を表示できる', () => {
    renderStudyRecords()

    expect(
      screen.getByRole('heading', { name: '学習記録一覧' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '新規登録' })).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '学習記録' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '学習時間' })).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('60')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('45')).toBeInTheDocument()
    expect(mockFetchRecords).toHaveBeenCalledTimes(1)
  })

  it('新規登録モーダルを開ける', async () => {
    renderStudyRecords()

    fireEvent.click(screen.getByRole('button', { name: '新規登録' }))

    const dialog = await screen.findByRole('dialog')

    expect(within(dialog).getByText('新規登録')).toBeInTheDocument()
  })

  it('更新モーダルを開くと更新対象の値が初期表示される', async () => {
    renderStudyRecords()

    fireEvent.click(screen.getAllByRole('button', { name: '更新' })[0])

    const dialog = await screen.findByRole('dialog')

    expect(within(dialog).getByRole('button', { name: '更新' })).toBeInTheDocument()
    expect(within(dialog).getByDisplayValue('React')).toBeInTheDocument()
    expect(within(dialog).getByDisplayValue('60')).toBeInTheDocument()
  })

  it('学習記録を削除できる', async () => {
    renderStudyRecords()

    fireEvent.click(screen.getAllByRole('button', { name: '削除' })[0])

    await waitFor(() => {
      expect(mockOnClickDelete).toHaveBeenCalledWith(1)
    })
    await waitFor(() => {
      expect(mockFetchRecords).toHaveBeenCalledTimes(2)
    })
    expect(mockShowMessage).toHaveBeenCalledWith({
      title: '削除に成功しました',
      status: 'success',
    })
  })
})
